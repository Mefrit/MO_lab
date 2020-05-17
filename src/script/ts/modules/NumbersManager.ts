import { Number } from "../modules/numder";
export class NumbersManager {
    constructor() {}
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

        return new Number(res_numerator + "/" + res_significant);
    }
    toSubtrac(number_1, number_2) {
        let res_numerator, res_significant;
        res_numerator =
            number_1.getNumerator() * number_2.getSignificant() -
            number_2.getNumerator() * number_1.getSignificant();
        res_significant = number_2.getSignificant() * number_1.getSignificant();

        return new Number(res_numerator + "/" + res_significant);
    }
    toDivision(number_1, number_2) {
        let res_numerator, res_significant;
        res_numerator = number_1.getNumerator() * number_2.getSignificant();

        res_significant = number_2.getNumerator() * number_1.getSignificant();

        return new Number(res_numerator + "/" + res_significant);
    }
    toMultiply(number_1, number_2) {
        let res_numerator, res_significant;
        res_numerator = number_1.getNumerator() * number_2.getNumerator();

        res_significant = number_2.getSignificant() * number_1.getSignificant();

        return new Number(res_numerator + "/" + res_significant);
    }
}
