/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script/ts/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/script/ts/main.ts":
/*!*******************************!*\
  !*** ./src/script/ts/main.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const numder_1 = __webpack_require__(/*! ./modules/numder */ "./src/script/ts/modules/numder.ts");
const NumbersManager_1 = __webpack_require__(/*! ./modules/NumbersManager */ "./src/script/ts/modules/NumbersManager.ts");
const gaus_1 = __webpack_require__(/*! ./modules/gaus */ "./src/script/ts/modules/gaus.ts");
class Controller {
    constructor() {
        this.table = [];
        this.number_manager = new NumbersManager_1.NumbersManager();
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
        let length = this.table.length - 1, res = false;
        // this.table[length].forEach((elem) => {
        //     if (elem < 0) {
        //         res = true;
        //     }
        // });
        for (let i = 0; i < this.table[length].length - 1; i++) {
            if (this.table[length][i] < 0)
                res = true;
        }
        return res;
    }
    getMinCoef(index) {
        let length = this.table[0].length, min = this.delta_cache[0], byf_delta = this.table[this.table.length - 1], index_min = 0;
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
        let length = this.table.length, length_str = this.table[0].length, index_str = -1, min;
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
                        }
                        else if (this.sing_restrictions[i] == ">") {
                            byf = this.table[j][length_str - 1];
                            this.table[j][length_str - 1] = -1;
                            this.table[j][length_str] = byf;
                        }
                    }
                    else {
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
        let length = this.table[0].length, numb_basis = this.table.length;
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
            if (delta_cache[i] < 0)
                res = false;
        }
        return res;
    }
    changeTable(index_colum, index_str) {
        console.log("changeTable", this.table);
        let length = this.table.length, length_str = this.table[0].length, data = [];
        // console.log(index_str, index_colum, this.delta_cache);
        for (let i = 0; i < length; i++) {
            data[i] = [];
            // console.log("data", data[i]);
            for (let j = 0; j < length_str; j++) {
                if (j != index_colum && i == index_str) {
                    data[i][j] = this.table[i][j] / this.table[index_str][index_colum];
                    // console.log("i (this.table[i][j] / this.table[i][index_str]) * -1", this.table);
                }
                else if (i == index_str && j == index_colum) {
                    data[i][j] = this.table[i][j] / this.table[index_str][index_colum];
                }
                else if (i != index_str && j == index_colum) {
                    data[i][j] = (this.table[i][j] * -1) / this.table[index_str][index_colum];
                }
                else {
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
                if (this.numb_basis < 30)
                    this.newBasis();
            }
            else {
                console.log("Finish Answer:=>", this.table[this.table.length - 1][this.table[0].length - 1]);
            }
        }
        else {
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
        this.gaus = new gaus_1.Gaus(this.table);
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
    let summ_1 = document.getElementById("summ_1").value, summ_2 = document.getElementById("summ_2").value, oper = document.getElementById("operation").value;
    let numb_1 = new numder_1.Number(summ_1), numb_2 = new numder_1.Number(summ_2);
    let manager_numb = new NumbersManager_1.NumbersManager();
    manager_numb.calculate(numb_1, oper, numb_2);
}
document.addEventListener("DOMContentLoaded", () => {
    let controller = new Controller();
    controller.start();
    document.getElementById("solve").addEventListener("click", opearation_number);
});


/***/ }),

/***/ "./src/script/ts/modules/NumbersManager.ts":
/*!*************************************************!*\
  !*** ./src/script/ts/modules/NumbersManager.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const numder_1 = __webpack_require__(/*! ../modules/numder */ "./src/script/ts/modules/numder.ts");
