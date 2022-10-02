import { Gaus } from "./gaus";
import { ArtificialBassis } from "./artificial";

export class BasisSimplex {
    table: any;
    number_manager: any;
    function: any;
    gaus: any;
    delta_cache: any;
    finish: any;
    var_basis: any;
    find_min: boolean;
    sing_restrictions: any;
    search_min: any;
    updateTableView: any;
    controller: any;
    finish_preparations: boolean;
    mode_val: any;
    supp_index_col: any;
    supp_index_str: any;
    basis: any;
    method_basic_dom: any;
    constructor(config, controller) {
        //он не нужен код ниже
        this.table = config.table;
        this.function = config.function;
        this.number_manager;
        this.gaus = undefined;
        this.delta_cache = [];
        this.search_min = config.search_min;
        this.finish = {
            status_fail: false,
            message: undefined,
        };
        this.basis;
        this.mode_val = config.mode_val;
        this.controller = controller;
        this.method_basic_dom;
        this.updateTableView = config.updateTableView;
        this.supp_index_col = null;
        this.supp_index_str = null;
        this.finish_preparations = false;
        this.sing_restrictions = config.sing_restrictions;
    }

    countLength(obj) {
        var count = 0;
        for (var prs in obj) {
            count++;
        }
        return count;
    }
    getMinCoef() {
        let length = this.table[0].length,
            min = 10000000,
            byf_delta = this.table[this.countLength(this.table) - 1],
            index_min = 0;

        for (let i = 0; i < length - 1; i++) {
            if (
                this.number_manager.toCompare(byf_delta[i], "<", min) &&
                this.number_manager.toCompare(byf_delta[i], "<", 0)
            ) {
                min = byf_delta[i];

                index_min = i;
            }
        }
        return index_min;
    }
    getCurentIndexStr(index_colum, set_available = false) {
        let length = this.countLength(this.table),
            length_str = this.table[0].length,
            index_str = -1,
            min,
            tmp;
        min = 0;

        for (let i = 0; i < length - 1; i++) {
            if (this.number_manager.toCompare(this.table[i][index_colum], ">", 0)) {
                tmp = this.number_manager.calculate(this.table[i][length_str - 1], "/", this.table[i][index_colum]);
                if (this.number_manager.toCompare(tmp, "<", min) || min == 0) {
                    //  || min == NaN

                    min = this.number_manager.calculate(this.table[i][length_str - 1], "/", this.table[i][index_colum]);
                    index_str = i;
                }
            }
        }
        // console.log("\ngetCurentIndexStr", index_str, index_colum);
        if (index_str == -1 && !set_available) {
            if (!this.checkPositiveDelta(this.table[this.countLength(this.table) - 1])) {
                console.log("\n\n this.finish.message ОШИБКА ", min, "| ", index_str, index_colum);
                this.getViewTable();
                this.finish.status_fail = true;
                this.finish.message = "Решения не существует";
            }

            // this.sentAnswer();
        }
        return index_str;
    }
    checkRestrictions() {
        var length_str, byf;
        for (var i = 0; i < this.sing_restrictions.length; i++) {
            if (this.sing_restrictions[i] == "<" || this.sing_restrictions[i] == ">") {
                for (var j = 0; j < this.countLength(this.table); j++) {
                    length_str = this.table[j].length;
                    this.function.push(0);
                    if (j == i) {
                        if (this.sing_restrictions[i] == "<") {
                            byf = this.table[j][length_str - 1];
                            this.table[j][length_str - 1] = 1;
                            this.table[j][length_str] = byf;
                        } else if (this.sing_restrictions[i] == ">") {
                            byf = this.table[j][length_str - 1];
                            this.table[j][length_str - 1] = -1;
                            this.table[j][length_str] = byf;
                        }
                    } else {
                        byf = this.table[j][length_str - 1];
                        this.table[j][length_str - 1] = 0;
                        this.table[j][length_str] = byf;
                    }
                }
            }
        }

        // this.correctTable();
    }
    getFinishPreparations() {
        return this.finish_preparations;
    }
    setFinishPreparations(val) {
        this.finish_preparations = val;
    }
    findDelta(bassis) {
        let length = this.table[0].length,
            numb_basis = bassis.length,
            pos_var,
            tmp;

        for (let j = 0; j < length; j++) {
            this.delta_cache[j] = 0;
        }

        for (let i_basis = 0; i_basis < numb_basis; i_basis++) {
            for (let j = 0; j < length; j++) {
                pos_var = bassis[i_basis];

                tmp = this.number_manager.calculate(this.function[pos_var], "*", this.table[i_basis][j]);

                this.delta_cache[j] = this.number_manager.calculate(this.delta_cache[j], "+", tmp);
            }
        }

        for (let j = 0; j < length; j++) {
            this.delta_cache[j] = this.number_manager.calculate(this.delta_cache[j], "-", this.function[j]);
        }
        this.table[this.countLength(this.table)] = this.delta_cache;
    }
    checkPositiveDelta(delta_cache) {
        for (let i = 0; i < delta_cache.length - 1; i++) {
            if (this.number_manager.toCompare(delta_cache[i], "<", 0)) {
                return false;
            }
        }

        return true;
    }
    changeTable(index_colum, index_str) {
        let length = this.countLength(this.table),
            length_str = this.table[0].length,
            data = [],
            tmp,
            byf;
        console.log("Change TAle", length);
        this.getViewTable();
        for (let i = 0; i < length; i++) {
            data[i] = [];

            for (let j = 0; j < length_str; j++) {
                console.log(length_str, index_colum, index_str, j);
                if (j != index_colum && i == index_str) {
                    data[i][j] = this.number_manager.calculate(
                        this.table[i][j],
                        "/",
                        this.table[index_str][index_colum]
                    );
                } else if (i == index_str && j == index_colum) {
                    data[i][j] = this.number_manager.calculate(1, "/", this.table[index_str][index_colum]);
                } else if (i != index_str && j == index_colum) {
                    tmp = this.number_manager.calculate(this.table[i][j], "*", -1);
                    data[i][j] = this.number_manager.calculate(tmp, "/", this.table[index_str][index_colum]);
                } else {
                    tmp = this.number_manager.calculate(this.table[i][j], "*", this.table[index_str][index_colum]);
                    console.log(tmp);
                    byf = this.number_manager.calculate(this.table[index_str][j], "*", this.table[i][index_colum]);
                    tmp = this.number_manager.calculate(tmp, "-", byf);

                    data[i][j] = this.number_manager.calculate(tmp, "/", this.table[index_str][index_colum]);
                }
                console.log(data[i][j].showNumber());
            }
        }
        this.getViewTable();
        return data;
    }
    newBasis() {
        let index_colum, index_str;
        console.log("\n------------------ new Basiss  steps \n", this.mode_val);
        this.getViewTable();
        if (this.mode_val == "auto" || this.supp_index_str === null || this.supp_index_col === null) {
            index_colum = this.getMinCoef();

            index_str = this.getCurentIndexStr(index_colum, false);
        } else {
            index_colum = this.supp_index_col;
            index_str = this.supp_index_str;
            this.table = this.changeTable(index_colum, index_str);
            index_colum = this.getMinCoef();
            console.log("\n----------------------MIN COEF +>", index_colum);
            index_str = this.getCurentIndexStr(index_colum, false);
            console.log("\n new Basiss  steps after change table \n", index_str, index_colum);
        }

        if (!this.finish.status_fail && !this.checkPositiveDelta(this.table[this.countLength(this.table) - 1])) {
            if (this.mode_val == "auto") {
                this.table = this.changeTable(index_colum, index_str);

                this.newBasis();
            } else {
                this.setAvailabeElem(index_str, index_colum);
                this.controller.updateTableAfterStep(this.getViewTable(this.table, true), this.mode_val);
            }
        } else {
            console.log(
                "Finish Answer:=> newBasis",
                this.finish.status_fail,
                this.table[this.countLength(this.table) - 1][this.table[0].length - 1].showNumber()
            );

            this.sentAnswer(this.table);
        }
    }
    setAvailabeElem(index_str_sup, index_colum_sup) {
        this.table[index_str_sup][index_colum_sup].setSupportEl(true, true);
        let index_str,
            length_str = this.countLength(this.table) - 1;
        for (let i = 0; i < this.table[0].length - 1; i++) {
            if (i != index_colum_sup) {
                index_str = this.getCurentIndexStr(i, true);
                if (this.number_manager.toCompare(this.table[length_str][i], "<", 0) && index_str != -1) {
                    this.table[index_str][i].setSupportEl(true, false);
                } else {
                    console.log(this.finish.message);
                }
            }
        }
    }
    sentAnswer(table = this.table) {
        let answer;
        this.controller.updateTableView(this.getViewTable(table, true));
        if (this.finish.status_fail) {
            this.controller.showAnswer(this.finish.message);
        } else {
            answer = table[this.countLength(table) - 1][table[0].length - 1];
            // alert(this.search_min);
            if (this.search_min) {
                answer = this.number_manager.calculate(answer, "*", -1);
            }
            this.controller.showAnswer(answer.showNumber());
        }
    }
    initSupportEl(supp_index_str, supp_index_col) {
        this.supp_index_str = supp_index_str;
        this.supp_index_col = supp_index_col;
    }
    updateData(config, in_calc, new_calc) {
        // console.log("updateData", config, in_calc);
        this.finish = {
            status_fail: false,
            message: undefined,
        };
        if (new_calc) {
            this.finish_preparations = false;
        }
        // = this.finish_preparations false;
        this.table = config.table;

        this.number_manager = config.number_manager;

        if (!!config.finish_preparations) {
            this.finish_preparations = config.finish_preparations;
        }
        this.function = config.function;

        if (config.search_min) {
            this.search_min = true;
            this.function = this.function.map((elem) => {
                return this.number_manager.calculate(elem, "*", -1);
            });
        }
        this.mode_val = config.mode_val;

        this.start(this.table, in_calc, config);
    }
    getViewTable(table = this.table, to_view = false) {
        let res;
        to_view ? (res = []) : (res = "");
        for (var prs in table) {
            to_view ? (res[prs] = []) : (res = "");

            table[prs].forEach((elem) => {
                if (to_view) {
                    res[prs].push(elem);
                } else {
                    res += elem.showNumber() + " | ";
                }
            });
            console.log(res);
        }
        return res;
    }

