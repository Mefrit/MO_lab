import { NumberSimplx } from "../modules/numder";
export class NumbersManager {
    view_dec_num: boolean;

    constructor(dec_num) {
        this.view_dec_num = dec_num;
    }
    calculate(number_1, operation, number_2) {
        let arr_zn = ["==", "!=", "<", ">"];

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
        if (arr_zn.indexOf(operation)) {
            return this.toCompare(number_1, operation, number_2);
        }
    }
    checkNumber(number_1, number_2) {
        if (typeof number_2 == "number" || typeof number_2 == "string") {
            number_2 = new NumberSimplx(number_2, this.view_dec_num);
        }
        if (typeof number_1 == "number" || typeof number_1 == "string") {
            number_1 = new NumberSimplx(number_1, this.view_dec_num);
        }
        return [number_1, number_2];
    }
    toCompare(number_1, operation, number_2) {
        // let res = true;
        [number_1, number_2] = this.checkNumber(number_1, number_2);

        if (operation == "<") {
            // console.log("this.toSubtrac", number_1, number_2, this.toSubtrac(number_1, number_2).getNumerator());
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

        return new NumberSimplx(res_numerator + "/" + res_significant, this.view_dec_num);
    }
    toSubtrac(number_1, number_2) {
        // console.log(typeof number_2, typeof number_1);
        let res_numerator, res_significant;

        res_numerator =
            number_1.getNumerator() * number_2.getSignificant() - number_2.getNumerator() * number_1.getSignificant();
        res_significant = number_2.getSignificant() * number_1.getSignificant();

        return new NumberSimplx(res_numerator + "/" + res_significant, this.view_dec_num);
    }
    toDivision(number_1, number_2) {
        let res_numerator, res_significant;

        res_numerator = number_1.getNumerator() * number_2.getSignificant();

        res_significant = number_2.getNumerator() * number_1.getSignificant();

        return new NumberSimplx(res_numerator + "/" + res_significant, this.view_dec_num);
    }
    toMultiply(number_1, number_2) {
        let res_numerator, res_significant;
        // console.log(number_1);

        res_numerator = number_1.getNumerator() * number_2.getNumerator();

        res_significant = number_1.getSignificant() * number_2.getSignificant();

        return new NumberSimplx(res_numerator + "/" + res_significant, this.view_dec_num);
    }
    initViewNum(view_dec_num) {
        this.view_dec_num = view_dec_num;
    }
}