class NumbersManager {
    constructor() { }
    calculate(number_1, operation, number_2) {
        if (operation == "+") {
            this.toSum(number_1, number_2);
        }
        if (operation == "-") {
            this.toSubtrac(number_1, number_2);
        }
        if (operation == "/") {
            this.toDivision(number_1, number_2);
        }
        if (operation == "*") {
            this.toMultiply(number_1, number_2);
        }
    }
    toSum(number_1, number_2) {
        let res_numerator, res_significant;
        res_numerator =
            number_1.getNumerator() * number_2.getSignificant() +
                number_2.getNumerator() * number_1.getSignificant();
        res_significant = number_2.getSignificant() * number_1.getSignificant();
        return new numder_1.Number(res_numerator + "/" + res_significant);
    }
    toSubtrac(number_1, number_2) {
        let res_numerator, res_significant;
        res_numerator =
            number_1.getNumerator() * number_2.getSignificant() -
                number_2.getNumerator() * number_1.getSignificant();
        res_significant = number_2.getSignificant() * number_1.getSignificant();
        return new numder_1.Number(res_numerator + "/" + res_significant);
    }
    toDivision(number_1, number_2) {
        let res_numerator, res_significant;
        res_numerator = number_1.getNumerator() * number_2.getSignificant();
        res_significant = number_2.getNumerator() * number_1.getSignificant();
        return new numder_1.Number(res_numerator + "/" + res_significant);
    }
    toMultiply(number_1, number_2) {
        let res_numerator, res_significant;
        res_numerator = number_1.getNumerator() * number_2.getNumerator();
        res_significant = number_2.getSignificant() * number_1.getSignificant();
        return new numder_1.Number(res_numerator + "/" + res_significant);
    }
}
exports.NumbersManager = NumbersManager;


/***/ }),

