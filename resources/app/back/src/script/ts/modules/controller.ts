import { BasisSimplex } from "./simplex";
import { NumberSimplx } from "./numder";
import { NumbersManager } from "./NumbersManager";
export class Controller {
    view_obj: any;
    num_lim: any;
    num_var: any;
    simplex_obj: any;
    config_simple: any;
    start_input_dom: any;
    func_inputs_dom: any;
    limits_inputs_dom: any;
    kind_search_dom: any;
    num_lim_dom: any;
    num_var_dom: any;
    start_return_dom: any;
    mode_dom: any;
    cache_config_simple: any;
    in_calc: any;
    kind_number_dom: any;
    number_manager: any;
    kind_method_dom: any;
    own_basis_checker_dom: any;
    user_basis_table_dom: any;
    cache_simple_configs: any;
    curent_step: any;

    constructor(config) {
        this.view_obj = config.view_obj;
        // this.view_obj.choseSupportEl = this.choseSupportEl();

        this.number_manager = new NumbersManager(true);
        this.num_var = config.num_var;
        this.num_lim = config.num_lim;
        this.cache_config_simple = [];

        this.cache_simple_configs = [];
        this.config_simple = config.config_simple;

        this.mode_dom = config.mode_dom;
        this.start_input_dom = config.start_input_dom;
        this.func_inputs_dom = config.func_inputs_dom;
        this.limits_inputs_dom = config.limits_inputs_dom;
        this.kind_search_dom = config.kind_search_dom;
        this.num_var_dom = config.num_var_dom;
        this.num_lim_dom = config.num_lim_dom;
        this.user_basis_table_dom = config.user_basis_table_dom;
        this.kind_number_dom = config.kind_number_dom;
        this.start_return_dom = config.start_return_dom;
        this.kind_method_dom = config.kind_method_dom;
        this.simplex_obj = new BasisSimplex(this.config_simple, this);
        this.own_basis_checker_dom = config.own_basis_checker_dom;
        this.start_input_dom.addEventListener("click", this.start);
        this.num_var_dom.addEventListener("change", this.updateNumVar);
        this.num_lim_dom.addEventListener("change", this.updateNumLimits);
        this.own_basis_checker_dom.addEventListener("change", this.updateStateUsersBasis);

        this.curent_step = 0;
        this.start_return_dom.addEventListener("click", this.returnBackStep);
        this.config_simple.updateTableView = this.updateTableView;
        this.in_calc = false;
        // this.setConfig2cache(this.config_simple);
    }
    setConfig2cache(config = this.config_simple) {
        console.log("\n setConfig2cache\n", this.curent_step, config, this.cache_config_simple);

        let config_new: any = {};

        config_new.table = [];
        for (let key in config.table) {
            config_new.table[key] = config.table[key].map((elem) => {
                return { value: elem.showNumber(), availabe_elem: elem.checkSupportEl(), back: true };
            });
        }
        config_new.function = config.function.map((elem) => {
            if (typeof elem != "object") {
                elem = new NumberSimplx(elem, false);
            }
            return elem.showNumber();
        });

        config_new.finish_preparations = this.simplex_obj.getFinishPreparations();
        config_new.user_basis = config.user_basis;
        config_new.mode_val = config.mode_val;
        config_new.updateTableView = {};
        console.log(config_new);
        this.cache_config_simple[this.curent_step] = Object.assign({}, config_new);
        console.log("------=-=-=-=-=-=-=->", this.curent_step, this.cache_config_simple[this.curent_step]);
    }
    prepearConfig = () => {
        let arr = [...this.func_inputs_dom],
            arr_res: any = [],
            arr_byf: any = [],
            kind_view_num;

        kind_view_num = [...this.kind_number_dom][0].selected;
        this.config_simple.function = [];
        for (let i = 0; i < arr.length; i++) {
            arr_byf[i] = new NumberSimplx(arr[i].value, kind_view_num);
        }
        this.config_simple.function = arr_byf;
        this.number_manager.initViewNum(kind_view_num);

        this.config_simple.search_min = [...this.kind_search_dom][0].checked;
        this.config_simple.number_manager = this.number_manager;
        this.config_simple.method_basic_dom = [...this.kind_method_dom][0].selected;
        // if (this.cache_config_simple.length > 0 && !!this.cache_config_simple[0]) {
        //     console.log("||||||||", this.cache_config_simple);

        //     if (this.config_simple.method_basic_dom != this.cache_config_simple[0].method_basic_dom) {
        //         console.log("||||||||", this.cache_config_simple);
        //         // this.cache_config_simple = [];
        //     }
        // }
        this.config_simple.mode_val = this.mode_dom.value;
        console.log(this.user_basis_table_dom);
        arr = [...this.user_basis_table_dom];
        arr_byf = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value == 1) {
                arr_byf.push(i);
            }
        }

        this.config_simple.user_basis = arr_byf;

        arr = [...this.limits_inputs_dom];

        console.log("prepearConfig", this.config_simple);

        this.config_simple.table = this.prepearLimits(arr, kind_view_num, false);
    };
    prepearLimits(arr, kind_view_num, to_back) {
        let arr_byf = {},
            arr_res = [],
            val,
            tmp;
        for (let i = 0; i < arr.length; i++) {
            console.log(typeof arr[i]);
            if (!to_back) {
                arr[i] = [...arr[i].getElementsByClassName("limits_inp")];
            }
            arr_res[i] = [];
            for (let j = 0; j < arr[i].length; j++) {
                if (typeof arr[i][j] == "object") {
                    val = arr[i][j].value;
                } else {
                    val = arr[i][j];
                }
                tmp = new NumberSimplx(val, kind_view_num);

                if (arr[i][j].back && arr[i][j].availabe_elem) {
                    tmp.setSupportEl(true, false);
                }
                arr_res[i].push(tmp);
            }
            arr_byf[i] = arr_res[i];
        }
        console.log("prepearLimits\n\n", arr_byf, arr);
        return arr_byf;
    }
    prepearStartingCalc() {
        this.prepearConfig();

        console.log("\n\n\\start ", this.config_simple, this.curent_step, this.cache_config_simple);
        // this.setConfig2cache(this.config_simple);
        this.curent_step++;
    }
    start = () => {
        this.prepearStartingCalc();

        if (this.cache_config_simple.length == 0) {
            this.curent_step = 0;
            this.setConfig2cache(this.config_simple);
            this.curent_step++;
        }
        console.log(
            "start new 2",
            this.config_simple.length == 0,
            this.curent_step,
            this.cache_config_simple,
            this.config_simple
        );
        this.simplex_obj = new BasisSimplex(this.config_simple, this);
        this.start_input_dom.disabled = true;

        this.simplex_obj.updateData(this.config_simple, this.in_calc, true);
        console.log("start AFTER uPDATE", this.curent_step, this.cache_config_simple, this.config_simple);
    };
    continue = () => {
        // this.initAvailabe(this.config_simple.table);

        console.log("Continue");
        this.setConfig2cache(this.config_simple);
        this.prepearStartingCalc();
        this.simplex_obj.updateData(this.config_simple, this.in_calc);
    };
    updateStateUsersBasis = (event) => {
        this.view_obj.drawUserBasisArea(event.target.checked);
    };
    updateNumVar = (event) => {
        this.config_simple.function = [];
        this.curent_step = 0;
        this.cache_config_simple = [];
        console.log(event.target.value);
        this.num_var = parseInt(event.target.value);
        this.simplex_obj.initSupportEl(null, null);
        this.init();
    };
    returnBackStep = () => {
        this.in_calc = false;
        let table;

        // let byf = JSON.parse(JSON.stringify(this.cache_config_simple[0]));

        if (this.curent_step > 0) {
            this.curent_step -= 1;
        }

        if (this.curent_step == 0) {
            this.start_input_dom.disabled = false;
        }
        // this.config_simple = Object.assign({}, this.cache_config_simple[this.curent_step]);
        this.config_simple = Object.assign({}, this.cache_config_simple[this.curent_step]);
        console.log(
            "\n\n)))))))))))))))))))))returnBackStep",
            this.curent_step,
            this.cache_config_simple,
            this.cache_config_simple[this.curent_step],
            this.config_simple
        );
        this.init();
        this.simplex_obj.setFinishPreparations(this.config_simple.finish_preparations);
        // console.log("=============>", this.curent_step, this.cache_config_simple, "||", this.config_simple);
        this.simplex_obj.initSupportEl(null, null);
        // !!! исправить false  - отображение дробей
        table = this.prepearLimits(this.config_simple.table, false, true);
        // if (this.curent_step != 0) {
        //     this.setAvailabeElem(table);
        // }

        this.view_obj.updateTableView(table, "steps", this.usersSupportEl);
        console.log("STOP Karl");
    };

    countLength(obj) {
        var count = 0;
        for (var prs in obj) {
            count++;
        }
        return count;
    }

    updateTableView(table, mode_val = "auto") {
        this.config_simple.table = table;

        // this.cache_config_simple = JSON.parse(JSON.stringify(this.config_simple));
        this.view_obj.updateTableView(table, mode_val, this.usersSupportEl);
    }
    showAnswer(value) {
        this.view_obj.showAnswerView(value);
    }
    updateNumLimits = (event) => {
        console.log("updateNumLimits", event.target.value);
        this.cache_config_simple = [];
        this.curent_step = 0;
        let num_new_lim = parseInt(event.target.value);
        for (let i = 0; i < num_new_lim; i++) {
            this.config_simple.table[i] = [];
        }
        this.curent_step = 0;
        this.num_lim = num_new_lim;
        console.log(!!this.num_lim);
        this.init();
    };
    initAvailabe(table) {
        console.log("\n\n_+_+_+_+_+_+_+_", this.curent_step, this.cache_config_simple, table, "\n\n");
        if (this.curent_step != 0) {
            for (let key in table) {
                this.cache_config_simple[this.curent_step - 1].table[key] = table[key].map((elem) => {
                    return { value: elem.showNumber(), availabe_elem: elem.checkSupportEl(), back: true };
                });
            }
        }
    }
    updateTableAfterStep(table, mode_val) {
        console.log("updateTableAfterStep", table);

        this.view_obj.updateTableView(table, mode_val, this.usersSupportEl);
    }
    usersSupportEl = (event) => {
        console.log(event.target.getAttribute("data-pos_str"));
        let pos_str = parseInt(event.target.getAttribute("data-pos_str")),
            pos_col = parseInt(event.target.getAttribute("data-pos_col"));
        this.simplex_obj.initSupportEl(pos_str, pos_col);
        this.in_calc = true;

        this.continue();
    };
    init = () => {
        this.view_obj.showAnswerView("");
        console.log("!!!sthis.config_simple", this.config_simple);
        if (this.config_simple.length == 0) {
            this.setConfig2cache(this.config_simple);
            // this.curent_step++;
        }
        if (!!!this.num_lim) {
            this.num_lim = this.countLength(this.config_simple.table);
        }
        this.view_obj.initConfig(this.config_simple);
        this.view_obj.drawFunction(this.num_var);
        if (this.own_basis_checker_dom.checked) {
            this.view_obj.drawUserBasisArea(this.own_basis_checker_dom.checked);
        }
        this.view_obj.drawLimits(this.num_var, this.num_lim, "init");
        console.log("!!!ФАЕУК drawLimits", this.cache_config_simple, this.curent_step);
    };
}
