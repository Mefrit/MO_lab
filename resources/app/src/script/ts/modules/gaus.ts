export class Gaus {
    data: any;
    cache: any;

    error: any;
    count_change: number;

    number_manager: any;
    basis: any;
    use_user_basis: boolean;
    constructor(data, number_manager, init_basis) {
        this.number_manager = number_manager;
        this.data = data;
        this.cache = [];
        this.basis = [];

        if (init_basis.length == 0) {
            this.use_user_basis = false;
            for (let i in this.data) {
                this.basis.push(parseInt(i));
            }
        } else {
            this.use_user_basis = true;
            this.basis = init_basis;
        }

        for (let i = 0; i < this.countLength(data); i++) {
            this.cache[i] = [];
            for (let j = 0; j < data[i].length; j++) {
                this.cache[i][j] = data[i][j];
            }
        }

        this.count_change = data[0].length + 20;
        this.error = false;

        // this.basis = [];
        // for (let i = 0; i < this.countLength(data); i++) {
        //     this.basis.push(i);

        // }
    }
    printData(arr = []) {
        if (arr.length == 0) arr = this.data;

        for (let i = 0; i < arr.length; i++) {
            //console.log(arr[i]);
        }
    }

    countLength(obj) {
        var count = 0;
        for (var prs in obj) {
            count++;
        }
        return count;
    }

    getMaxStr(data, pos_str, pos_colum) {
        let arrRes = data,
            max = data[pos_str][pos_colum],
            index = pos_str,
            byf,
            length = this.countLength(data);

        for (let i = pos_str; i < length; i++) {
            if (
                this.number_manager.toCompare(max, "<", data[i][pos_colum]) &&
                this.number_manager.toCompare(data[i][pos_colum], "!=", 0)
            ) {
                max = data[i][pos_colum];
                index = i;
            }
        }
        byf = data[pos_str];
        data[pos_str] = data[index];
        data[index] = byf;
        return arrRes;
    }
    delDateOnCoef(i, data, length) {
        let coef;
        for (let j = i; j < length; j++) {
            coef = data[j][this.basis[i]];

            if (coef.getNumerator() != 0) {
                for (let k = 0; k < data[j].length; k++) {
                    data[j][k] = this.number_manager.calculate(data[j][k], "/", coef);
                }
            }
        }
        return data;
    }
    forwardWay() {
        let length = this.countLength(this.data);
        for (var i in this.basis) {
            this.data = this.getMaxStr(this.data, parseInt(i), this.basis[i]);

            //все строчки нужно сделать нормальными
            this.data = this.delDateOnCoef(parseInt(i), this.data, length);

            for (let j = parseInt(i) + 1; j < length; j++) {
                this.substrStroke(this.data[j], this.data[i], this.basis[i]);
            }
        }
    }

    substrStroke(arrMinuend, arrSubstracted, position_diag_el) {
        let count = 0,
            sign = 1,
            kol = 0,
            tmp;

        position_diag_el = parseInt(position_diag_el);
        while (true) {
            kol++;

            if (this.number_manager.toCompare(arrMinuend[position_diag_el], "==", 0) || kol == 15) {
                break;
            }
            if (this.number_manager.toCompare(arrMinuend[position_diag_el], ">", 0)) {
                arrMinuend[position_diag_el] = this.number_manager.calculate(arrMinuend[position_diag_el], "-", 1);
                sign = 1;
            } else {
                arrMinuend[position_diag_el] = this.number_manager.calculate(arrMinuend[position_diag_el], "+", 1);
                sign = -1;
            }
            count++;
        }

        for (let i = 0; i < arrMinuend.length; i++) {
            if (i != position_diag_el) {
                tmp = this.number_manager.calculate(arrSubstracted[i], "*", sign);
                tmp = this.number_manager.calculate(count, "*", tmp);

                arrMinuend[i] = this.number_manager.calculate(arrMinuend[i], "-", tmp);
            }
        }

        return arrMinuend;
    }
    checkValueFunc() {
        let res = -1,
            length = this.data[0].length - 1,
            max_neg = 0,
            sqr_data,
            tmp,
            length_str = this.countLength(this.data);
        for (let i = 0; i < length_str; i++) {
            sqr_data = this.number_manager.calculate(this.data[i][length], "*", this.data[i][length]);
            tmp = this.number_manager.calculate(max_neg, "*", max_neg);

            if (
                this.number_manager.toCompare(this.data[i][length], "<", 0) &&
                this.number_manager.toCompare(tmp, "<", sqr_data)
            ) {
                res = i;
                max_neg = this.data[i][length];
            }
        }
        //console.log(res);
        return res;
    }

    getMaxColumIndex(index_str) {
        let index_max = -1,
            max = -1000,
            sqr_el;
        for (let i = 0; i < this.data[0].length - 1; i++) {
            sqr_el = this.number_manager.calculate(this.data[index_str][i], "*", this.data[index_str][i]);
            if (this.number_manager.toCompare(max, "<", sqr_el) && this.basis.indexOf(i) == -1) {
                max = sqr_el;
                index_max = i;
            }
        }

        if (index_max == -1) {
            this.error = true;
            console.log("\n error in getMaxColumIndex");
            return this.error;
        } else {
            return index_max;
        }
    }
    printTable() {
        let str_out;
        for (var prs in this.data) {
            str_out = "";
            this.data[prs].forEach((elem) => {
                str_out += elem.showNumber() + " | ";
            });
        }
    }
    delStrOnCoef(coef, str, start_ind) {
        for (let k = start_ind; k < str.length; k++) {
            str[k] = this.number_manager.calculate(str[k], "/", coef);
        }
    }
    changeTable(index_neg_val) {
        let index_colum = this.getMaxColumIndex(index_neg_val),
            coef,
            tmp,
            length = this.countLength(this.data);
        console.log("\n\nchangeTable", this.basis);

        // this.getViewTable(this.data);
        console.log("\n");
        this.count_change--;
        console.log(this.count_change);
        if (this.count_change > 0) {
            this.changeBasis(index_neg_val, index_colum);
            console.log("\nchangeBasis", this.basis);
            this.start();
        }
        // this.delStrOnCoef(this.data[index_neg_val][index_colum], this.data[index_neg_val], 0);

        // for (let i = 0; i < length; i++) {
        //     if (i != index_neg_val) {
        //         coef = this.data[i][index_colum];
        //         for (let j = 0; j < this.data[i].length; j++) {
        //             tmp = this.number_manager.calculate(coef, "*", this.data[index_neg_val][j]);
        //             this.data[i][j] = this.number_manager.calculate(this.data[i][j], "-", tmp);
        //         }
        //     }
        // }
    }
    getViewTable(table, to_view = false) {
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
    getRandomInt(max) {
        let tmp = Math.floor(Math.random() * Math.floor(max));
        if (this.basis.indexOf(tmp) == -1) {
            return tmp;
        } else {
            return this.getRandomInt(max);
        }
    }
    changeBasis(index_neg_val, index_new_basis) {
        this.basis[index_neg_val] = this.getRandomInt(this.data[0].length - 1);
        // for (let i = 0; i < this.new_basis.length; i++) {
        //     if (this.number_manager.toCompare(this.data[index_neg_val][this.new_basis[i]], "==", 1)) {
        //         this.new_basis[i] = index_new_basis;
        //     }
        // }
    }
    start() {
        this.forwardWay();

        this.backWay();
        // console.log("after backWay Way");
        // this.getViewTable(this.data);
        this.checkAnswer();
    }
    updateTable(data) {
        this.data = data;
    }
    checkUseBasis() {
        return;
    }
    checkAnswer() {
        return new Promise((resolve) => {
            let index_neg_val = this.checkValueFunc();

            if (index_neg_val == -1 || this.use_user_basis) {
                console.log("status_suc: true, message");
                resolve({ status_suc: true, message: "", data: this.data, basis: this.basis });
            } else {
                this.changeTable(index_neg_val);
                this.count_change--;
                console.log(this.count_change);
                if (this.count_change > 0) {
                    if (!this.error) {
                        this.checkAnswer();
                    } else {
                        console.log("error!!!!!!!!!!!!!!!");
                        alert("here");
                        resolve({ status_suc: false, message: "Error in Gaus method" });
                    }
                } else {
                    console.log("Error in Gaus metho");
                    // this.getViewTable(this.data);
                    resolve({ status_suc: false, message: "Error in Gaus method" });
                }
            }
        });
    }
    multiStrokeOnCoef(z, data, length) {
        let coef,
            byf,
            length_str = this.countLength(data),
            tmp;

        if (z + 1 < length_str) {
            byf = data[z + 1];

            for (let i = 0; i <= z; i++) {
                coef = data[i][this.basis[z + 1]];

                //строки
                for (let j = 0; j < length; j++) {
                    tmp = this.number_manager.calculate(byf[j], "*", coef);

                    data[i][j] = this.number_manager.calculate(data[i][j], "-", tmp);
                }
                // this.getViewTable(this.data);
            }
        }

        return data;
    }
    backWay() {
        let length;
        length = this.data[0].length;

        for (let i = 0; i < length - 2; i++) {
            this.data = this.multiStrokeOnCoef(i, this.data, length);
        }
    }
}
