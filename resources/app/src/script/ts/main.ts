import { Test } from "./test";

import { Controller } from "./modules/controller";
import { View } from "./modules/view";
import { NumberSimplx } from "./modules/numder";
import { NumbersManager } from "./modules/NumbersManager";

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
    let arr: any = config.function,
        new_conf = config,
        arr_byf = [];
    for (let i = 0; i < arr.length; i++) {
        arr_byf[i] = new NumberSimplx(arr[i], false);
    }
    new_conf.function = arr_byf;
    arr = config.table;
    arr_byf = [];
    for (let i = 0; i < arr.length; i++) {
        arr_byf[i] = [];
        for (let j = 0; j < arr[i].length; j++) {
            arr_byf[i].push(new NumberSimplx(arr[i][j], false));
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
    view_obj = new View(config_view);

    config_simple = {
        mode_val: "auto",

        user_basis: [],

        function: [-2, -3, 0, 1, 0, 0, 0],
        table: [
            [2, -1, 0, -2, 1, 0, 16],
            [3, 2, 1, -3, 0, 0, 18],
            [-1, 3, 0, 4, 0, 1, 24],
        ], // max 25.6 min 6
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

    controller_obj = new Controller(config_controller);

    controller_obj.init();
});
