export class NumberSimplx {
    significant: number;
    numerator: number;
    //significant - знаменатель
    // numerator -числитель\
    kind_view_num: any;
    reference_el: boolean;
    best_reference_el: boolean;
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
            var n = arr.length,
                x = Math.abs(arr[0]);
            for (var i = 1; i < n; i++) {
                var y = Math.abs(arr[i]);
                while (x && y) {
                    x > y ? (x %= y) : (y %= x);
                }
                x += y;
            }
            return x;
        } else {
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
                else return [1, 1];
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
