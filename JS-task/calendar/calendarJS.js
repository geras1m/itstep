const calendarWrapper = document.querySelector('.wrapper-calendar');

let countOfDaysInActualMonth;
let arr = [];
let dateNow = new Date();
let yearNow = dateNow.getFullYear();
let monthNow = dateNow.getMonth() + 1;
let firstDayOfWeekInMonth = dateNow.getDay();
console.log(firstDayOfWeekInMonth)

function getDate(year, month) {
    countOfDaysInActualMonth = new Date(year, month, 0);
    return countOfDaysInActualMonth = countOfDaysInActualMonth.getDate();
}

getDate(yearNow, monthNow);

for (let i = 1; i <= countOfDaysInActualMonth; i++) {
    arr.push(i);
}

function createBlocksWithDates(arr) {
    let blockWithDate = '<div class="block-date"></div>';

    if(firstDayOfWeekInMonth !== 1){
        for(let j = firstDayOfWeekInMonth - 1; j < 7; j++){
            calendarWrapper.insertAdjacentHTML('beforeend', blockWithDate);
        }
    }

    for (let i = 0; i < arr.length; i++) {
        blockWithDate = `
            <div class="block-date">
                ${arr[i]}
            </div>`;
        calendarWrapper.insertAdjacentHTML('beforeend', blockWithDate);
    }

}

createBlocksWithDates(arr);
