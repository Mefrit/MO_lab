//количество итераций\переменных\ограничений
var allCount = 0,
    countX,
    countF;

//функции работы по конструированию таблицы
var cell = function (str, style) {
    return "<td" + (style ? style : "") + ">" + str + "</td>";
};

var linetr = function (str) {
    return "<tr>" + str + "</tr>";
};

var table = function (str, border) {
    return "<table" + (border ? " border=" + border : "") + "><tbody>" + str + "</tbody></table>";
};

//класс решения "симплекс-задачи"
var Simplex = function (functions) {
    this.M = "M";
    this.preArray = [
        ["C", ""],
        ["", "Bx"],
    ];
    this.price = [];
    this.priceDescription = ["A"];
    this.currentPrice = [];
    this.currentDescr = [];
    //Основной массив
    this.mainArray = [];
    this.delta = [];
    //просчет стоимостей
    this.calculateDelta = function () {
        for (var i in this.mainArray[0]) {
            this.delta[i] = -this.price[i];
            for (var j in this.mainArray) {
                this.delta[i] += this.currentPrice[j] * this.mainArray[j][i];
            }
        }
    };
    //линейный симплекс-метод (конструктор)
    this.constructByLinear = function (functions, description) {
        this.M = "";
        for (var i = 1; i < description.length; i++) {
            this.priceDescription.push(description[i]);
        }
        for (var i = 0; i < functions[0].length; i++) {
            this.price.push(functions[0][i]);
        }

        for (var i = 0; i < countF; i++) {
            this.currentPrice.push(0);
            this.currentDescr.push("a" + (1 * 1 + i * 1));
        }

        var currentIndex = 0;
        for (var i = 1; i < functions.length; i++) {
            this.mainArray.push([]);

            for (var j in functions[i]) {
                this.mainArray[currentIndex].push(functions[i][j]);
            }
            currentIndex++;
        }

        console.log(this.mainArray);
        this.calculateDelta();
    };

    //конструктор для квадратичного симплекс-метода
    this.constructBySquare = function (functions) {
        for (var i = 1; i < functions[0].description.length; i++) {
            this.priceDescription.push(functions[0].description[i]);
        }
        for (var i = 0; i < functions[0].description.length; i++) {
            this.price.push(functions[0].description[i].indexOf("y") != -1 ? -1 : 0);
        }

        //Выбранные стоимости

        for (var i = 0; i < countF; i++) {
            this.currentPrice.push(0);
            this.currentDescr.push("v" + (countX * 1 + 1 * 1 + i * 1));
        }
        for (var i = 0; i < countX; i++) {
            this.currentPrice.push("-1");
            this.currentDescr.push("y" + (i * 1 + 1 * 1));
        }

        var currentIndex = 0;
        for (var i = countX; i < functions.length; i++) {
            this.mainArray.push([]);

            for (var j in functions[i].items) {
                this.mainArray[currentIndex].push(functions[i].items[j]);
            }
            currentIndex++;
        }
        for (var i = 0; i < countX; i++) {
            this.mainArray.push([]);
            for (var j in functions[i].items) {
                this.mainArray[currentIndex].push(functions[i].items[j]);
            }
            currentIndex++;
        }

        this.calculateDelta();
    };

    //поиск минимума
    this.findMinIndex = function (arr, startIndex, notSeek) {
        var minI = startIndex;
        if (arguments.length <= 2) notSeek = [];
        for (var i = startIndex; i < arr.length; i++) {
            if (arr[minI] > arr[i] && notSeek.indexOf(i) == -1) minI = i;
        }
        return minI;
    };
    //печать текущего состояния
    this.print = function () {
        var result = "";
        var line = cell(this.preArray[0][0]) + cell(this.preArray[0][1]);
        for (var i in this.price) {
            line += cell(this.price[i] + this.M);
        }
        result = linetr(line);
        line = cell(this.preArray[1][0]) + cell(this.preArray[1][1]);
        for (var i in this.priceDescription) {
            line += cell(this.priceDescription[i]);
        }
        result += linetr(line);
        for (var i in this.currentPrice) {
            line = cell(this.currentPrice[i] + this.M) + cell(this.currentDescr[i]);
            for (var j in this.mainArray[i]) line += cell(this.mainArray[i][j]);
            result += linetr(line);
        }
        var min = this.findMinIndex(this.delta, 1);
        line = cell("") + cell("Delta");
        for (var i in this.delta) {
            if (i != min || this.delta[min] >= 0) line += cell(this.delta[i] + this.M);
            else line += cell(this.delta[i] + this.M, " style='background-color:red;'");
        }
        result += linetr(line);
        return table(result, 1);
    };
    //переход на следующий шаг
    this.step = function (notSeek) {
        var minIndex = this.findMinIndex(this.delta, 1, notSeek);
        if (this.delta[minIndex] >= 0) return false;
        var aDivValues = [];

        for (var i in this.mainArray) {
            if (this.mainArray[i][0] * this.mainArray[i][minIndex] >= 0 && this.mainArray[i][minIndex] > 0) {
                var x = this.mainArray[i][0] / this.mainArray[i][minIndex];
                aDivValues.push(x);
            } else aDivValues.push(Infinity);
        }

        var minJ = this.findMinIndex(aDivValues, 0);

        if (aDivValues[minJ] >= Infinity) {
            alert(minJ + " неподходит. Замена");
            if (arguments.length > 0) {
                notSeek.push(minJ);
                this.step(notSeek);
            } else {
                this.step([minJ]);
            }
        }
        //Temp Array
        var newArray = [];
        for (var i in this.mainArray) {
            newArray.push([]);
            for (var j in this.mainArray[i]) {
                newArray.push(this.mainArray[i][j]);
            }
        }
        var del = this.mainArray[minJ][minIndex];
        for (var i = 0; i < this.mainArray[minJ].length; i++) this.mainArray[minJ][i] /= del;

        for (var i in this.mainArray) {
            if (i != minJ) {
                var mult = this.mainArray[i][minIndex];
                for (var j in this.mainArray[i]) {
                    this.mainArray[i][j] -= this.mainArray[minJ][j] * mult;
                }
            }
        }

        this.currentDescr[minJ] = this.priceDescription[minIndex];
        this.currentPrice[minJ] = this.price[minIndex];
        this.calculateDelta();
        return true;
    };
    //Ответ, полученный на текщем шаге (промежуточный ответ)
    this.getCurrentStepAnswer = function () {
        var result = "";
        for (var i in this.currentPrice) {
            result += " " + this.currentDescr[i] + " = " + this.mainArray[i][0];
        }
        return result;
    };
};
// класс для представления функции линейным массивом (при работе с теоремой куна-таккера)
var linearFunction = function () {
    this.items = [];
    this.description = [];
};

