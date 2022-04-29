const body1 = document.querySelector('body')
let calcCod = `
    <div class="container">
        <div class="tablo">
            <div class="show-m">M</div>
        </div>
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
const saveInMemory = document.querySelector('.show-m')

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
            return `= ${firstNum}`
    }
}

// Для вывода данныч на экран
let typingOnScreen = '';

function shouResultOnScreen(value) {
    typingOnScreen = '';
    typingOnScreen += value;
    resaltArea.insertAdjacentText('beforeend', typingOnScreen);
}

//Очищает экран для ввода новых данных на экран после нажатия на =
function clearScreenAfterPressRavno() {
    resaltArea.textContent = '';
    doClear = false;
}

function addInMemoryNum() {
    if (res !== '') {
        saveResultInMemory = res;
    }
    else if(secondNum !== ''){
        saveResultInMemory = secondNum;
    }
    else if(firstNum !== ''){
        saveResultInMemory = firstNum;
    }
    saveInMemory.style.visibility = 'visible';
}

function getGetFromMemoryNum() {
    if (firstNum === '') {
        res = saveResultInMemory;
    }
    else if(secondNum === ''){
        secondNum = saveResultInMemory;
    }
    else if(res === ''){
        firstNum = saveResultInMemory;
    }
    saveInMemory.style.visibility = 'hidden';
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
        if (operand) {
            secondNum += dataNum;
            shouResultOnScreen(dataNum);
        } else {
            if (doClear === true) {
                clearScreenAfterPressRavno()
            }
            firstNum += dataNum;
            shouResultOnScreen(dataNum);
        }
    } else if (dataSymbol) {
        operand = dataSymbol;
        shouResultOnScreen(operand);
    } else if (dataRavno) {
        resaltArea.textContent = '';
        res = oper(secondNum, operand)
        shouResultOnScreen(res)

        res = '';
        firstNum = '';
        operand = 0;
        secondNum = '';
        doClear = true;
    } else if (deleteAll) {
        resaltArea.textContent = '';
        res = '';
        firstNum = 0;
        operand = 0;
        secondNum = '';
    } else if (addInMemory) {
        addInMemoryNum()
    } else if (getFromMemory) {
        getGetFromMemoryNum()
    }
})

// При добавлении в память числа, отобразить М на экоане
// сделать точку
// чтобы при нажатии на делить выводился ноль

