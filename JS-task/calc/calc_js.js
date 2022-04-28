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
let formula = '';

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

function shouResultOnTablo(value) {
    formula = '';
    formula += value;
    resaltArea.insertAdjacentText('beforeend', formula);
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
            res = oper(dataNum, operation)
            // shouResultOnTablo();
            console.log()
        } else {
            res += dataNum;
            // shouResultOnTablo(dataNum);
            console.log(dataNum)
        }
    } else if (dataSymbol) {
        operation = dataSymbol;
        // shouResultOnTablo(operation)
        console.log(dataSymbol)
    } else if (dataRavno) {

    } else if (deleteAll) {

    }


    shouResultOnTablo(value)

})