linearFunction.prototype.createFullView = function (CorrectDescription) {
    var CurrentDescription = [];
    var CurrentItems = [];
    for (var i in CorrectDescription) {
        var index;
        CurrentDescription.push(CorrectDescription[i]);
        if ((index = this.description.indexOf(CorrectDescription[i])) != -1) {
            CurrentItems.push(this.items[index]);
        } else {
            CurrentItems.push(0);
        }
    }

    this.description = CurrentDescription;
    this.items = CurrentItems;
};
//перевод "неравенства" в "уравнение"
linearFunction.prototype.toEqual = function () {
    if (this.description[0] != "") {
        this.description.unshift("");
        this.items.unshift(0);
    }
    for (var i = 1; i < this.items.length; i++) {
        this.items[i] = -this.items[i];
    }
};
//добавить свободный член
linearFunction.prototype.constructA = function (item) {
    if (item) {
        this.items.push(item);
        this.description.push("");
    }
};
//добавить массив переменных
linearFunction.prototype.constructX = function (itemsX, descr) {
    for (var i in itemsX)
        if (itemsX[i] && itemsX[i] != 0) {
            this.items.push(itemsX[i]);
            this.description.push(descr + i);
        }
};
//текущее состоение уравнение (отображение)
linearFunction.prototype.getFullString = function (lastItem) {
    var result = "";
    if (lastItem != undefined) {
        for (var i in this.items) {
            if (lastItem != i) result += (this.items[i] >= 0 ? "+" : "") + this.items[i] + this.description[i] + " ";
        }
        result += " = " + this.items[lastItem] + this.description[lastItem];
    } else {
        for (var i in this.items) {
            result += (this.items[i] >= 0 ? "+" : "") + this.items[i] + this.description[i] + " ";
        }
    }
    return result;
};
//представление квадратичного уравнения с помощью матрицы "пути"
var squareFunction = function () {
    this.square = []; //квадратичная функция с x [0,0] свободый член
};

