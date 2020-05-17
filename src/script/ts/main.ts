import { Test } from "./test";
import { Number } from "./modules/numder";
import { NumbersManager } from "./modules/NumbersManager";
import { Gaus } from "./modules/gaus";
class Controller {
    table: any;
    number_manager: object;
    function: any;
    gaus: any;
    delta_cache: any;
    finish: any;
    numb_basis: any;
    find_min: boolean;
    sing_restrictions: any;
    constructor() {
        this.table = [];
        this.number_manager = new NumbersManager();
        this.gaus;
        this.delta_cache = [];
        this.numb_basis = [0, 1, 2];
        this.finish = {
            status: false,
            message: undefined,
        };
        this.function = [];
        this.find_min = true;
        // this.sing_restrictions = ["<", "<", "<"];
        this.sing_restrictions = ["=", "=", "="];
    }
    checkTable() {
        let length = this.table.length - 1,
            res = false;
        // this.table[length].forEach((elem) => {
        //     if (elem < 0) {
        //         res = true;
        //     }
        // });
        for (let i = 0; i < this.table[length].length - 1; i++) {
            if (this.table[length][i] < 0) res = true;
        }
        return res;
    }

    getMinCoef(index) {
        let length = this.table[0].length,
            min = this.delta_cache[0],
            byf_delta = this.table[this.table.length - 1],
            index_min = 0;

        for (let i = 0; i < length - 1; i++) {
            // console.log("!!!!!!!!!!!!!!!!!!", byf_delta[i], "<", 0, byf_delta[i] < 0, length - 1);
            if (byf_delta[i] < min && byf_delta[i] < 0) {
                min = byf_delta[i];

                if (index) {
                    index_min = i;
                }
            }
        }
        console.log("\ngetMinCoef", index ? index_min : min);
        return index ? index_min : min;
    }
    getCurentIndexStr(index_colum) {
        let length = this.table.length,
            length_str = this.table[0].length,
            index_str = -1,
            min;
        min = 0;
        for (let i = 0; i < length - 1; i++) {
            // console.log(
            //     "this.table[i][length_str - 1] / this.table[i][index_colum]",
            //     this.table[i][length_str - 1],
            //     "/",
            //     this.table,
            //     index_colum
            // );
            if (this.table[i][index_colum] > 0)
                if (this.table[i][length_str - 1] / this.table[i][index_colum] > min || min == 0) {
                    //  || min == NaN
                    min = this.table[i][length_str - 1] / this.table[i][index_colum];
                    index_str = i;
                }
        }

        if (index_str == -1) {
            console.log("\n\n this.finish.message ", min, index_str);
            this.finish.status = true;
            this.finish.message = "Решения не существует";
        }
        return index_str;
    }
    checkRestrictions() {
        var length_str, byf;
        for (var i = 0; i < this.sing_restrictions.length; i++) {
            if (this.sing_restrictions[i] == "<" || this.sing_restrictions[i] == ">") {
                for (var j = 0; j < this.table.length; j++) {
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
        console.log(this.table);
        // this.correctTable();
    }
    correctTable() {
        this.table;
    }
    createSimplexTable() {
        let coef = [];
        for (let i = 0; i < this.table[0].length; i++) {
            coef[i] = 0;
            for (let j = 0; j < this.table.length; j++) {
                coef[i] += this.table[j][i];
            }
            coef[i] *= -1;
        }
        this.table.push(coef);
        // console.log(this.table);
    }
    findDelta() {
        console.log(" \n\nfindDelta()", this.table);
        let length = this.table[0].length,
            numb_basis = this.table.length;

        for (let j = 0; j < length; j++) {
            this.delta_cache[j] = 0;
        }
        for (let i_basis = 0; i_basis < numb_basis; i_basis++) {
            for (let j = 0; j < length; j++) {
                this.delta_cache[j] += this.function[i_basis] * this.table[i_basis][j];
            }
        }
        for (let j = 0; j < length; j++) {
            this.delta_cache[j] -= this.function[j];
        }
        this.table[this.table.length] = this.delta_cache;
        console.log("!this.table", this.table, this.delta_cache);
    }
    checkPositiveDelta(delta_cache) {
        let res = true;
        // delta_cache.forEach((elem) => {
        //     if (elem < 0) res = false;
        // });
        for (let i = 0; i < delta_cache.length - 1; i++) {
            if (delta_cache[i] < 0) res = false;
        }
        return res;
    }
    changeTable(index_colum, index_str) {
        console.log("changeTable", this.table);
        let length = this.table.length,
            length_str = this.table[0].length,
            data = [];

        // console.log(index_str, index_colum, this.delta_cache);
        for (let i = 0; i < length; i++) {
            data[i] = [];
            // console.log("data", data[i]);
            for (let j = 0; j < length_str; j++) {
                if (j != index_colum && i == index_str) {
                    data[i][j] = this.table[i][j] / this.table[index_str][index_colum];
                    // console.log("i (this.table[i][j] / this.table[i][index_str]) * -1", this.table);
                } else if (i == index_str && j == index_colum) {
                    data[i][j] = this.table[i][j] / this.table[index_str][index_colum];
                } else if (i != index_str && j == index_colum) {
                    data[i][j] = (this.table[i][j] * -1) / this.table[index_str][index_colum];
                } else {
                    data[i][j] =
                        (this.table[i][j] * this.table[index_str][index_colum] -
                            this.table[index_str][j] * this.table[i][index_colum]) /
                        this.table[index_str][index_colum];
                }
            }
        }
        console.log("data", data);

        return data;
    }
    newBasis() {
        let index_colum, index_str, byf;
        index_colum = this.getMinCoef(true);
        index_str = this.getCurentIndexStr(index_colum);
        if (!this.finish.status) {
            console.log("Опорный элемент", index_colum, index_str, this.table[index_str][index_colum]);

            this.table = this.changeTable(index_colum, index_str);
            if (!this.checkPositiveDelta(this.table[this.table.length - 1])) {
                // this.newBasis();
                this.numb_basis++;
                console.log("Not Finish", this.table);
                if (this.numb_basis < 30) this.newBasis();
            } else {
                console.log("Finish Answer:=>", this.table[this.table.length - 1][this.table[0].length - 1]);
            }
        } else {
            console.log(this.finish.message);
        }

        // console.log("Опорный элемент", index_colum, index_str, "value", this.table[index_str][index_colum]);
        // console.log(this.table);
    }
    start() {
        console.log("start!");

        // this.function = [-6, -1, -4, 1, 0];
        // this.table = [
        //     [3, 1, -1, 1, 4],
        //     [5, 1, 1, -1, 4],
        // ]; // min = -8
        // this.function = [4, 5, 4, 0];
        // this.table = [
        //     [2, 3, 6, 240],
        //     [4, 2, 4, 200],
        //     [4, 6, 8, 160],
        // ]; // max 16 min 5
        this.function = [4, 5, 4, 0, 0, 0, 0];
        this.table = [
            [1, 1.4, 2, 0, 0, 0.25, 40],
            [0, -4, -4, 0, 1, -1, 40],
            [0, 0, 2, 1, 0, -0.5, 160],
        ]; // max 16 min 5

        this.checkRestrictions();
        this.gaus = new Gaus(this.table);

        this.gaus.start();
        this.gaus.checkAnswer().then((res) => {
            this.table = res;
            console.log(this.table);
            // this.findDelta();

            // if (!this.checkPositiveDelta(this.delta_cache)) {
            //     console.log("start basic");
            //     this.newBasis();
            // } else {
            //     console.log("Finish Answer WB:=>", this.table[this.table.length - 1][this.table[0].length - 1]);
            // }
        });
        // this.table = this.gaus.start();
        // this.findDelta();

        // if (!this.checkPositiveDelta(this.delta_cache)) {
        //     console.log("start basic");
        //     this.newBasis();
        // }
        // this.createSimplexTable();

        // }
    }
}

function opearation_number(event) {
    let summ_1 = (<HTMLInputElement>document.getElementById("summ_1")).value,
        summ_2 = (<HTMLInputElement>document.getElementById("summ_2")).value,
        oper = (<HTMLInputElement>document.getElementById("operation")).value;

    let numb_1 = new Number(summ_1),
        numb_2 = new Number(summ_2);
    let manager_numb = new NumbersManager();

    manager_numb.calculate(numb_1, oper, numb_2);
}

document.addEventListener("DOMContentLoaded", () => {
    let controller = new Controller();
    controller.start();

    document.getElementById("solve").addEventListener("click", opearation_number);
});
