const fs = require("fs");
const { dialog } = require("electron").remote;
let function_data, table;

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
    read_file_inp_dom: any;
    save_file_inp_dom: any;
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
        this.save_file_inp_dom = config.save_file_inp_dom;
        this.simplex_obj = new BasisSimplex(this.config_simple, this);
        this.own_basis_checker_dom = config.own_basis_checker_dom;
        this.start_input_dom.addEventListener("click", this.start);
        this.num_var_dom.addEventListener("change", this.updateNumVar);
        this.num_lim_dom.addEventListener("change", this.updateNumLimits);
        this.own_basis_checker_dom.addEventListener("change", this.updateStateUsersBasis);
        this.read_file_inp_dom = config.read_file_inp_dom;
        this.curent_step = 0;
        this.start_return_dom.addEventListener("click", this.returnBackStep);
        this.config_simple.updateTableView = this.updateTableView;
        this.in_calc = false;
        this.read_file_inp_dom.addEventListener("click", this.readFile);

        this.save_file_inp_dom.addEventListener("click", this.saveFile);
        // this.setConfig2cache(this.config_simple);
    }
    readFile = () => {
        this.view_obj.showAnswerView("");
        dialog.showOpenDialog(
            {
                properties: ["openFile", "multiSelections"],
            },
            (file_names) => {
                if (file_names !== undefined) {
                    fs.readFile(file_names[0], "utf-8", (err, data) => {
                        if (err) {
                            console.log("Error ", err);
                        }
                        console.log(data);
                        data = data.split("*");
                        this.num_lim = 0;
                        this.num_var = 0;
                        this.curent_step = 0;
                        this.cache_config_simple = [];
                        this.start_input_dom.disabled = false;
                        this.config_simple.finish_preparations = false;
                        function_data = data[0].split(",").map((elem_num) => {
                            this.num_var++;
                            return new NumberSimplx(elem_num, false);
                        });
                        this.num_var--;
                        table = data[1].split("|");
                        table = table.map((elem) => {
                            this.num_lim++;

                            return elem.split(",").map((elem_num) => {
                                return new NumberSimplx(elem_num, false);
                            });
                        });

                        console.log("eadFile ", this.config_simple, this.num_lim);
                        this.config_simple.function = function_data;
                        this.config_simple.table = table;

                        console.log(function_data, table);

                        this.in_calc = false;
                        this.init();
                    });
                }
            }
        );
    };
    saveFile = () => {
        let parent = this;
        dialog.showSaveDialog((fileName) => {
            if (fileName === undefined) {
                console.log("You didn't save the file");
                return;
            }
            let content = parent.getContent2Save();
            // fileName is a string that contains the path and filename created in the save file dialog.
            fs.writeFile(fileName, content, (err) => {
                if (err) {
                    alert("An error ocurred creating the file " + err.message);
                }

                alert("The file has been succesfully saved");
            });
        });
    };
    getContent2Save = () => {
        let res: any = [],
            tmp;
        console.log(this.config_simple.function);
        res = this.config_simple.function.map((elem) => {
            return elem.showNumber();
        });
        res = res.join(",");
        res += "* \n";
        for (var prs in this.config_simple.table) {
            tmp = "";

            this.config_simple.table[prs].forEach((elem, i, arr) => {
                tmp += elem.showNumber();
                if (i != arr.length - 1) {
                    tmp += " , ";
                }
            });

            tmp += "|\n";
            res += tmp;
        }

        res = res.substr(0, res.length - 2);
        return res;
    };
    setConfig2cache(config = this.config_simple) {
        let config_new: any = {};

        config_new.table = [];
        for (let key in config.table) {
            config_new.table[key] = config.table[key].map((elem) => {
                return {
                    value: elem.showNumber(),
                    availabe_elem: elem.checkSupportEl(),
                    best_availabe_elem: elem.checkBestSupportEl(),
                    back: true,
                };
            });
        }
        config_new.function = config.function.map((elem) => {
            if (typeof elem != "object") {
                elem = new NumberSimplx(elem, false);
            }
            return elem.showNumber();
        });
        if (this.curent_step != 0) {
            config_new.finish_preparations = this.simplex_obj.getFinishPreparations();
        } else {
            config_new.finish_preparations = false;
        }

        config_new.user_basis = config.user_basis;
        config_new.mode_val = config.mode_val;
        config_new.updateTableView = {};

        this.cache_config_simple[this.curent_step] = Object.assign({}, config_new);
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

        this.config_simple.mode_val = this.mode_dom.value;

        arr = [...this.user_basis_table_dom];
        arr_byf = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value != 0) {
                arr_byf.push(i);
            }
        }

        if (arr_byf.length != this.num_lim && arr_byf.length != 0) {
            arr_byf = [];
        }
        this.config_simple.user_basis = arr_byf;

        arr = [...this.limits_inputs_dom];

        this.config_simple.table = this.prepearLimits(arr, kind_view_num, false);
    };
    prepearLimits(arr, kind_view_num, to_back) {
        let arr_byf = {},
            arr_res = [],
            val,
            tmp;
        for (let i = 0; i < arr.length; i++) {
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

                if (arr[i][j].back) {
                    tmp.setSupportEl(arr[i][j].availabe_elem, arr[i][j].best_availabe_elem);
                }

                arr_res[i].push(tmp);
            }
            arr_byf[i] = arr_res[i];
        }

        return arr_byf;
    }
    prepearStartingCalc() {
        this.prepearConfig();
        this.curent_step++;
    }
    start = () => {
        this.prepearStartingCalc();

        if (this.cache_config_simple.length == 0) {
            this.curent_step = 0;
            this.setConfig2cache(this.config_simple);
            this.curent_step++;
        }

        this.simplex_obj = new BasisSimplex(this.config_simple, this);
        this.start_input_dom.disabled = true;

        this.simplex_obj.updateData(this.config_simple, this.in_calc, true);
    };
    continue = () => {
        this.setConfig2cache(this.config_simple);
        this.prepearStartingCalc();
        this.simplex_obj.updateData(this.config_simple, this.in_calc);
    };
    updateStateUsersBasis = (event) => {
        this.view_obj.drawUserBasisArea(event.target.checked);
    };
    updateNumVar = (event) => {
        console.log("updateNumVar", event.target.value);
        this.config_simple.function = [];
        for (let key in this.config_simple.table) {
            this.config_simple.table[key] = [];
        }
        this.curent_step = 0;
        this.cache_config_simple = [];
        this.config_simple.finish_preparations = false;

        this.num_var = parseInt(event.target.value);
        this.simplex_obj.initSupportEl(null, null);
        console.log("init");
        if (this.config_simple.length == 0) {
            this.setConfig2cache(this.config_simple);
        }
        if (!!!this.num_lim) {
            this.num_lim = this.countLength(this.config_simple.table);
        }
        this.view_obj.initConfig(this.config_simple);

        if (this.own_basis_checker_dom.checked) {
            this.view_obj.drawUserBasisArea(this.own_basis_checker_dom.checked);
        }
        this.view_obj.updateFunction(this.num_var);
        this.view_obj.updateNumLimV2(this.num_var, this.num_lim, "init");
        this.view_obj.updateNumVar(this.num_var);
    };
    returnBackStep = () => {
        this.in_calc = false;
        let table;

        if (this.curent_step > 0) {
            this.curent_step -= 1;
        }

        if (this.curent_step == 0) {
            this.start_input_dom.disabled = false;
        }

        this.showAnswer("");
        this.config_simple = Object.assign({}, this.cache_config_simple[this.curent_step]);

        this.init();
        this.simplex_obj.setFinishPreparations(this.config_simple.finish_preparations);

        this.simplex_obj.initSupportEl(null, null);
        table = this.prepearLimits(this.config_simple.table, false, true);

        this.view_obj.updateTableView(table, "steps", this.usersSupportEl);
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
        this.view_obj.updateTableView(table, mode_val, this.usersSupportEl);
    }
    showAnswer(value) {
        this.view_obj.showAnswerView(value);
    }
    updateNumLimits = (event) => {
        console.log("updateNumLimits", event.target.value);
        this.cache_config_simple = [];
        this.config_simple.finish_preparations = false;
        this.curent_step = 0;
        let num_new_lim = parseInt(event.target.value);
        for (let i = 0; i < num_new_lim; i++) {
            this.config_simple.table[i] = [];
        }
        this.curent_step = 0;
        this.num_lim = num_new_lim;

        this.init();
    };
    initAvailabe(table) {
        if (this.curent_step != 0) {
            for (let key in table) {
                this.cache_config_simple[this.curent_step - 1].table[key] = table[key].map((elem) => {
                    return { value: elem.showNumber(), availabe_elem: elem.checkSupportEl(), back: true };
                });
            }
        }
    }
    updateTableAfterStep(table, mode_val) {
        this.view_obj.updateTableView(table, mode_val, this.usersSupportEl);
    }
    usersSupportEl = (event) => {
        let pos_str = parseInt(event.target.getAttribute("data-pos_str")),
            pos_col = parseInt(event.target.getAttribute("data-pos_col"));
        this.simplex_obj.initSupportEl(pos_str, pos_col);
        this.in_calc = true;

        this.continue();
    };
    init = () => {
        if (this.config_simple.length == 0) {
            this.setConfig2cache(this.config_simple);
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
    };
}
