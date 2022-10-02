export class View {
    dom_function: any;
    dom_limits: any;
    config_simple: any;
    num_var: any;
    controller: any;
    num_lim: any;
    dom_answer: any;
    dom_user_basis: any;
    dom_num_var: any;
    dom_num_lim: any;
    constructor(config) {
        this.config_simple;

        this.dom_function = config.dom_function;
        this.dom_limits = config.dom_limits;
        this.dom_answer = config.dom_answer;
        this.dom_user_basis = config.dom_user_basis;
        this.dom_num_lim = config.dom_num_lim;
        this.dom_num_var = config.dom_num_var;
    }
    init() {}
    drawFunction(num_var) {
        this.dom_function.innerHTML = "";
        num_var = parseInt(num_var);
        let tr = document.createElement("tr"),
            td,
            input,
            val_inp;
        tr.classList.add("table_tr");
        this.num_var;

        for (let i = 0; i < num_var + 1; i++) {
            td = document.createElement("td");
            input = document.createElement("input");
            input.classList.add("table__inputs");
            input.classList.add("function");
            input.type = "text";
            val_inp = this.config_simple.function[i];
            if (!!!val_inp) {
                val_inp = 0;
            }
            if (typeof val_inp == "number" || typeof val_inp == "string") {
                // alert(1);
                input.value = val_inp;
            } else {
                input.value = val_inp.showNumber();
            }
            td.appendChild(input);
            tr.appendChild(td);
        }
        this.dom_function.appendChild(tr);
    }
    countLength(obj) {
        var count = 0;
        for (var prs in obj) {
            count++;
        }
        return count;
    }
    initConfig(config_simple) {
        this.config_simple = config_simple;
    }
    cleanArea() {
        this.num_var = 0;
        this.num_lim = 0;
        this.dom_function.innerHTML = "";
        this.dom_limits.innerHTML = "";
        this.dom_user_basis.innerHTML = "";
    }
    updateTableView(table, mode = "auto", funcEvent = null) {
        let num_var = this.num_var;

        this.config_simple.table = table;
        if (typeof table == "object") {
            num_var = table[0].length - 1;
        }

        this.drawLimits(num_var, this.countLength(table), mode, funcEvent);
    }
    createCells(value, class_list) {
        let td, input;
        td = document.createElement("td");
        input = document.createElement("input");
        class_list.forEach((element) => {
            input.classList.add(element);
        });
        input.classList.add("table__inputs");
        input.classList.add("user_basis");
        input.type = "text";
        input.value = value;
        td.appendChild(input);
        return td;
    }
    drawUserBasisArea(enable) {
        let tr = document.createElement("tr"),
            td;
        if (enable) {
            this.dom_user_basis.innerHTML = "";
            for (let j = 0; j < this.num_var; j++) {
                td = this.createCells(0, ["table__inputs", "user_basis"]);
                tr.appendChild(td);
            }
            this.dom_user_basis.appendChild(tr);
        } else {
            this.dom_user_basis.innerHTML = "";
            td = this.createCells("Auto", ["table__inputs", "user_basis"]);
            tr.appendChild(td);
            this.dom_user_basis.appendChild(tr);
        }
    }
    showAnswerView(value) {
        this.dom_answer.innerHTML = `<h3 class="answer__val">Ответ: ${value}</h3`;
    }
    updateNumParameters(num_var, num_lim) {
        this.dom_num_lim.value = num_lim;
        this.dom_num_var.value = num_var;
    }
    changeCeils(remove, arr_obj) {
        let cahce_tr = [...arr_obj.getElementsByClassName("table_tr")];
        console.log(cahce_tr);
        cahce_tr.forEach((elem_tr) => {
            if (remove) {
                this.createTd(elem_tr, 0, this.num_var, "auto");
            } else {
                this.remove1Ceils(elem_tr);
            }
        });
    }
    remove1Ceils(tr) {
        tr.removeChild(tr.lastChild);
    }
    updateNumLimV2 = (num_var, num_lim, mode, funcEvent = null) => {
        console.log(num_var, this.num_var);
        if (num_var > this.num_var) {
            this.changeCeils(true, this.dom_limits);
        } else {
            this.changeCeils(false, this.dom_limits);
        }
    };
    prepEqualCeil() {
        let tmp;
        tmp = document.createElement("span");
        tmp.classList.add("table__equal");
        tmp.innerText = "=";
        return tmp;
    }
    createTd(tr, j, i, mode, funcEvent = null) {
        let td, input, tmp, val_inp;

        td = document.createElement("td");
        input = document.createElement("input");
        input.classList.add("table__inputs", "limits_inp");

        input.type = "text";
        if (!!this.config_simple.table[j]) {
            val_inp = !!this.config_simple.table[j][i] ? this.config_simple.table[j][i] : 0;
        } else {
            val_inp = 0;
        }

        if (typeof val_inp == "number" || typeof val_inp == "string") {
            input.value = val_inp;
        } else {
            if (val_inp.back) {
                input.value = val_inp.value;
            } else {
                input.value = val_inp.showNumber();
            }
        }

        if (mode == "steps" && !!this.config_simple.table[j][i]) {
            if (this.config_simple.table[j][i].checkSupportEl()) {
                tmp = document.createElement("input");
                tmp.type = "radio";
                tmp.name = "support_elem";

                tmp.setAttribute("data-pos_str", j);
                tmp.setAttribute("data-pos_col", i);
                tmp.addEventListener("change", funcEvent);
                td.appendChild(input);
                if (this.config_simple.table[j][i].checkBestSupportEl()) {
                    tmp.classList.add("best_support");
                } else {
                    tmp.classList.add("support");
                }
                td.appendChild(tmp);
            } else {
                td.appendChild(input);
            }
        } else {
            td.appendChild(input);
        }

        tr.appendChild(td);
    }
    createTr(j, num_var, mode, funcEvent = null) {
        let tr, td, input, tmp, val_inp;
        tr = document.createElement("tr");
        tr.classList.add("table_tr", "limits");
        console.log("heree");
        for (let i = 0; i < num_var + 1; i++) {
            this.createTd(tr, j, i, mode, funcEvent);
        }
        return tr;
    }
    updateFunction = (num_var) => {
        if (num_var > this.num_var) {
            this.changeCeils(true, this.dom_function);
        } else {
            this.changeCeils(false, this.dom_function);
        }
    };
    updateNumVar(num_var) {
        this.num_var = num_var;
    }
    drawLimits = (num_var, num_lim, mode, funcEvent = null) => {
        this.dom_limits.innerHTML = "";
        num_var = parseInt(num_var);
        console.log("start draw!!!!!!");
        this.num_var = num_var;
        this.updateNumParameters(this.num_var, num_lim);
        let tr, td, input, tmp, val_inp;

        for (let j = 0; j < num_lim; j++) {
            tr = this.createTr(j, num_var, mode, funcEvent);
            this.dom_limits.appendChild(tr);
        }
    };
}
