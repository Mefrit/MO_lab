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
const controller_1 = __webpack_require__(/*! ./modules/controller */ "./src/script/ts/modules/controller.ts");
const view_1 = __webpack_require__(/*! ./modules/view */ "./src/script/ts/modules/view.ts");
const numder_1 = __webpack_require__(/*! ./modules/numder */ "./src/script/ts/modules/numder.ts");
function opearation_number(event) {
    // let summ_1 = (<HTMLInputElement>document.getElementById("summ_1")).value,
    //     summ_2 = (<HTMLInputElement>document.getElementById("summ_2")).value,
    //     oper = (<HTMLInputElement>document.getElementById("operation")).value;
    // console.log("opearation_number");
    // let numb_1 = new NumberSimplx(s  umm_1),
    //     numb_2 = new NumberSimplx(summ_2);
    // let manager_numb = new NumbersManager();
    // manager_numb.calculate(numb_1, oper, numb_2);
}
function prepConfig(config) {
    let arr = config.function, new_conf = config, arr_byf = [];
    for (let i = 0; i < arr.length; i++) {
        arr_byf[i] = new numder_1.NumberSimplx(arr[i], false);
    }
    new_conf.function = arr_byf;
    arr = config.table;
    arr_byf = [];
    for (let i = 0; i < arr.length; i++) {
        arr_byf[i] = [];
        for (let j = 0; j < arr[i].length; j++) {
            arr_byf[i].push(new numder_1.NumberSimplx(arr[i][j], false));
        }
    }
    new_conf.table = arr_byf;
    return new_conf;
}
document.addEventListener("DOMContentLoaded", () => {
    let view_obj, config_controller, config_view, controller_obj, config_simple;
    config_view = {
        dom_function: document.getElementById("function"),
        dom_limits: document.getElementById("limits"),
        dom_answer: document.getElementById("answer"),
        dom_user_basis: document.getElementById("user_basis_area"),
        dom_num_lim: document.getElementById("num_lim_dom"),
        dom_num_var: document.getElementById("num_var_dom"),
    };
    view_obj = new view_1.View(config_view);
    config_simple = {
        mode_val: "auto",
        user_basis: [],
        function: [-2, -3, 0, 1, 0, 0, 0],
        table: [
            [2, -1, 0, -2, 1, 0, 16],
            [3, 2, 1, -3, 0, 0, 18],
            [-1, 3, 0, 4, 0, 1, 24],
        ],
    };
    config_simple = prepConfig(config_simple);
    config_controller = {
        view_obj: view_obj,
        num_var: 6,
        config_simple: config_simple,
        num_lim: 3,
        start_input_dom: document.getElementById("start_calc"),
        func_inputs_dom: document.getElementsByClassName("function"),
        user_basis_table_dom: document.getElementsByClassName("user_basis"),
        limits_inputs_dom: document.getElementsByClassName("limits"),
        mode_dom: document.getElementById("kind_mode"),
        kind_number_dom: document.getElementById("kind_number"),
        start_return_dom: document.getElementById("start_return"),
        search_min: true,
        kind_method_dom: document.getElementById("kind_method"),
        kind_search_dom: document.getElementsByClassName("kind_search"),
        num_var_dom: document.getElementById("num_var_dom"),
        num_lim_dom: document.getElementById("num_lim_dom"),
        read_file_inp_dom: document.getElementById("read_file_inp"),
        save_file_inp_dom: document.getElementById("save_file_inp"),
        own_basis_checker_dom: document.getElementById("use_own_basis"),
    };
    controller_obj = new controller_1.Controller(config_controller);
    controller_obj.init();
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
    constructor(dec_num) {
        this.view_dec_num = dec_num;
    }
    calculate(number_1, operation, number_2) {
        // let arr_zn = ["==", "!=", "<", ">"];
        [number_1, number_2] = this.checkNumber(number_1, number_2);
        if (operation == "+") {
            return this.toSum(number_1, number_2);
        }
        if (operation == "-") {
            return this.toSubtrac(number_1, number_2);
        }
        if (operation == "/") {
            return this.toDivision(number_1, number_2);
        }
        if (operation == "*") {
            return this.toMultiply(number_1, number_2);
        }
        // if (arr_zn.indexOf(operation)) {
        //     return this.calculate(number_1, operation, number_2);
        // }
    }
    checkNumber(number_1, number_2) {
        if (typeof number_2 == "number" || typeof number_2 == "string") {
            number_2 = new numder_1.NumberSimplx(number_2, this.view_dec_num);
        }
        if (typeof number_1 == "number" || typeof number_1 == "string") {
            number_1 = new numder_1.NumberSimplx(number_1, this.view_dec_num);
        }
        return [number_1, number_2];
    }
    toCompare(number_1, operation, number_2) {
        // let res = true;
        [number_1, number_2] = this.checkNumber(number_1, number_2);
        if (operation == "<") {
            return this.toSubtrac(number_1, number_2).getNumerator() < 0;
        }
        if (operation == ">") {
            return this.toSubtrac(number_1, number_2).getNumerator() > 0;
        }
        if (operation == "==") {
            return this.toSubtrac(number_1, number_2).getNumerator() == 0;
        }
        if (operation == "!=") {
            return this.toSubtrac(number_1, number_2).getNumerator() != 0;
        }
    }
    toSum(number_1, number_2) {
        let res_numerator, res_significant;
        res_numerator =
            number_1.getNumerator() * number_2.getSignificant() + number_2.getNumerator() * number_1.getSignificant();
        res_significant = number_2.getSignificant() * number_1.getSignificant();
        return new numder_1.NumberSimplx(res_numerator + "/" + res_significant, this.view_dec_num);
    }
    toSubtrac(number_1, number_2) {
        let res_numerator, res_significant;
        res_numerator =
            number_1.getNumerator() * number_2.getSignificant() - number_2.getNumerator() * number_1.getSignificant();
        res_significant = number_2.getSignificant() * number_1.getSignificant();
        return new numder_1.NumberSimplx(res_numerator + "/" + res_significant, this.view_dec_num);
    }
    toDivision(number_1, number_2) {
        let res_numerator, res_significant;
        res_numerator = number_1.getNumerator() * number_2.getSignificant();
        res_significant = number_2.getNumerator() * number_1.getSignificant();
        // console.log("\n!!!!!!!!!!!!!!!", res_numerator, res_significant, "||| ", number_1, "/", number_2);
        return new numder_1.NumberSimplx(res_numerator + "/" + res_significant, this.view_dec_num);
    }
    toMultiply(number_1, number_2) {
        var res_numerator, res_significant;
        res_numerator = number_1.getNumerator() * number_2.getNumerator();
        res_significant = number_1.getSignificant() * number_2.getSignificant();
        return new numder_1.NumberSimplx(res_numerator + "/" + res_significant, this.view_dec_num);
    }
    initViewNum(view_dec_num) {
        this.view_dec_num = view_dec_num;
    }
}
exports.NumbersManager = NumbersManager;


/***/ }),