squareFunction.prototype.constructEqualation = function () {
    var result = "";
    for (var i in this.square) {
        for (var j in this.square[i]) {
            if (this.square[i][j] && this.square[i][j] != 0) {
                result +=
                    (this.square[i][j] > 0 ? "+" : "") +
                    this.square[i][j] +
                    (i > 0 ? (i == j ? "x" + i + "^2 " : "x" + i) : "") +
                    (j > 0 && i != j ? "x" + j + " " : " ");
            }
        }
    }
    return result;
};

squareFunction.prototype.constructFromIndex = function (LineIndex) {
    for (var i = 0; i <= countX; i++) {
        this.square.push([]);
    }
    var currentIndex = 0;
    var index = 1;
    for (; index < countX * 1 + 1 * 1; index++) {
        this.square[index][0] = $("#item" + LineIndex + "in" + currentIndex++).val();
    }

    if (LineIndex == 0)
        for (var i = 1; i <= countX; i++)
            for (var j = 1; j <= i; j++) {
                if (i == j) {
                    this.square[i][i] = $("#item" + LineIndex + "in" + currentIndex++).val();
                } else {
                    this.square[j][i] = $("#item" + LineIndex + "in" + currentIndex++).val();
                }
            }
    if ($("#item" + LineIndex + "in" + allCount) != undefined)
        this.square[0][0] = $("#item" + LineIndex + "in" + allCount).val();
};

//шапка таблицы квадратичного симплекс-метода
var TableHeader = function (count) {
    var TableHeader = cell("Описание");
    for (var i = 1; i <= count; i++) {
        allCount++;
        TableHeader += cell("x" + i);
    }
    for (var i = 1; i <= count; i++)
        for (var j = 1; j <= i; j++) {
            if (i == j) {
                TableHeader += cell("x" + i + "^2");
            } else {
                TableHeader += cell("x" + j + "x" + i);
            }

            allCount++;
        }
    return linetr(TableHeader + cell("a"));
};

//место для ввода переменных в квадратичном симплекс-методе
var createInput = function (text, index, last) {
    var tableLine = cell(text);
    var ignore = allCount + 1;
    if (last) ignore = countX * 1 + 1 * 1;
    for (var i = 0; i < allCount; i++) {
        ignore--;
        if (ignore > 0) tableLine += cell("<input type=text id=item" + index + "in" + i + " value=0>");
        else tableLine += cell("");
    }
    if (last) tableLine += cell("<input type=text id=item" + index + "in" + allCount + " value=0>");
    else tableLine += cell("");
    return linetr(tableLine);
};

//добавить искусственные переменные (метод искусственных переменных)
var newArtificialVariables = function (solve, functions) {
    solve.append(
        "<p>Применим метод искусственных переменных. Для этого введем в уравнения 1-" +
            countX +
            " свободные переменные y</p>"
    );
    for (var i = 1; i <= countX; i++) {
        var y = [];
        y[i] = 1;
        functions[i - 1].constructX(y, "y");
    }
    for (var i in functions) {
        solve.append("<p>" + functions[i].getFullString(0) + "</p>");
    }
    solve.append(
        "<p>Получаем задачу линейного программирования -  минимизировать функцию M(y..). Для этого воспользуемся симплекс-методом</p>"
    );
};

