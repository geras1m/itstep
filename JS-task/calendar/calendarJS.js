const calendarWrapper = document.querySelector('.wrapper-calendar');

let countOfDaysInActualMonth;
let firstDayOfWeek;
let dateNow = new Date();
let yearNow = dateNow.getFullYear();
let monthNow = dateNow.getMonth() + 1;

function getCountOfDaysInActualMonth(year, month) {
    // Определяет количество дней в месяце (последний день месяца)

    countOfDaysInActualMonth = new Date(year, month, 0);
    return countOfDaysInActualMonth = countOfDaysInActualMonth.getDate();
}

function getFirstDayOfWeek(yearNow, monthNow) {
    // Определяет день недели (пн, вт и тд.) у первого дня месяца

    firstDayOfWeek = new Date(yearNow, monthNow - 1, 1);
    firstDayOfWeek = firstDayOfWeek.getDay();
}

function addColorForWeekends() {
    const blocksAll = document.querySelectorAll('.block-date');
    for (let i = 5; i < blocksAll.length; i+=7){

            blocksAll[i].classList.add('color-text');
            blocksAll[i+1].classList.add('color-text');

    }
}

function createBlocksWithDates() {

    let blockWithDate = '<div class="block-date"></div>';

    if (firstDayOfWeek === 0 && firstDayOfWeek !== 1) {
        for (let j = firstDayOfWeek; j < 6; j++) {
            calendarWrapper.insertAdjacentHTML('beforeend', blockWithDate);
        }
    }else if(firstDayOfWeek !== 1){
        for (let k = firstDayOfWeek - 1; k > 0; k--) {
            calendarWrapper.insertAdjacentHTML('beforeend', blockWithDate);
        }
    }

    for (let i = 1; i <= countOfDaysInActualMonth; i++) {
        blockWithDate = `
            <div class="block-date">
                ${i}
            </div>`;
        calendarWrapper.insertAdjacentHTML('beforeend', blockWithDate);
    }

    addColorForWeekends()
}




getFirstDayOfWeek(yearNow, monthNow);

getCountOfDaysInActualMonth(yearNow, monthNow);

createBlocksWithDates();