/***/ "./src/script/ts/modules/artificial.ts":
/*!*********************************************!*\
  !*** ./src/script/ts/modules/artificial.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const numder_1 = __webpack_require__(/*! ./numder */ "./src/script/ts/modules/numder.ts");
class ArtificialBassis {
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
            for (let i = config.table[0].length - 1; i < config.table[0].length + this.countLength(config.table) - 1; i++) {
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
            let length = this.countLength(this.table), message = "";
            this.getViewTable();
            if (!this.checkPositiveDelta(this.table[length - 1])) {
                this.kol_steps++;
                if (this.kol_steps < 15) {
                    this.newBasis();
                }
                else {
                    resolve({
                        status_suc: true,
                        message: "Что то пошло не так",
                        data: this.table,
                        basis: this.new_basis,
                    });
                }
                if (this.mode_val == "auto") {
                    this.checkAnswer();
                }
                else {
                    message = "not auto";
                    if (this.checkPositiveDelta(this.table[length - 1])) {
                        this.removeAddTmp();
                        resolve({ status_suc: true, message: message, data: this.table, basis: this.new_basis });
                    }
                    resolve({ status_suc: false, message: message, data: this.table, basis: this.new_basis });
                }
                resolve({ status_suc: true, message: message, data: this.table, basis: this.new_basis });
            }
            else {
                this.removeAddTmp();
                this.getViewTable();
                resolve({ status_suc: true, message: "", data: this.table, basis: this.new_basis });
            }
        });
    }
    removeAddTmp() {
        let keys = Object.keys(this.table), length_tb, length_byf, byf = [];
        for (var prs in this.table) {
            if (keys[keys.length - 1] != prs) {
                byf[prs] = [];
                for (let i = 0; i < this.table[prs].length - this.basis.length - 1; i++) {
                    byf[prs][i] = this.table[prs][i];
                }
            }
        }
        for (var prs in byf) {
            length_byf = byf[prs].length;
            length_tb = this.table[prs].length - 1;
            byf[prs][length_byf] = this.table[prs][length_tb];
        }
        this.table = byf;
    }
    initAddTmp() {
        let count = 0, length_tb, length_byf, byf = [];
        for (var prs in this.table) {
            byf[prs] = [];
            for (let i = 0; i < this.table[prs].length - 1; i++) {
                byf[prs][i] = this.table[prs][i];
            }
        }
        this.basis.forEach((index) => {
            for (let i = 0; i < this.countLength(this.table); i++) {
                if (count == i) {
                    byf[i][index] = new numder_1.NumberSimplx(1, false);
                }
                else {
                    byf[i][index] = new numder_1.NumberSimplx(0, false);
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
        let index_str, length_str = this.countLength(this.table) - 1;
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
                this.table[prs][index_colum] = new numder_1.NumberSimplx(1, false);
            }
            else {
                this.table[prs][index_colum] = new numder_1.NumberSimplx(0, false);
            }
        }
    }
    //repeat
    getCurentIndexStr(index_colum, check_error = true) {
        let length = this.countLength(this.table), length_str = this.table[0].length, index_str = -1, min, tmp;
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
        let length = this.table[0].length, min = 100000, byf_delta = this.table[this.countLength(this.table) - 1], index_min = 0;
        for (let i = 0; i < length - 1; i++) {
            if (this.number_manager.toCompare(byf_delta[i], "<", min) &&
                this.number_manager.toCompare(byf_delta[i], "<", 0)) {
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
        let length = this.countLength(this.table), length_str = this.table[0].length, data = [], tmp, byf;
        for (let i = 0; i < length; i++) {
            data[i] = [];
            for (let j = 0; j < length_str; j++) {
                if (j != index_colum && i == index_str) {
                    data[i][j] = this.number_manager.calculate(this.table[i][j], "/", this.table[index_str][index_colum]);
                }
                else if (i == index_str && j == index_colum) {
                    data[i][j] = this.number_manager.calculate(this.table[i][j], "/", this.table[index_str][index_colum]);
                }
                else if (i != index_str && j == index_colum) {
                    tmp = this.number_manager.calculate(this.table[i][j], "*", -1);
                    data[i][j] = this.number_manager.calculate(tmp, "/", this.table[index_str][index_colum]);
                }
                else {
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
        }
        else {
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
            }
            else {
                this.setAvailabeElem(index_str, index_colum);
                // //console.log(" this.controller => ", index_colum, index_str);
                this.controller.updateTableAfterStep(this.getViewTable(this.table, true), this.mode_val);
            }
        }
        else {
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
                }
                else {
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
        let length = this.countLength(this.table), delta_cache = [];
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
exports.ArtificialBassis = ArtificialBassis;


/***/ }),

/***/ "./src/script/ts/modules/controller.ts":
/*!*********************************************!*\
  !*** ./src/script/ts/modules/controller.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(/*! fs */ "fs");
const { dialog } = __webpack_require__(/*! electron */ "electron").remote;
let function_data, table;
const simplex_1 = __webpack_require__(/*! ./simplex */ "./src/script/ts/modules/simplex.ts");
const numder_1 = __webpack_require__(/*! ./numder */ "./src/script/ts/modules/numder.ts");
const NumbersManager_1 = __webpack_require__(/*! ./NumbersManager */ "./src/script/ts/modules/NumbersManager.ts");
class Controller {
    constructor(config) {
        this.readFile = () => {
            this.view_obj.showAnswerView("");
            dialog.showOpenDialog({
                properties: ["openFile", "multiSelections"],
            }, (file_names) => {
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
                            return new numder_1.NumberSimplx(elem_num, false);
                        });
                        this.num_var--;
                        table = data[1].split("|");
                        table = table.map((elem) => {
                            this.num_lim++;
                            return elem.split(",").map((elem_num) => {
                                return new numder_1.NumberSimplx(elem_num, false);
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
            });
        };
        this.saveFile = () => {
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
        this.getContent2Save = () => {
            let res = [], tmp;
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
        this.prepearConfig = () => {
            let arr = [...this.func_inputs_dom], arr_res = [], arr_byf = [], kind_view_num;
            kind_view_num = [...this.kind_number_dom][0].selected;
            this.config_simple.function = [];
            for (let i = 0; i < arr.length; i++) {
                arr_byf[i] = new numder_1.NumberSimplx(arr[i].value, kind_view_num);
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
        this.start = () => {
            this.prepearStartingCalc();
            if (this.cache_config_simple.length == 0) {
                this.curent_step = 0;
                this.setConfig2cache(this.config_simple);
                this.curent_step++;
            }
            this.simplex_obj = new simplex_1.BasisSimplex(this.config_simple, this);
            this.start_input_dom.disabled = true;
            this.simplex_obj.updateData(this.config_simple, this.in_calc, true);
        };
        this.continue = () => {
            this.setConfig2cache(this.config_simple);
            this.prepearStartingCalc();
            this.simplex_obj.updateData(this.config_simple, this.in_calc);
        };
        this.updateStateUsersBasis = (event) => {
            this.view_obj.drawUserBasisArea(event.target.checked);
        };
        this.updateNumVar = (event) => {
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
        this.returnBackStep = () => {
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
        this.updateNumLimits = (event) => {
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
        this.usersSupportEl = (event) => {
            let pos_str = parseInt(event.target.getAttribute("data-pos_str")), pos_col = parseInt(event.target.getAttribute("data-pos_col"));
            this.simplex_obj.initSupportEl(pos_str, pos_col);
            this.in_calc = true;
            this.continue();
        };
        this.init = () => {
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
        this.view_obj = config.view_obj;
        // this.view_obj.choseSupportEl = this.choseSupportEl();
        this.number_manager = new NumbersManager_1.NumbersManager(true);
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
        this.simplex_obj = new simplex_1.BasisSimplex(this.config_simple, this);
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
    setConfig2cache(config = this.config_simple) {
        let config_new = {};
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
                elem = new numder_1.NumberSimplx(elem, false);
            }
            return elem.showNumber();
        });
        if (this.curent_step != 0) {
            config_new.finish_preparations = this.simplex_obj.getFinishPreparations();
        }
        else {
            config_new.finish_preparations = false;
        }
        config_new.user_basis = config.user_basis;
        config_new.mode_val = config.mode_val;
        config_new.updateTableView = {};
        this.cache_config_simple[this.curent_step] = Object.assign({}, config_new);
    }
    prepearLimits(arr, kind_view_num, to_back) {
        let arr_byf = {}, arr_res = [], val, tmp;
        for (let i = 0; i < arr.length; i++) {
            if (!to_back) {
                arr[i] = [...arr[i].getElementsByClassName("limits_inp")];
            }
            arr_res[i] = [];
            for (let j = 0; j < arr[i].length; j++) {
                if (typeof arr[i][j] == "object") {
                    val = arr[i][j].value;
                }
                else {
                    val = arr[i][j];
                }
                tmp = new numder_1.NumberSimplx(val, kind_view_num);
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
}
exports.Controller = Controller;


/***/ }),

/***/ "./src/script/ts/modules/gaus.ts":
/*!***************************************!*\
  !*** ./src/script/ts/modules/gaus.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Gaus {
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
        }
        else {
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
        if (arr.length == 0)
            arr = this.data;
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
        let arrRes = data, max = data[pos_str][pos_colum], index = pos_str, byf, length = this.countLength(data);
        for (let i = pos_str; i < length; i++) {
            if (this.number_manager.toCompare(max, "<", data[i][pos_colum]) &&
                this.number_manager.toCompare(data[i][pos_colum], "!=", 0)) {
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
        let count = 0, sign = 1, kol = 0, tmp;
        position_diag_el = parseInt(position_diag_el);
        while (true) {
            kol++;
            if (this.number_manager.toCompare(arrMinuend[position_diag_el], "==", 0) || kol == 15) {
                break;
            }
            if (this.number_manager.toCompare(arrMinuend[position_diag_el], ">", 0)) {
                arrMinuend[position_diag_el] = this.number_manager.calculate(arrMinuend[position_diag_el], "-", 1);
                sign = 1;
            }
            else {
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
        let res = -1, length = this.data[0].length - 1, max_neg = 0, sqr_data, tmp, length_str = this.countLength(this.data);
        for (let i = 0; i < length_str; i++) {
            sqr_data = this.number_manager.calculate(this.data[i][length], "*", this.data[i][length]);
            tmp = this.number_manager.calculate(max_neg, "*", max_neg);
            if (this.number_manager.toCompare(this.data[i][length], "<", 0) &&
                this.number_manager.toCompare(tmp, "<", sqr_data)) {
                res = i;
                max_neg = this.data[i][length];
            }
        }
        //console.log(res);
        return res;
    }
    getMaxColumIndex(index_str) {
        let index_max = -1, max = -1000, sqr_el;
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
        }
        else {
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
        let index_colum = this.getMaxColumIndex(index_neg_val), coef, tmp, length = this.countLength(this.data);
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
                }
                else {
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
        }
        else {
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
            }
            else {
                this.changeTable(index_neg_val);
                this.count_change--;
                console.log(this.count_change);
                if (this.count_change > 0) {
                    if (!this.error) {
                        this.checkAnswer();
                    }
                    else {
                        console.log("error!!!!!!!!!!!!!!!");
                        alert("here");
                        resolve({ status_suc: false, message: "Error in Gaus method" });
                    }
                }
                else {
                    console.log("Error in Gaus metho");
                    // this.getViewTable(this.data);
                    resolve({ status_suc: false, message: "Error in Gaus method" });
                }
            }
        });
    }
    multiStrokeOnCoef(z, data, length) {
        let coef, byf, length_str = this.countLength(data), tmp;
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
class NumberSimplx {
    constructor(number, kind_view_num) {
        // console.log("constructop", number, kind_view_num);
        this.reference_el = false;
        this.best_reference_el = false;
        this.kind_view_num = kind_view_num;
        [this.numerator, this.significant] = this.checkNumber(number);
    }
    isNumberSimplx() {
        return true;
    }
    checkSupportEl() {
        return this.reference_el;
    }
    checkBestSupportEl() {
        return this.best_reference_el;
    }
    setSupportEl(reference_el, best_reference_el) {
        this.reference_el = reference_el;
        this.best_reference_el = best_reference_el;
    }
    findNod(arr) {
        let count = 0;
        if (Number.isInteger(arr[0]) && Number.isInteger(arr[1])) {
            var n = arr.length, x = Math.abs(arr[0]);
            for (var i = 1; i < n; i++) {
                var y = Math.abs(arr[i]);
                while (x && y) {
                    x > y ? (x %= y) : (y %= x);
                }
                x += y;
            }
            return x;
        }
        else {
            return 1;
        }
    }
    checkNumber(number) {
        let tmp, nod;
        if (typeof number == "string") {
            if (number.indexOf("/") != -1) {
                number = number.split("/");
                if (number.length == 2) {
                    number[0] = parseFloat(number[0]);
                    number[1] = parseFloat(number[1]);
                    if (number[1] < 0) {
                        number[1] *= -1;
                        number[0] *= -1;
                    }
                    if (number[0] != 1 && number[0] != 0 && number[1] != 0) {
                        nod = this.findNod([number[0], number[1]]);
                        number[0] /= nod;
                        number[1] /= nod;
                    }
                    if (number[0] == 0) {
                        number[1] = 1;
                    }
                    return [number[0], number[1]];
                }
                //повесить обработчик ошибок
                else
                    return [1, 1];
            }
        }
        if (!isNaN(number)) {
            return [parseFloat(number), 1];
        }
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
        if (this.significant != 1) {
            if (this.kind_view_num) {
                return Math.floor((this.numerator / this.significant) * 1000) / 1000;
            }
            return `${this.numerator} / ${this.significant}`;
        }
        return this.numerator;
    }
}
exports.NumberSimplx = NumberSimplx;


/***/ }),

/***/ "./src/script/ts/modules/simplex.ts":
/*!******************************************!*\
  !*** ./src/script/ts/modules/simplex.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const gaus_1 = __webpack_require__(/*! ./gaus */ "./src/script/ts/modules/gaus.ts");
const artificial_1 = __webpack_require__(/*! ./artificial */ "./src/script/ts/modules/artificial.ts");
class BasisSimplex {
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
        let length = this.table[0].length, min = 10000000, byf_delta = this.table[this.countLength(this.table) - 1], index_min = 0;
        for (let i = 0; i < length - 1; i++) {
            if (this.number_manager.toCompare(byf_delta[i], "<", min) &&
                this.number_manager.toCompare(byf_delta[i], "<", 0)) {
                min = byf_delta[i];
                index_min = i;
            }
        }
        return index_min;
    }
    getCurentIndexStr(index_colum, set_available = false) {
        let length = this.countLength(this.table), length_str = this.table[0].length, index_str = -1, min, tmp;
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
        // this.correctTable();
    }
    getFinishPreparations() {
        return this.finish_preparations;
    }
    setFinishPreparations(val) {
        this.finish_preparations = val;
    }
    findDelta(bassis) {
        let length = this.table[0].length, numb_basis = bassis.length, pos_var, tmp;
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
        let length = this.countLength(this.table), length_str = this.table[0].length, data = [], tmp, byf;
        console.log("Change TAle", length);
        this.getViewTable();
        for (let i = 0; i < length; i++) {
            data[i] = [];
            for (let j = 0; j < length_str; j++) {
                console.log(length_str, index_colum, index_str, j);
                if (j != index_colum && i == index_str) {
                    data[i][j] = this.number_manager.calculate(this.table[i][j], "/", this.table[index_str][index_colum]);
                }
                else if (i == index_str && j == index_colum) {
                    data[i][j] = this.number_manager.calculate(1, "/", this.table[index_str][index_colum]);
                }
                else if (i != index_str && j == index_colum) {
                    tmp = this.number_manager.calculate(this.table[i][j], "*", -1);
                    data[i][j] = this.number_manager.calculate(tmp, "/", this.table[index_str][index_colum]);
                }
                else {
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
        }
        else {
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
            }
            else {
                this.setAvailabeElem(index_str, index_colum);
                this.controller.updateTableAfterStep(this.getViewTable(this.table, true), this.mode_val);
            }
        }
        else {
            console.log("Finish Answer:=> newBasis", this.finish.status_fail, this.table[this.countLength(this.table) - 1][this.table[0].length - 1].showNumber());
            this.sentAnswer(this.table);
        }
    }
    setAvailabeElem(index_str_sup, index_colum_sup) {
        this.table[index_str_sup][index_colum_sup].setSupportEl(true, true);
        let index_str, length_str = this.countLength(this.table) - 1;
        for (let i = 0; i < this.table[0].length - 1; i++) {
            if (i != index_colum_sup) {
                index_str = this.getCurentIndexStr(i, true);
                if (this.number_manager.toCompare(this.table[length_str][i], "<", 0) && index_str != -1) {
                    this.table[index_str][i].setSupportEl(true, false);
                }
                else {
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
        }
        else {
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
                }
                else {
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
        }
        else {
            this.sentAnswer(this.table);
            console.log("Finish Answer WB:=> ", this.table[this.countLength(this.table) - 1][this.table[0].length - 1].showNumber());
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
                this.gaus = new gaus_1.Gaus(table, this.number_manager, config.user_basis);
            }
            else {
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
                    this.gaus = new artificial_1.ArtificialBassis(conf);
                }
                else {
                    console.log("\n\nUPDATE CONFIG ARFITIAL", conf, this.finish_preparations);
                    this.gaus.updateConfig(conf);
                }
            }
            console.log("this.finish_preparations", this.finish_preparations);
            if (!this.finish_preparations) {
                this.gaus.start();
                this.gaus.checkAnswer().then((res) => {
                    if (res.status_suc) {
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
                    }
                    else {
                        console.log("ERROR", res.message);
                        if (this.method_basic_dom) {
                            this.controller.showAnswer("Решения найти не удалось");
                        }
                        // this.getViewTable();
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
            }
            else {
                this.startSearch();
            }
        }
        else {
            console.log(" before checkPositiveDelta");
            this.getViewTable();
            if (!this.checkPositiveDelta(this.table[this.countLength(this.table) - 1])) {
                console.log("newBasis");
                this.getViewTable();
                this.newBasis();
            }
            else {
                this.sentAnswer(this.table);
                console.log("Finish Answer WB:=>", this.table[this.countLength(this.table) - 1][this.table[0].length - 1].showNumber());
            }
        }
    }
}
exports.BasisSimplex = BasisSimplex;


/***/ }),

/***/ "./src/script/ts/modules/view.ts":
/*!***************************************!*\
  !*** ./src/script/ts/modules/view.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class View {
    constructor(config) {
        this.updateNumLimV2 = (num_var, num_lim, mode, funcEvent = null) => {
            console.log(num_var, this.num_var);
            if (num_var > this.num_var) {
                this.changeCeils(true, this.dom_limits);
            }
            else {
                this.changeCeils(false, this.dom_limits);
            }
        };
        this.updateFunction = (num_var) => {
            if (num_var > this.num_var) {
                this.changeCeils(true, this.dom_function);
            }
            else {
                this.changeCeils(false, this.dom_function);
            }
        };
        this.drawLimits = (num_var, num_lim, mode, funcEvent = null) => {
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
        this.config_simple;
        this.dom_function = config.dom_function;
        this.dom_limits = config.dom_limits;
        this.dom_answer = config.dom_answer;
        this.dom_user_basis = config.dom_user_basis;
        this.dom_num_lim = config.dom_num_lim;
        this.dom_num_var = config.dom_num_var;
    }
    init() { }
    drawFunction(num_var) {
        this.dom_function.innerHTML = "";
        num_var = parseInt(num_var);
        let tr = document.createElement("tr"), td, input, val_inp;
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
            }
            else {
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
        let tr = document.createElement("tr"), td;
        if (enable) {
            this.dom_user_basis.innerHTML = "";
            for (let j = 0; j < this.num_var; j++) {
                td = this.createCells(0, ["table__inputs", "user_basis"]);
                tr.appendChild(td);
            }
            this.dom_user_basis.appendChild(tr);
        }
        else {
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
            }
            else {
                this.remove1Ceils(elem_tr);
            }
        });
    }
    remove1Ceils(tr) {
        tr.removeChild(tr.lastChild);
    }
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
        }
        else {
            val_inp = 0;
        }
        if (typeof val_inp == "number" || typeof val_inp == "string") {
            input.value = val_inp;
        }
        else {
            if (val_inp.back) {
                input.value = val_inp.value;
            }
            else {
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
                }
                else {
                    tmp.classList.add("support");
                }
                td.appendChild(tmp);
            }
            else {
                td.appendChild(input);
            }
        }
        else {
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
    updateNumVar(num_var) {
        this.num_var = num_var;
    }
}
exports.View = View;


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map