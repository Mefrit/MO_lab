export class View {
    dom_function: any;
    dom_limits: any;
    config_simple: any;
    num_var: any;
    controller: any;
    num_lim: any;
    dom_answer: any;
    dom_user_basis: any;
    constructor(config) {
        console.log(config);
        this.config_simple;

        this.dom_function = config.dom_function;
        this.dom_limits = config.dom_limits;
        this.dom_answer = config.dom_answer;
        this.dom_user_basis = config.dom_user_basis;
        this.num_var;
        this.num_lim;
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
        console.log(this.config_simple, num_var);
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
        console.log(table);
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

    drawLimits(num_var = this.num_var, num_lim, mode, funcEvent = null) {
        this.dom_limits.innerHTML = "";
        num_var = parseInt(num_var);
        console.log("drawLimits=>", this.config_simple.table, num_lim, num_var);
        this.num_var = num_var;

        let tr, td, input, tmp, val_inp;

        for (let j = 0; j < num_lim; j++) {
            tr = document.createElement("tr");
            tr.classList.add("table_tr");
            tr.classList.add("limits");
            for (let i = 0; i < num_var + 1; i++) {
                td = document.createElement("td");
                input = document.createElement("input");
                input.classList.add("table__inputs");
                input.classList.add("limits_inp");
                input.type = "text";

                val_inp = !!this.config_simple.table[j][i] ? this.config_simple.table[j][i] : 0;
                // console.log("val_inp", val_inp);
                if (typeof val_inp == "number" || typeof val_inp == "string") {
                    // alert(1);
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
                        td.appendChild(tmp);
                    } else {
                        td.appendChild(input);
                    }
                } else {
                    td.appendChild(input);
                }

                tr.appendChild(td);
            }
            this.dom_limits.appendChild(tr);
        }
    }
}
