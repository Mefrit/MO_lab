const fs = require("fs");
console.log("Start program", process.argv[2]);
fs.readFile("./data/" + process.argv[2], (err, data) => {
    if (err) {
        console.error("ERROR->>>", err);
    }

    let inputData = data.toString().split("\n"),
        byf,
        valData = [];
    inputData = inputData.map((stringArr) => {
        byf = stringArr.split("|");
        valData.push(parseFloat(byf[1]));
        return byf[0].split(",").map((elem) => {
            return parseFloat(elem);
        });
    });
    let app = new App(inputData);
    app.forwardWay();
    app.backWay();
});
class App {
    constructor(data) {
        this.data = data;
        this.valData;
        // this.valData = valData;
        console.log("Enter data");
        this.printData();
    }
    printData(arr = []) {
        if (arr.length == 0) arr = this.data;

        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);
        }
        // console.log("res data -> ", this.valData, "\n\n");
    }

    getMaxStr(data, pos) {
        let j = pos,
            arrRes = data,
            max = data[pos][pos],
            index = pos,
            byf;

        for (let i = pos; i < data.length; i++) {
            if (max < data[i][pos]) {
                max = data[i][pos];
                index = i;
            }
        }
        byf = data[pos];
        data[pos] = data[index];
        data[index] = byf;

        return arrRes;
    }
    forwardWay() {
        // this.printData();
        let length = this.data.length;

        for (let i = 0; i < length; i++) {
            // max str !
            this.data = this.getMaxStr(this.data, i);
            //все строчки нужно сделать нормальными

            this.delStrokeOnCoef(i, this.data, this.data.length);
            this.printData();
            for (let j = i + 1; j < length; j++) {
                this.substrStroke(this.data[j], this.data[i], i, j);
            }
            console.log("Вычитаем");
            this.printData();
        }

        this.printData();
    }
    delStrokeOnCoef(i, data, length) {
        let coef;
        for (let j = i; j < length; j++) {
            coef = data[j][i];
            console.log("coef", coef);
            for (let k = i; k < data[j].length; k++) {
                data[j][k] = data[j][k] / coef;
            }
            // this.valData[j] = this.valData[j] / coef;
        }
        return data;
    }
    multiStrokeOnCoef(z, data, length) {
        let coef, byf;

        if (z + 1 < data.length) {
            byf = data[z + 1];
            console.log("multiStrokeOnCoef", z);

            for (let i = 0; i <= z; i++) {
                coef = data[i][z + 1];
                // console.log("\nthis.valData[i]=> ", this.valData[i]);
                //строки

                for (let j = i + 1; j < length; j++) {
                    this.data.forEach((elem) => {
                        console.log(elem, coef);
                    });
                    console.log("\n", data[i][j], "-", byf[j], "*", coef, "=", data[i][j] - byf[j] * coef, "\n");
                    data[i][j] = data[i][j] - byf[j] * coef;
                }
            }
        }

        return data;
    }
    substrStroke(arrDefault, arrSubstracted, positionDefault, positionSubstr) {
        let count = 0,
            sign;
        while (true) {
            if (arrDefault[positionDefault] == 0) {
                break;
            }
            if (arrDefault[positionDefault] > 0) {
                arrDefault[positionDefault] -= 1;
                sign = 1;
            } else {
                arrDefault[positionDefault] += 1;
                sign = -1;
            }
            count++;
        }

        for (let i = positionDefault + 1; i < arrDefault.length; i++) {
            arrDefault[i] -= count * arrSubstracted[i] * sign;
        }
        // this.valData[positionSubstr] -= count * sign * this.valData[positionDefault];
        return arrDefault;
    }
    getAnswer() {
        let coef,
            length = this.data.length,
            resx = [];
        if (this.data.lenfth == this.data[0].length) {
            for (let i = length - 1; i >= 0; i--) {
                resx[i] = this.valData[i];
                for (let j = 0; j < i; j++) {
                    this.valData[j] = this.valData[j] - this.data[j][i] * resx[i];
                }
            }
            console.log("!!!!!!!!!!!!!!!!!!!!!this.valData", this.valData);
            return this.valData;
        }
    }
    backWay() {
        let length;

        // for (let i = 0; i < this.data.length; i++) {
        //     this.data[i].push(this.valData[i]);
        // }

        length = this.data[0].length;
        console.log("backWay", length);
        for (let i = 0; i < length - 2; i++) {
            this.data = this.multiStrokeOnCoef(i, this.data, length);
        }
        console.log("Final Res =>", this.data);
        this.data.forEach((elem) => {
            console.log(elem);
        });
    }
}