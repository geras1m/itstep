/*const body1 = document.querySelector('body')
let calcCod = `
    <div class="container">
        <div class="tablo"></div>
        <div class="btn-member" data-member-add = "MS">MS</div>
        <div class="btn-member" data-member-get = "MR">MR</div>
        <div class="btn delete" data-delete = "C">C</div>
        <div class="btn" data-num = "7">7</div>
        <div class="btn" data-num = "8">8</div>
        <div class="btn" data-num = "9">9</div>
        <div class="btn symbol" data-symbol = "/">/</div>
        <div class="btn" data-num = "4">4</div>
        <div class="btn" data-num = "5">5</div>
        <div class="btn" data-num = "6">6</div>
        <div class="btn symbol" data-symbol = "*">*</div>  
        <div class="btn" data-num = "1">1</div>
        <div class="btn" data-num = "2">2</div>
        <div class="btn" data-num = "3">3</div>
        <div class="btn symbol" data-symbol = "-">-</div>
        <div class="btn" data-num= ".">.</div>
        <div class="btn" data-num = "0">0</div>
        <div class="btn ravno" data-ravno = "=">=</div>
        <div class="btn symbol" data-symbol = "+">+</div>
    </div>`;
body1.insertAdjacentHTML('afterend', calcCod);

const resaltArea = document.querySelector('.tablo');
const allBtn = document.querySelector('.container');

let res = '';
let operation;
let newNum = '';
let memory ='';
let accumForMemory = '';
let isPoint = true;
let doClaer = true;


function oper(num = 0, symbol) {
    switch (symbol) {
        case "/":
            return res / Number(num);
        case "*":
            return res * Number(num);
        case "-":
            return res - Number(num);
        case "+":
            return Number(res) + Number(num);
        default:
            return `= ${res}`
    }
}


function decimal(num, accum) {
    if(num === '.' && accum ===''){
        num = '0.';                   // <-- не доработана до конца
        resaltArea.insertAdjacentText('beforeend', num);
    }
    else if (num === '.' && isPoint === true) {
        accum += num;
        resaltArea.insertAdjacentText('beforeend', num);
        isPoint = false;
    } else if (num !== '.'){
        accum += num;
        resaltArea.insertAdjacentText('beforeend', num);
    }
     // return {accum: accum,isPoint: isPoint}
}

function clear() {
    resaltArea.textContent = '';
    doClaer = false;
}

allBtn.addEventListener('click', (e) => {

    let elem = e.target;
    const dataNum = elem.dataset.num;
    const dataSymbol = elem.dataset.symbol;
    const dataRavno = elem.dataset.ravno;
    const deleteAll = elem.dataset.delete;
    const addInMemory = elem.dataset.memberAdd;
    const getFromMemory = elem.dataset.memberGet;

    if (dataNum) {
        if (operation) {
            newNum += dataNum;
            resaltArea.insertAdjacentText('beforeend', dataNum);
        }
        else {
            if(doClaer === true){
                clear()
            }
            decimal(dataNum);

        }
    }
    else if (dataSymbol) {
        operation = dataSymbol;
        resaltArea.insertAdjacentText('beforeend', operation)
    }
    else if (dataRavno) {
        resaltArea.textContent = '';
        res = oper(newNum, operation);
        resaltArea.insertAdjacentText('beforeend', res);
        accumForMemory = res;
        res = '';
        operation = 0;
        newNum = '';
        isPoint = true;
        doClaer = true;
    }
    else if (deleteAll) {
        res = '';
        operation = 0;
        resaltArea.textContent = '';
        newNum = '';
        isPoint = true;
    }
    else if(addInMemory){
        memory = accumForMemory;
    }
    else if(getFromMemory){

        resaltArea.insertAdjacentText('beforeend', memory)
    }
})
// в первое значение записывается res , а во второе набирается число. И только знак равно обнулит эти все результаты

// если меняю знак, то нужно убрать прошлый
// после нажатия на '=' след ввод цифр обнуляет табло
// добавить точку

// добавить функцию отвечающую за вывлд данных на консоль
// тобы при нажатии на делить выводился ноль*/

const body1 = document.querySelector('body');
let calcCod = `
    <div class="container">
    <div class="tablo">
        <div class="wrapper_operation">
            <div class="arguments1"></div>
            <div class="operation"></div>
            <div class="arguments2"></div>
        </div>
        <div class="result"></div>
    </div>
    <div class="show-m">M</div>
    <div class="btn btn-member" data-member-clear="MC">MC</div>
    <div class="btn btn-member" data-member-add="MS">MS</div>
    <div class="btn btn-member" data-member-get="MR">MR</div>
    <div class="btn delete" data-delete="C">C</div>
    <div class="btn" data-num="7">7</div>
    <div class="btn" data-num="8">8</div>
    <div class="btn" data-num="9">9</div>
    <div class="btn symbol" data-symbol="/">/</div>
    <div class="btn" data-num="4">4</div>
    <div class="btn" data-num="5">5</div>
    <div class="btn" data-num="6">6</div>
    <div class="btn symbol" data-symbol="*">*</div>
    <div class="btn" data-num="1">1</div>
    <div class="btn" data-num="2">2</div>
    <div class="btn" data-num="3">3</div>
    <div class="btn symbol" data-symbol="-">-</div>
    <div class="btn" data-num=".">.</div>
    <div class="btn" data-num="0">0</div>
    <div class="btn ravno" data-ravno="=">=</div>
    <div class="btn symbol" data-symbol="+">+</div>
</div>`;
body1.insertAdjacentHTML('afterend', calcCod);

