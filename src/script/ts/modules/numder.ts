export class Number {
    significant: number;
    numerator: number;
    //significant - знаменатель
    // numerator -числитель
    constructor(number) {
        [this.numerator, this.significant] = this.checkNumber(number);
    }
    checkNumber(number) {
        if (typeof number == "string")
            if (number.indexOf("/") != -1) {
                number = number.split("/");
                if (number.length == 2) return [parseInt(number[0]), parseInt(number[1])];
                //повесить обработчик ошибок
                else return [1, 1];
            }
        if (!isNaN(number)) return [parseInt(number), 1];
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