/***/ "./src/script/ts/modules/gaus.ts":
/*!***************************************!*\
  !*** ./src/script/ts/modules/gaus.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// const fs = require("fs");
// console.log("Start program", process.argv[2]);
// fs.readFile("./data/" + process.argv[2], (err, data) => {
//     if (err) {
//         console.error("ERROR->>>", err);
//     }
Object.defineProperty(exports, "__esModule", { value: true });
//     let inputData = data.toString().split("\n"),
//         byf,
//         valData = [];
//     inputData = inputData.map((stringArr) => {
//         byf = stringArr.split("|");
//         valData.push(parseFloat(byf[1]));
//         return byf[0].split(",").map((elem) => {
//             return parseFloat(elem);
//         });
//     });
//     let app = new App(inputData);
//     app.forwardWay();
//     app.backWay();
// });
class Gaus {
    constructor(data) {
        // console.log("input Gaus");
        console.log(data);
        this.data = data;
        // this.cache = [];
        // for (let i = 0; i < data.length; i++) {
        //     this.cache[i] = [];
        //     for (let j = 0; j < data[i].length; j++) {
        //         this.cache[i][j] = data[i][j];
        //     }
        // }
        this.basis = [];
        for (let i = 0; i < data.length; i++) {
            this.basis.push(i);
        }
        // data.forEach((elem) => {
        //     this.data.push(elem);
        // });
    }
    printData(arr = []) {
        if (arr.length == 0)
            arr = this.data;
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);
        }
    }
    getMaxStr(data, pos) {
        let j = pos, arrRes = data, max = data[pos][pos], index = pos, byf;
        for (let i = pos; i < data.length; i++) {
            if (max < data[i][pos] && data[i][pos] != 0) {
                max = data[i][pos];
                index = i;
            }
        }
        byf = data[pos];
        data[pos] = data[index];
        data[index] = byf;
        // console.log(arrRes);
        return arrRes;
    }
    forwardWay() {
        let length = this.data.length;
        for (let i = 0; i < length; i++) {
            this.data = this.getMaxStr(this.data, i);
            //все строчки нужно сделать нормальными
            this.data = this.delDateOnCoef(i, this.data, this.data.length);
            for (let j = i + 1; j < length; j++) {
                this.substrStroke(this.data[j], this.data[i], i);
            }
        }
    }
    multiStrokeOnCoef(z, data, length) {
        let coef, byf;
        if (z + 1 < data.length) {
            byf = data[z + 1];
            for (let i = 0; i <= z; i++) {
                coef = data[i][z + 1];
                //строки
                for (let j = i + 1; j < length; j++) {
                    data[i][j] = data[i][j] - byf[j] * coef;
                }
            }
        }
        return data;
    }
    substrStroke(arrDefault, arrSubstracted, positionDefault) {
        let count = 0, sign = 1, kol = 0;
        while (true) {
            kol++;
            if (arrDefault[positionDefault] == 0 || kol == 15) {
                break;
            }
            if (arrDefault[positionDefault] > 0) {
                arrDefault[positionDefault] -= 1;
                sign = 1;
            }
            else {
                arrDefault[positionDefault] += 1;
                sign = -1;
            }
            // console.log(arrDefault, positionDefault);
            count++;
        }
        for (let i = positionDefault + 1; i < arrDefault.length; i++) {
            arrDefault[i] -= count * arrSubstracted[i] * sign;
        }
        return arrDefault;
    }
    checkValueFunc() {
        let res = -1, length = this.data[0].length - 1, max_neg = -1;
        for (let i = 0; i < this.data.length; i++) {
            // console.log(this.data[i][length]);
            if (this.data[i][length] < 0 && max_neg < Math.abs(this.data[i][length])) {
                res = i;
                max_neg = Math.abs(this.data[i][length]);
            }
        }
        return res;
    }
    reverseColum() {
        // какая то фигня получилась
        let byf, random_basis = Math.floor(Math.random() * (this.basis.length - 1)), random_colum = Math.floor(Math.random() * (this.data[0].length - 2));
        console.log(random_basis, random_colum, this.data);
        for (let i = 0; i < this.data.length; i++) {
            byf = this.data[i][random_basis];
            this.data[i][random_basis] = this.data[i][random_colum];
            this.data[i][random_colum] = byf;
        }
    }
    getMaxColumIndex(index_str) {
        console.log("getMaxColumIndex", index_str, this.basis);
        let index_max = 0, max = Math.abs(this.data[index_str][0]);
        for (let i = 1; i < this.data[0].length - 1; i++) {
            if (max < Math.abs(this.data[index_str][i]) && this.basis.indexOf(i) == -1) {
                max = Math.abs(this.data[index_str][i]);
                index_max = i;
            }
        }
        return index_max;
    }
    delDateOnCoef(i, data, length) {
        let coef;
        for (let j = i; j < length; j++) {
            coef = data[j][i];
            if (coef != 0) {
                // this.delStrOnCoef(coef, data[j], i);
                for (let k = i; k < data[j].length; k++) {
                    data[j][k] = data[j][k] / coef;
                }
            }
        }
        return data;
    }
    delStrOnCoef(coef, str, start_ind) {
        for (let k = start_ind; k < str.length; k++) {
            str[k] = str[k] / coef;
        }
    }
    changeTable(index_neg_val) {
        let index_colum = this.getMaxColumIndex(index_neg_val), coef;
        this.delStrOnCoef(this.data[index_neg_val][index_colum], this.data[index_neg_val], 0);
        for (let i = 0; i < this.data.length; i++) {
            if (i != index_neg_val) {
                coef = this.data[i][index_colum];
                for (let j = 0; j < this.data[i].length; j++) {
                    // console.log(this.data[i][index_colum], j);
                    this.data[i][j] -= coef * this.data[index_neg_val][j];
                }
                console.log(this.data[i]);
            }
        }
        console.log("\nindex_max", index_colum, index_neg_val, this.data, this.basis);
    }
    start() {
        this.forwardWay();
        this.backWay();
        console.log(this.data);
        // this.checkAnswer();
        // return this.data;
    }
    checkAnswer() {
        return new Promise((resolve) => {
            let index_neg_val = this.checkValueFunc();
            console.log(index_neg_val);
            if (index_neg_val == -1) {
                console.log("Finish Gaus", this.data);
                resolve(this.data);
            }
            else {
                resolve(this.data);
                // this.changeTable(index_neg_val);
                // this.checkAnswer();
                // resolve(this.data);
            }
        });
    }
    backWay() {
        let length;
        length = this.data[0].length;
        // console.log("backWay", length);
        for (let i = 0; i < length - 2; i++) {
            this.data = this.multiStrokeOnCoef(i, this.data, length);
        }
        console.log("Output Gaus", this.data);
        // this.data.forEach((elem) => {
        //     console.log(elem);
        // });
    }
}
exports.Gaus = Gaus;


/***/ }),

/***/ "./src/script/ts/modules/numder.ts":
/*!*****************************************!*\
  !*** ./src/script/ts/modules/numder.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Number {
    //significant - знаменатель
    // numerator -числитель
    constructor(number) {
        [this.numerator, this.significant] = this.checkNumber(number);
    }
    checkNumber(number) {
        if (typeof number == "string")
            if (number.indexOf("/") != -1) {
                number = number.split("/");
                if (number.length == 2)
                    return [parseInt(number[0]), parseInt(number[1])];
                //повесить обработчик ошибок
                else
                    return [1, 1];
            }
        if (!isNaN(number))
            return [parseInt(number), 1];
        //повесить обработчик ошибок
        return [1, 1];
    }
    getSignificant() {
        return this.significant;
    }
    getNumerator() {
        return this.numerator;
    }
    showNumber() {
        return " <div>${this.numerator}</div>";
    }
}
exports.Number = Number;


/***/ })

/******/ });
//# sourceMappingURL=main.js.map