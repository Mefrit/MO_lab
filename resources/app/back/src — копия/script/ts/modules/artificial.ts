import { NumberSimplx } from "./numder";

export class ArtificialBassis {
    table: any;
    number_manager: any;
    basis;
    new_basis;
    simplex_obj: any;
    finish: any;
    supp_index_col: any;
    supp_index_str: any;
    mode_val: any;
    controller: any;
    in_calc: any;
    status_failess: any;
    kol_steps: any;
    constructor(config) {
        this.in_calc = config.in_calc;
        this.controller = config.controller;
        this.mode_val = config.mode_val;
        this.table = config.table;
        this.number_manager = config.number_manager;
        this.basis = [];
        this.new_basis = [];
        this.supp_index_col = null;
        this.supp_index_str = null;
        this.supp_index_col = config.supp_index_col;
        this.supp_index_str = config.supp_index_str;

        this.kol_steps = 0;
      
        if (!config.in_calc) {
            for (
                let i = config.table[0].length - 1;
                i < config.table[0].length + this.countLength(config.table) - 1;
                i++
            ) {
                this.basis.push(i);
                this.new_basis.push(i);
            }
        }
        // убрать конда сделаешь наследование
        this.finish = {
            status_fail: false,
            message: undefined,
        };
    }
    start() {
       
        let length = this.countLength(this.table);
        if (!this.in_calc) {
            this.findDelta();
            this.initAddTmp();
            this.getViewTable();
          
        }
    }
    isArtificial() {
        return true;
    }
    updateConfig(config) {
        this.in_calc = config.in_calc;
        this.controller = config.controller;
        this.mode_val = config.mode_val;
        this.table = config.table;
        this.supp_index_col = config.supp_index_col;
        this.supp_index_str = config.supp_index_str;
    }
    checkAnswer() {
        return new Promise((resolve, reject) => {
            let length = this.countLength(this.table),
                message = "";
         
            this.getViewTable();
            if (!this.checkPositiveDelta(this.table[length - 1])) {
                this.kol_steps++;

                if (this.kol_steps < 15) {
                
                    this.newBasis();
                } else {
                    resolve({
                        status_failess: true,
                        message: "Что то пошло не так",
                        data: this.table,
                        basis: this.new_basis,
                    });
                }
          
                if (this.mode_val == "auto") {
                 
                    this.checkAnswer();
                } else {
                    message = "not auto";
                    if (this.checkPositiveDelta(this.table[length - 1])) {
                        this.removeAddTmp();
                        resolve({ status_failess: true, message: message, data: this.table, basis: this.new_basis });
                    }
                    resolve({ status_failess: false, message: message, data: this.table, basis: this.new_basis });
                }
              

                resolve({ status_failess: true, message: message, data: this.table, basis: this.new_basis });
            } else {
            
                this.removeAddTmp();
    
                this.getViewTable();

                resolve({ status_failess: true, message: "", data: this.table, basis: this.new_basis });
            }
        });
    }
    removeAddTmp() {
        let keys = Object.keys(this.table),
            length_tb,
            length_byf,
            byf = [];
        //console.log("REMOVE!!!!!!!!!!");

        for (var prs in this.table) {
            if (keys[keys.length - 1] != prs) {
                //console.log(this.basis.length, this.basis);
                byf[prs] = [];
                for (let i = 0; i < this.table[prs].length - this.basis.length - 1; i++) {
                    byf[prs][i] = this.table[prs][i];
                }
            }

            // //console.log(byf);
        }

        for (var prs in byf) {
            //console.log(keys[keys.length - 1], prs);
            length_byf = byf[prs].length;
            length_tb = this.table[prs].length - 1;
            byf[prs][length_byf] = this.table[prs][length_tb];
        }

        this.table = byf;
    }
    initAddTmp() {
        let count = 0,
            length_tb,
            length_byf,
            byf = [];
        for (var prs in this.table) {
            byf[prs] = [];
            for (let i = 0; i < this.table[prs].length - 1; i++) {
                byf[prs][i] = this.table[prs][i];
            }
            // byf[prs] = byf[prs].pop();
            //console.log(byf);
        }
        this.basis.forEach((index) => {
            for (let i = 0; i < this.countLength(this.table); i++) {
                if (count == i) {
                    byf[i][index] = new NumberSimplx(1, false);
                } else {
                    byf[i][index] = new NumberSimplx(0, false);
                }
            }

            count += 1;
        });
        for (var prs in byf) {
            length_byf = byf[prs].length;
            length_tb = this.table[prs].length - 1;
            byf[prs][length_byf] = this.table[prs][length_tb];
        }

        this.table = byf;
    }
    //repeat
    setAvailabeElem(index_str_sup, index_colum_sup) {
        this.table[index_str_sup][index_colum_sup].setSupportEl(true, true);
        let index_str,
            length_str = this.countLength(this.table) - 1;
        for (let i = 0; i < this.table[0].length - 1; i++) {
            if (i != index_colum_sup) {
                index_str = this.getCurentIndexStr(i, false);
                if (this.number_manager.toCompare(this.table[length_str][i], "<", 0))
                    this.table[index_str][i].setSupportEl(true, false);
            }
        }
    }
    //repeat
    initSupportEl(supp_index_str, supp_index_col) {
        this.supp_index_str = supp_index_str;
        this.supp_index_col = supp_index_col;
    }