const resultArea = document.querySelector('.tablo');
const allBtn = document.querySelector('.container');
const saveInMemory = document.querySelector('.show-m');
const areaFirstNum = document.querySelector('.arguments1');
const areaOperation = document.querySelector('.operation');
const areaSecondNum = document.querySelector('.arguments2');
const areaResult = document.querySelector('.result');

let res = '';
let firstNum = '';
let operand;
let secondNum = '';
let doClear = false;
let saveResultInMemory = '';

// Для совершения математ. операций
function oper(num = 0, symbol) {
    switch (symbol) {
        case "/":
            return firstNum / Number(num);
        case "*":
            return firstNum * Number(num);
        case "-":
            return firstNum - Number(num);
        case "+":
            return Number(firstNum) + Number(num);
        default:
            return `= 0`
    }
}

// Для вывода данныч на экран
let typingOnScreen = '';
function shouResultOnScreen(value) {
    typingOnScreen = '';
    typingOnScreen += value;
    resultArea.insertAdjacentText('beforeend', typingOnScreen);
}

//Очищает экран для ввода новых данных на экран после нажатия на =
function clearScreenAfterPressRavno() {
    resultArea.textContent = '';
    doClear = false;
}

// Добавляет значения в память
function addInMemoryNum() {
    if (res !== '') {
        saveResultInMemory = res;
    }
    else if (secondNum !== '') {
        saveResultInMemory = secondNum;
    }
    else if (firstNum !== '') {
        saveResultInMemory = firstNum;
    }
    saveInMemory.style.visibility = 'visible';
}

// Извлекает значения из памяти и подставляет в выражение
function getGetFromMemoryNum() {
    if (operand !== false) {
        clearScreenAfterPressRavno()
        firstNum = '';
        firstNum = saveResultInMemory;
        shouResultOnScreen(firstNum);
        operand = true;
    }
    else if (operand !== true) {
        secondNum = '';
        secondNum = saveResultInMemory;
        shouResultOnScreen(secondNum);
        operand = false;
    }
}
// Удаляет последний элемент в строки (которая выводит значения на экран) (для смены знаков + - / *)
function changeOperandOnScreen() {
    let text = resultArea.innerText;
    text = text.slice(0,text.length-1);
    resultArea.textContent = '';
    shouResultOnScreen(text);
}

// Функция отвечающая за одинарное выведение десятичной точки
let isPoint = true;
function addDecimalPoint(num) {                                       // Сделать универсальной
    if (num === '.' && isPoint === true){
        isPoint = false;
        shouResultOnScreen(num)
        firstNum += num;
    }
    else if(num !== '.'){
        firstNum += num;
        shouResultOnScreen(num)
    }
}

allBtn.addEventListener('click', (e) => {

    let elem = e.target;
    const dataNum = elem.dataset.num;
    const dataSymbol = elem.dataset.symbol;
    const dataRavno = elem.dataset.ravno;
    const deleteAll = elem.dataset.delete;
    const addInMemory = elem.dataset.memberAdd;
    const getFromMemory = elem.dataset.memberGet;
    const clearMemory = elem.dataset.memberClear;

    if (dataNum) {
        if (operand) {
            secondNum += dataNum;
            shouResultOnScreen(dataNum);
        }
        else {
            if (doClear === true) {
                clearScreenAfterPressRavno();
            }
            // firstNum += dataNum;
            // shouResultOnScreen(dataNum);
            addDecimalPoint(dataNum)
        }
    }
    else if (dataSymbol) {
        // Получаем последнее значение из уже введенных данных на экран и присваиваем его text
        let text = resultArea.innerText;
        // Получаем последний элемент
        text = text.substring(text.length-1);

        if(text === '-' || text === '+' || text === '*' || text === '/'){
            changeOperandOnScreen();
        }
        operand = dataSymbol;
        shouResultOnScreen(operand);
    }
    else if (dataRavno) {
        resultArea.textContent = '';
        res = oper(secondNum, operand);
        shouResultOnScreen(res);
        firstNum = '';
        operand = 0;
        secondNum = '';
        doClear = true;
        isPoint = true;
    }
    else if (deleteAll) {
        resultArea.textContent = '';
        res = '';
        firstNum = '';
        operand = 0;
        secondNum = '';
    }
    else if (addInMemory) {
        addInMemoryNum();
    }
    else if (getFromMemory) {
        getGetFromMemoryNum();
    }
    else if (clearMemory) {
        saveResultInMemory = '';
        saveInMemory.style.visibility = 'hidden';
    }
});

//Добавлять в эти Div-ы которые находятся в табло, значения которые ввожу и обновлять их и редактировать значит будет проще

// При добавлении в память числа, отобразить М на экране (DONE !!!)
// Ограничить вывод знаков операторов на экран           (DONE !!!)
// сделать точку
// чтобы при нажатии на делить выводился ноль


