const calendarWrapper = document.querySelector('.wrapper-calendar');

let countOfDaysInActualMonth;
let firstDayOfWeek;

// Определяем текущую дату и достаем из нее год и месяц
let dateNow = new Date();
let yearNow = dateNow.getFullYear();
let monthNow = dateNow.getMonth() + 1;

function showYearAndMonthInCalendar() {
    let dateYearAndMonth = document.querySelector('.calendar-date');

    let options = {
        year: 'numeric',
        month: 'long',
    };
    let showDate = (new Date()).toLocaleString('ru-RU', options);
    dateYearAndMonth.insertAdjacentHTML('afterbegin', showDate);
}

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
    // Меняет стиль для блоков календаря соответствующих выходным дням месяца

    const blocksAll = document.querySelectorAll('.block-date');
    for (let i = 5; i < blocksAll.length; i+=7){
            blocksAll[i].classList.add('color-text');
            blocksAll[i+1].classList.add('color-text');
    }
}

function addEmptyBlocksBeforeDate() {
    // Добавляет пустые блоки (в начале каледаря) в календарь если месяц начинается не с понедельника

    let emptyBlockBefore = '<div class="block-date"></div>';
    if (firstDayOfWeek === 0 && firstDayOfWeek !== 1) {
        for (let j = firstDayOfWeek; j < 6; j++) {
            calendarWrapper.insertAdjacentHTML('beforeend', emptyBlockBefore);
        }
    }else if(firstDayOfWeek !== 1){
        for (let k = firstDayOfWeek - 1; k > 0; k--) {
            calendarWrapper.insertAdjacentHTML('beforeend', emptyBlockBefore);
        }
    }
}

function addEmptyBlocksAfterDate() {
    // Добавляет пустые блоки (в конце каледаря) в календарь

    let emptyBlockAfter = '<div class="block-date"></div>';

    const blocksAll = document.querySelectorAll('.block-date')
    if (blocksAll.length > 28 && blocksAll.length < 35){
        let countOfEmptyBlocksAfter = 35 - (blocksAll.length + 1)
        for (let i = 0; i <= countOfEmptyBlocksAfter; i++){
            calendarWrapper.insertAdjacentHTML('beforeend', emptyBlockAfter);
        }
    }
    else if (blocksAll.length > 35 && blocksAll.length < 42){
        let countOfEmptyBlocksAfter = 42 - (blocksAll.length + 1)
        for (let i = 0; i <= countOfEmptyBlocksAfter; i++){
            calendarWrapper.insertAdjacentHTML('beforeend', emptyBlockAfter);
        }
    }
}

function createBlocksWithDates() {
    // Функция для отрисовки блоков (пустых и с числами) для одного месяца

    // Добавляет нужное количество блоков с числами для данного месяца в календарь
    for (let i = 1; i <= countOfDaysInActualMonth; i++) {
        let blockWithDate = `
            <div class="block-date">
                ${i}
            </div>`;
        calendarWrapper.insertAdjacentHTML('beforeend', blockWithDate);
    }
}

/*function changeMonth(month) {
    const arrowBefore = document.querySelector('.before');
    const arrowAfter = document.querySelector('.after');



    showYearAndMonthInCalendar();
}*/

showYearAndMonthInCalendar(yearNow, monthNow)

getFirstDayOfWeek(yearNow, monthNow);

getCountOfDaysInActualMonth(yearNow, monthNow);

addEmptyBlocksBeforeDate();

createBlocksWithDates();

addEmptyBlocksAfterDate();

addColorForWeekends();
//