    initBasisTemp(index_colum, index_str) {
        // //console.log("\n_________--!!!!!!!!!!initBasisTemp", index_colum, index_str, this.new_basis);

        this.new_basis[index_str] = index_colum;
        for (var prs in this.table) {
            if (prs == index_str) {
                this.table[prs][index_colum] = new NumberSimplx(1, false);
            } else {
                this.table[prs][index_colum] = new NumberSimplx(0, false);
            }
        }
    }
    //repeat
    getCurentIndexStr(index_colum, check_error = true) {
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
                 
                    min = tmp;
                    index_str = i;
                }
            }
        }

        if (index_str == -1 && check_error) {
          
            this.getViewTable();
            this.finish.status_fail = true;
            this.finish.message = "Решения не существует";
        }
     
        return index_str;
    }
    //repeat
    getMinCoef(get_index) {
        let length = this.table[0].length,
            min = 100000,
            byf_delta = this.table[this.countLength(this.table) - 1],
            index_min = 0;

        for (let i = 0; i < length - 1; i++) {
            if (
                this.number_manager.toCompare(byf_delta[i], "<", min) &&
                this.number_manager.toCompare(byf_delta[i], "<", 0)
            ) {
                min = byf_delta[i];

                if (get_index) {
                    index_min = i;
                }
            }
        }
        return get_index ? index_min : min;
    }
    //repeat
    changeTable(index_colum, index_str) {
        let length = this.countLength(this.table),
            length_str = this.table[0].length,
            data = [],
            tmp,
            byf;

        for (let i = 0; i < length; i++) {
            data[i] = [];

            for (let j = 0; j < length_str; j++) {
                if (j != index_colum && i == index_str) {
                    data[i][j] = this.number_manager.calculate(
                        this.table[i][j],
                        "/",
                        this.table[index_str][index_colum]
                    );
                } else if (i == index_str && j == index_colum) {
                    data[i][j] = this.number_manager.calculate(
                        this.table[i][j],
                        "/",
                        this.table[index_str][index_colum]
                    );
                } else if (i != index_str && j == index_colum) {
                    tmp = this.number_manager.calculate(this.table[i][j], "*", -1);
                    data[i][j] = this.number_manager.calculate(tmp, "/", this.table[index_str][index_colum]);
                } else {
                    tmp = this.number_manager.calculate(this.table[i][j], "*", this.table[index_str][index_colum]);
                    byf = this.number_manager.calculate(this.table[index_str][j], "*", this.table[i][index_colum]);
                    tmp = this.number_manager.calculate(tmp, "-", byf);
                    data[i][j] = this.number_manager.calculate(tmp, "/", this.table[index_str][index_colum]);
                }
            }
        }

        return data;
    }
    //repeat
    newBasis() {
        let index_colum, index_str;
       
        if (this.mode_val == "auto" || this.supp_index_str === null || this.supp_index_col === null) {
            index_colum = this.getMinCoef(true);
            index_str = this.getCurentIndexStr(index_colum);
        } else {
            index_colum = this.supp_index_col;
            index_str = this.supp_index_str;
            this.table = this.changeTable(index_colum, index_str);
            this.initBasisTemp(index_colum, index_str);
            index_colum = this.getMinCoef(true);
            index_str = this.getCurentIndexStr(index_colum);
        }
        this.getViewTable();
       

        if (!this.finish.status_fail && !this.checkPositiveDelta(this.table[this.countLength(this.table) - 1])) {
            if (this.mode_val == "auto") {
              
         
                this.getViewTable();
                this.table = this.changeTable(index_colum, index_str);
                this.initBasisTemp(index_colum, index_str);
                this.newBasis();
            } else {
                this.setAvailabeElem(index_str, index_colum);
                // //console.log(" this.controller => ", index_colum, index_str);
                this.controller.updateTableAfterStep(this.getViewTable(this.table, true), this.mode_val);
            }
        } else {
        
            this.controller.updateTableAfterStep(this.getViewTable(this.table, true), this.mode_val);
          

        }
    }
    sentAnswer(table = this.table) {
        this.controller.updateTableView(this.getViewTable(table, true));
        this.controller.showAnswer(table[this.countLength(table) - 1][table[0].length - 1].showNumber());
    }
    // repeat
    countLength(obj) {
        var count = 0;
        for (var prs in obj) {
            count++;
        }
        return count;
    }
    // repeat
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
    // repeat
    checkPositiveDelta(delta_cache) {
        let res = true;

        for (let i = 0; i < delta_cache.length - 1; i++) {
            if (this.number_manager.toCompare(delta_cache[i], "<", 0)) {
                res = false;
            }
        }
        return res;
    }
    findDelta() {
        let length = this.countLength(this.table),
            delta_cache = [];

        for (let j = 0; j < this.table[0].length; j++) {
            delta_cache[j] = 0;
        }
        for (let j = 0; j < this.table[0].length; j++) {
            for (let i = 0; i < length; i++) {
                delta_cache[j] = this.number_manager.calculate(delta_cache[j], "+", this.table[i][j]);
            }
            delta_cache[j] = this.number_manager.calculate(delta_cache[j], "*", -1);
        }
        this.table[length] = delta_cache;
       
    }
}