//теорема Куна-Таккера
var Kun_Tekker = function (solve, functions) {
    solve.append("<p>По теореме Куна-Теккера:</p>");
    var linear = [];
    for (var i = 1; i <= countX; i++) {
        var current = new linearFunction();
        var xIndexerArray = [];

        //собираем целевую функцию
        var xArray = functions[0].square[i];
        for (var index in xArray) {
            if (xArray[index] && xArray[index] != 0) {
                if (index == 0) {
                    current.constructA(xArray[index]);
                } else {
                    xIndexerArray[index] = xArray[index];
                    if (index == i) xIndexerArray[index] = xIndexerArray[index] * 2;
                }
            }
        }

        for (var j in functions[0].square) {
            if (i != j && functions[0].square[j][i]) {
                xIndexerArray[j] = functions[0].square[j][i];
            }
        }
        current.constructX(xIndexerArray, "x");

        //доп переменные
        var kIndexerArray = [];
        for (var j = 1; j < functions.length; j++) {
            kIndexerArray[j] = functions[j].square[i][0];
        }
        current.constructX(kIndexerArray, "k");
        solve.append("<p>dL/dx" + i + "= " + current.getFullString() + "<=0 </p>");
        linear.push(current);
    }

    for (var i = 1; i < functions.length; i++) {
        var current = new linearFunction();
        current.constructA(functions[i].square[0][0]);
        var xArray = [];
        for (var j = 1; j < functions[i].square.length; j++) {
            xArray[j] = functions[i].square[j][0];
        }
        current.constructX(xArray, "x");
        solve.append("<p>dL/dk" + i + "= " + current.getFullString() + ">=0 </p>");
        linear.push(current);
    }

    return linear;
};
//дополняющая нежесткость
var moreFlex = function (solve, template) {
    solve.append("<p>Условия дополняющей нежесткости</p>");
    if (template) {
        for (var i = 1; i < countX * 1 + 1 * 1; i++) solve.append("<p>" + template + "x" + i + "*x" + i + "=0</p>");
        for (var i = 1; i < countF * 1 + 1 * 1; i++) solve.append("<p>" + template + "k" + i + "*k" + i + "=0</p>");
    } else {
        var index = 1;
        for (var i = 1; i < countX * 1 + 1 * 1; i++) {
            solve.append("<p>" + "x" + i + "v" + index++ + "=0</p>");
        }
        for (var i = 1; i < countF * 1 + 1 * 1; i++) {
            solve.append("<p>" + "k" + i + "v" + index++ + "=0</p>");
        }
    }
};

