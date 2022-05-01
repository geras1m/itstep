const body1 = document.querySelector('body')
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
// тобы при нажатии на делить выводился ноль