    startSearch() {
        // this.getViewTable();
        if (!this.checkPositiveDelta(this.table[this.countLength(this.table) - 1])) {
            this.newBasis();
        } else {
            this.sentAnswer(this.table);
            console.log(
                "Finish Answer WB:=> ",
                this.table[this.countLength(this.table) - 1][this.table[0].length - 1].showNumber()
            );
        }
    }
    start(table = this.table, in_calc, config) {
        // console.log("start", this.function, !in_calc, !config.method_basic_dom);
        // this.getViewTable();
        //если метод искуственного базиса то возвращаемся в него
        console.log("--------------------->", !in_calc || !config.method_basic_dom);
        this.method_basic_dom = config.method_basic_dom;
        if (!in_calc || !config.method_basic_dom) {
            if (config.method_basic_dom) {
                this.gaus = new Gaus(table, this.number_manager, config.user_basis);
            } else {
                let conf = {
                    table: table,
                    number_manager: this.number_manager,
                    mode_val: this.mode_val,
                    controller: this.controller,
                    in_calc: in_calc,
                    supp_index_col: this.supp_index_col,
                    supp_index_str: this.supp_index_str,
                };
                if (!!!this.gaus) {
                    this.gaus = new ArtificialBassis(conf);
                } else {
                    console.log("\n\nUPDATE CONFIG ARFITIAL", conf, this.finish_preparations);
                    this.gaus.updateConfig(conf);
                }
            }
            console.log("this.finish_preparations", this.finish_preparations);
            if (!this.finish_preparations) {
                this.gaus.start();
                this.gaus.checkAnswer().then((res) => {
                    if (res.status_failess) {
                        this.table = res.data;
                        console.log("AFTER GAUS!!!!!!!!!", res.basis);
                        this.getViewTable();
                        console.log("_____________________");
                        this.finish_preparations = true;
                        this.findDelta(res.basis);
                        this.startSearch();

                        this.getViewTable();
                        // if (!this.checkPositiveDelta(this.table[this.countLength(this.table) - 1])) {
                        //     this.newBasis();
                        // } else {
                        //     this.sentAnswer(this.table);
                        //     console.log(
                        //         "Finish Answer WB:=> ",
                        //         this.table[this.countLength(this.table) - 1][this.table[0].length - 1].showNumber()
                        //     );
                        // }
                    } else {
                        console.log("ERROR", res.message);
                        this.controller.showAnswer("Решения найти не удалось");
                        this.getViewTable();
                        // if (!this.checkPositiveDelta(this.table[this.countLength(this.table) - 1])) {
                        //     this.newBasis();
                        // } else {
                        //     // this.sentAnswer(this.table);
                        //     // console.log(
                        //     //     "Finish Answer WB:=> ",
                        //     //     this.table[this.countLength(this.table) - 1][this.table[0].length - 1].showNumber()
                        //     // );
                        // }
                    }
                });
            } else {
                this.startSearch();
            }
        } else {
            console.log(" before checkPositiveDelta");
            this.getViewTable();
            if (!this.checkPositiveDelta(this.table[this.countLength(this.table) - 1])) {
                console.log("newBasis");
                this.getViewTable();
                this.newBasis();
            } else {
                this.sentAnswer(this.table);
                console.log(
                    "Finish Answer WB:=>",
                    this.table[this.countLength(this.table) - 1][this.table[0].length - 1].showNumber()
                );
            }
        }
    }
}