//Функция Лангранжа
var Langran = function (place, functions) {
    place.append("<p>Запишем функцию Лангранжа</p>");
    var lang = "L(";
    for (var i = 0; i < countX; i++) {
        lang += "x" + (i + 1 * 1) + ",";
    }
    for (var j = 1; j < countF; j++) {
        lang += "k" + j + ",";
    }
    lang += "k" + countF + ") = ";

    for (var index in functions) {
        lang += (index > 0 ? "+k" + index : "") + "(" + functions[index].constructEqualation() + ")";
    }
    place.append("<p>" + lang + "</p>");
};
//ввод пееменных для "обратной" задачи
var addNewVariables = function (solve, functions) {
    var index = 1;
    for (var i = 0; i < countX; i++) {
        var t = [];
        t[index++] = 1;
        functions[i].constructX(t, "v");
    }
    for (var i = 0; i < countF; i++) {
        var t = [];
        t[index++] = -1;

        functions[i * 1 + countX * 1].constructX(t, "v");
    }

    solve.append("<p>Введем в систему дополнительные искусственные переменные</p>");
    for (var i in functions) {
        solve.append("<p>" + functions[i].getFullString() + "=0</p>");
    }
};
//перевод неравенства в уравнение
var toEquals = function (solve, functions) {
    solve.append("<p>Запишем систему в эквивалентном виде</p>");
    for (var i in functions) {
        functions[i].toEqual();
        solve.append("<p>" + functions[i].getFullString(0) + "</p>");
    }
};
//подготовка к симплекс-методу
var prepareToSimplex = function (solve, functions) {
    solve.append("<p>Подготовка уравнений к решению задачи симплекс-методом</p>");
    var description = [];
    description.push("");
    for (var i = 1; i <= countX; i++) description.push("x" + i);
    for (var i = 1; i <= countF; i++) description.push("k" + i);

    var index = 1;
    for (var i = 0; i < countX; i++) {
        description.push("v" + index++);
    }
    for (var i = 0; i < countF; i++) {
        description.push("v" + index++);
    }

    for (var i = 1; i <= countX; i++) {
        description.push("y" + i);
    }

    for (var i in functions) {
        functions[i].createFullView(description);
        solve.append("<p>" + functions[i].getFullString(0) + "</p>");
    }
};
var descr;
//ввод для линейных функций
var getLinearFunction = function () {
    countX = $("#XCount").val();
    countF = $("#FCount").val();
    descr = ["a"];

    var line = cell("Описание") + cell("a");
    for (var i = 1; i <= countX; i++) {
        line += cell("x" + i);
        descr.push("x" + i);
    }
    for (var i = 1; i <= countF; i++) {
        descr.push("a" + i);
    }
    var Table = linetr(line);

    line = cell("Целевая ф-я") + cell("");

    var index = 0;
    for (var i = 1; i <= countX; i++) {
        line += cell("<input type=text id=item" + index + "in" + i + " value=0>");
    }

    Table += linetr(line);
    for (index = 1; index <= countF; index++) {
        line = cell("F = 0") + cell("<input type=text id=item" + index + "in0 value=0>");
        for (var i = 1; i <= countX; i++) {
            line += cell("<input type=text id=item" + index + "in" + i + " value=0>");
        }

        Table += linetr(line);
    }

    Table = table(Table);

    $("#inputCount").slideUp(500);

    $("#inputTable").append(Table);
    $("#inputTable").append("<button onclick=linearSolve()>Искать решение</button>");
};
//решение симплекс-метода
var linearSolve = function () {
    var solve = $("#solve");
    var functions = [];

    solve.html("");
    for (var i = 0; i <= countF; i++) {
        functions.push([]);
        if (i == 0) {
            functions[i][0] = 0;
        } else functions[i][0] = $("#item" + i + "in0").val();
        for (var j = 1; j <= countX; j++) {
            functions[i][j] = $("#item" + i + "in" + j).val();
        }
        for (var j = 1; j <= countF; j++) {
            var t = j * 1 + countX * 1;
            if (i != 0) {
                functions[i][t] = i == j ? 1 : 0;
            } else functions[i][t] = 0;
        }
    }

    SimplexTable = new Simplex();
    SimplexTable.constructByLinear(functions, descr);
    var q = 0;
    do {
        solve.append(SimplexTable.print() + "<p></p>");
        q++;
    } while (q < 100 && SimplexTable.step());
    solve.append("<p>Все дельта >= 0 дальнейшее проведение итераций не представляется возможным.</p>");
    solve.append("<p>" + SimplexTable.getCurrentStepAnswer() + "</p>");
};

//Построение таблицы для ввода
var GetFunction = function () {
    countX = $("#XCount").val();
    var Table = TableHeader(countX);

    countF = $("#FCount").val();
    Table += createInput("Целевая функция (max)", 0, false);

    for (var i = 1; i <= countF; i++) {
        Table += createInput("Ограничение F(xn)>=0", i, true);
    }
    Table = table(Table);

    $("#inputCount").slideUp(500);
    $("#inputTable").append("Введите вогнутую целевую функцию и линейные ограничения:");
    $("#inputTable").append(Table);
    $("#inputTable").append("<button onclick=solve()>Искать решение</button>");
};

//Решение задачи
var solve = function () {
    var functions = [];
    for (var i = 0; i < countF * 1 + 1 * 1; i++) {
        var t = new squareFunction();
        t.constructFromIndex(i);
        functions.push(t);
    }
    var solve = $("#solve");

    solve.html("");

    Langran(solve, functions);
    var linear = Kun_Tekker(solve, functions);
    moreFlex(solve, "dL/d");
    addNewVariables(solve, linear);
    moreFlex(solve);
    toEquals(solve, linear);
    newArtificialVariables(solve, linear);
    prepareToSimplex(solve, linear);
    SimplexTable = new Simplex();
    SimplexTable.constructBySquare(linear);
    var q = 0;
    do {
        solve.append(SimplexTable.print() + "<p></p>");
        q++;
    } while (q < 1000 && SimplexTable.step());
    solve.append("<p>Все дельта >= 0 дальнейшее проведение итераций не представляется возможным.</p>");
    solve.append("<p>" + SimplexTable.getCurrentStepAnswer() + "</p>");
};
