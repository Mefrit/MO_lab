// const fs = require("fs");
// console.log("Start program", process.argv[2]);
// fs.readFile("./data/" + process.argv[2], (err, data) => {
//     if (err) {
//         console.error("ERROR->>>", err);
//     }

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
export class Gaus {
    data: any;
    cache: any;
    basis: any;
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
        if (arr.length == 0) arr = this.data;

        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);
        }
    }

    getMaxStr(data, pos) {
        let j = pos,
            arrRes = data,
            max = data[pos][pos],
            index = pos,
            byf;

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
        let count = 0,
            sign = 1,
            kol = 0;

        while (true) {
            kol++;
            if (arrDefault[positionDefault] == 0 || kol == 15) {
                break;
            }
            if (arrDefault[positionDefault] > 0) {
                arrDefault[positionDefault] -= 1;
                sign = 1;
            } else {
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
        let res = -1,
            length = this.data[0].length - 1,
            max_neg = -1;
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
        let byf,
            random_basis = Math.floor(Math.random() * (this.basis.length - 1)),
            random_colum = Math.floor(Math.random() * (this.data[0].length - 2));
        console.log(random_basis, random_colum, this.data);
        for (let i = 0; i < this.data.length; i++) {
            byf = this.data[i][random_basis];
            this.data[i][random_basis] = this.data[i][random_colum];
            this.data[i][random_colum] = byf;
        }
    }
    getMaxColumIndex(index_str) {
        console.log("getMaxColumIndex", index_str, this.basis);
        let index_max = 0,
            max = Math.abs(this.data[index_str][0]);
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
        let index_colum = this.getMaxColumIndex(index_neg_val),
            coef;

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
            } else {
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
