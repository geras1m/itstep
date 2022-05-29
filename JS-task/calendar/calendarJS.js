const calendarWrapper = document.querySelector('.wrapper-with-dates-of-calendar');
let dateYearAndMonth = document.querySelector('.calendar-date');

let countOfDaysInActualMonth;
let firstDayOfWeek;

let yearSelectedInCalendar;
let monthSelectedInCalendar;

// Определяем текущую дату и достаем из нее год и месяц
let dateNow = new Date();
let yearNow = dateNow.getFullYear();
let monthNow = dateNow.getMonth() + 1;

function showYearAndMonthInCalendar(year, month) {
// Показывает в календаре месяц и год для отображаемого месяца

    let options = {
        year: 'numeric',
        month: 'long',
    };
    let showDate = (new Date(year, month - 1));

    yearSelectedInCalendar = showDate.getFullYear();
    monthSelectedInCalendar = showDate.getMonth();

    let newShowDate = showDate.toLocaleString('ru-RU', options);
    dateYearAndMonth.insertAdjacentHTML('afterbegin', newShowDate);
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
    for (let i = 5; i < blocksAll.length; i += 7) {
        blocksAll[i].classList.add('color-text');
        blocksAll[i + 1].classList.add('color-text');
    }
}

function addEmptyBlocksBeforeDate() {
    // Добавляет пустые блоки (в начале каледаря) в календарь если месяц начинается не с понедельника

    let dateBefore = new Date();
/*    let yearBefore = dateBefore.getFullYear();
    let monthBefore = dateBefore.getMonth();*/
    let daysBefore = dateBefore.getDate();
// Отнять от предыдущего месяца количество пустых блоков и мы получим число а потом это число++
    console.log(daysBefore)
    let emptyBlockBefore;
    if (firstDayOfWeek === 0 && firstDayOfWeek !== 1) {
        for (let j = firstDayOfWeek; j < 6; j++ , daysBefore--) {
            emptyBlockBefore = `<div class="block-date epmty">${daysBefore}</div>`
            calendarWrapper.insertAdjacentHTML('beforeend', emptyBlockBefore);
        }
    } else if (firstDayOfWeek !== 1) {
        for (let k = firstDayOfWeek - 1; k > 0; k--, daysBefore--) {
            emptyBlockBefore = `<div class="block-date epmty">${daysBefore}</div>`
            calendarWrapper.insertAdjacentHTML('beforeend', emptyBlockBefore);
        }
    }
}

function addEmptyBlocksAfterDate() {
    // Добавляет пустые блоки (в конце каледаря) в календарь

    let emptyBlockAfter;

    const blocksAll = document.querySelectorAll('.block-date');
    if (blocksAll.length > 28 && blocksAll.length < 35) {
        let countOfEmptyBlocksAfter = 35 - (blocksAll.length + 1)
        for (let i = 0; i <= countOfEmptyBlocksAfter; i++) {
            emptyBlockAfter = `<div class="block-date epmty">${i+1}</div>`
            calendarWrapper.insertAdjacentHTML('beforeend', emptyBlockAfter);
        }
    } else if (blocksAll.length > 35 && blocksAll.length < 42) {
        let countOfEmptyBlocksAfter = 42 - (blocksAll.length + 1)
        for (let i = 0; i <= countOfEmptyBlocksAfter; i++) {
            emptyBlockAfter = `<div class="block-date epmty">${i+1}</div>`
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

function changeMonth(month) {
    const arrowBefore = document.querySelector('.before');
    const arrowAfter = document.querySelector('.after');

    arrowBefore.addEventListener('click', () => {
        month--;
        calendarWrapper.textContent = '';
        dateYearAndMonth.textContent = '';

        createCalendar(yearNow, month);

    })

    arrowAfter.addEventListener('click', () => {
        month++;
        console.log(month)
        calendarWrapper.textContent = '';
        dateYearAndMonth.textContent = '';

        createCalendar(yearNow, month);

    })
}

function createCalendar(year, month) {

    showYearAndMonthInCalendar(year, month);

    getFirstDayOfWeek(year, month);

    getCountOfDaysInActualMonth(year, month);

    addEmptyBlocksBeforeDate();

    createBlocksWithDates();

    addEmptyBlocksAfterDate();

    addColorForWeekends();

    markTodayDate();
}

function markTodayDate() {
//Помечает сегодняшнюю дату в месяце

    if (yearNow === yearSelectedInCalendar && monthNow - 1 === monthSelectedInCalendar) {
        // Сравнивает год и месяц из значений переменной полученных при первоночальном
        // отображении месяца из dateNow и значений получаемых при перключении месяцев в
        // календаре из функции showYearAndMonthInCalendar()

        let ActualNumberOfDayInMonth = dateNow.getDate();
        const blocksAll = document.querySelectorAll('.block-date');
        for (const blocksAllElement of blocksAll) {
            if (Number(blocksAllElement.textContent) === ActualNumberOfDayInMonth) {
                blocksAllElement.classList.add('actual-day-in-month');
            }
        }
    }

}

/*function hoverWeather() {
    const allBlocksFromCalendar = document.querySelector('.actual-day-in-month');
    console.log(allBlocksFromCalendar);

    allBlocksFromCalendar.addEventListener('mouseover', ()=>{
        allBlocksFromCalendar.style.backgroundColor = "red";
    })

  /!*  (POPUP).addEventListener('mouseleave', ()=>{
        allBlocksFromCalendar.style.backgroundColor = "blue";
    })*!/
}*/

createCalendar(yearNow, monthNow);
// hoverWeather();
changeMonth(monthNow);

// Доделать функцию вывода чисел из прошлого месяца!!!!!!!!!!!!!