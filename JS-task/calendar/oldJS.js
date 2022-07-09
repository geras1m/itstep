/*const calendarWrapper = document.querySelector('.wrapper-with-dates-of-calendar');
let dateYearAndMonth = document.querySelector('.calendar-date');

let countOfDaysInActualMonth;
let firstDayOfWeek;

let yearSelectedInCalendar;
let monthSelectedInCalendar;

// Определяем текущую дату и достаем из нее год и месяц
let dateNow = new Date();
let yearNow = dateNow.getFullYear();
let monthNow = dateNow.getMonth();

let dateForWeatherFirst;
let dateForWeatherSecond;
let dateForWeatherThird;
let dateForWeatherFourth;

let firstValueOfDay;
let secondValueOfDay;
let thirdValueOfDay;
let fourthValueOfDay;

let iconCurrentWeather;
let temperatureCurrentWeather;
let temperatureFeelsLikeWeather;*/

let trackDateOnCalendar = monthNow;

// let symbolDegreesCelsius = ' C<split>&#176;</split>';

// let countOfDaysInMonthBefore = new Date(2022, monthNow, 0).getDate();

// function showYearAndMonthInCalendar(year, month) {
// // Показывает в календаре месяц и год для отображаемого месяца
//
//     let options = {
//         year: 'numeric',
//         month: 'long',
//     };
//     let showDate = (new Date(year, month));
//
//     yearSelectedInCalendar = showDate.getFullYear();
//     monthSelectedInCalendar = showDate.getMonth();
//
//     let newShowDate = showDate.toLocaleString('ru-RU', options);
//     dateYearAndMonth.insertAdjacentHTML('afterbegin', newShowDate);
// }

// function getCountOfDaysInActualMonth(year, month) {
//     // Определяет количество дней в месяце (последний день месяца)
//
//     countOfDaysInActualMonth = new Date(year, month + 1, 0);
//     return countOfDaysInActualMonth = countOfDaysInActualMonth.getDate();
// }

/*function getFirstDayOfWeek(yearNow, monthNow) {
    // Определяет день недели (пн, вт и тд.) у первого дня месяца

    firstDayOfWeek = new Date(yearNow, monthNow, 1);
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

//Доделать вывод чисел из прошлого месяца
function addEmptyBlocksBeforeDate() {
    // Добавляет пустые блоки (в начале каледаря) в календарь если месяц начинается не с понедельника

    // console.log(countOfDaysInMonthBefore)

    let emptyBlockBefore;
    if (firstDayOfWeek === 0) {
        // countOfDaysInMonthBefore -= 5;

        for (let j = firstDayOfWeek; j < 6; j++) {
            // countOfDaysInMonthBefore++
            emptyBlockBefore = `<div class="block-date epmty"></div>`;
            calendarWrapper.insertAdjacentHTML('beforeend', emptyBlockBefore);
        }
    } else if (firstDayOfWeek !== 0) {
        // countOfDaysInMonthBefore -= firstDayOfWeek;

        for (let k = firstDayOfWeek - 1; k > 0; k--) {
            // countOfDaysInMonthBefore++
            emptyBlockBefore = `<div class="block-date epmty"></div>`;
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
            emptyBlockAfter = `<div class="block-date epmty-after">${i + 1}</div>`
            calendarWrapper.insertAdjacentHTML('beforeend', emptyBlockAfter);
        }
    } else if (blocksAll.length > 35 && blocksAll.length < 42) {
        let countOfEmptyBlocksAfter = 42 - (blocksAll.length + 1)
        for (let i = 0; i <= countOfEmptyBlocksAfter; i++) {
            emptyBlockAfter = `<div class="block-date epmty-after">${i + 1}</div>`
            calendarWrapper.insertAdjacentHTML('beforeend', emptyBlockAfter);
        }
    }
}

function createBlocksWithDates() {
    // Функция для отрисовки блоков (пустых и с числами) для одного месяца

    // Добавляет нужное количество блоков с числами для данного месяца в календарь
    for (let i = 1; i <= countOfDaysInActualMonth; i++) {
        let blockWithDate = `
            <div class="block-date numbers-of-date">
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
        trackDateOnCalendar = month;
        console.log(month)
    })

    arrowAfter.addEventListener('click', () => {
        month++;

        calendarWrapper.textContent = '';
        dateYearAndMonth.textContent = '';

        createCalendar(yearNow, month);
        trackDateOnCalendar = month;
        console.log(month)
    })

}*/

// function createCalendar(year, month) {
//
//     showYearAndMonthInCalendar(year, month);
//
//     getFirstDayOfWeek(year, month);
//
//     getCountOfDaysInActualMonth(year, month);
//
//     addEmptyBlocksBeforeDate();
//
//     createBlocksWithDates();
//
//     addEmptyBlocksAfterDate();
//
//     addColorForWeekends();
//
//     markTodayDate();
//
//
// }

function markTodayDate() {
//Помечает сегодняшнюю дату в месяце

    if (yearNow === yearSelectedInCalendar && monthNow === monthSelectedInCalendar) {
        // Сравнивает год и месяц из значений переменной полученных при первоночальном
        // отображении месяца из dateNow и значений получаемых при перключении месяцев в
        // календаре из функции showYearAndMonthInCalendar()

        let actualNumberOfDayInMonth = dateNow.getDate();
        const blocksAll = document.querySelectorAll('.numbers-of-date');

        blocksAll.forEach((item) => {
            if (Number(item.textContent) === actualNumberOfDayInMonth) {
                item.classList.add('actual-day-in-month');
            }
        })
    }
}

///////////////////////////////////////// Работа с блоком погоды /////////////////////////////////////////

function changeImgWeather(codeOfIcon) {
    // Подкидывает ссылку с картинкой погоды

    return `<img src="http://openweathermap.org/img/wn/${codeOfIcon}@2x.png" alt="">`;
}

function getDateWeather(dateMS) {
    // Выводит дату для погоды
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return (new Date(dateMS)).toLocaleString('ru-RU', options);
}

function getDataForRenderHtml(index) {
    iconCurrentWeather = dataActual.daily[index].weather[0].icon;
    temperatureCurrentWeather = Math.round(dataActual.daily[index].temp.day);
    temperatureFeelsLikeWeather = Math.round(dataActual.daily[index].feels_like.day);
}

function hoverWeather() {
    // let indexOfActualDay;
    console.log(trackDateOnCalendar);
    console.log(monthNow);

    const wrapperCalendar = document.querySelector('.wrapper-with-dates-of-calendar');
    const allBlocksFromCalendar = document.querySelectorAll('.block-date');
    const popupWeather = document.querySelector('.popup');
    console.log(allBlocksFromCalendar)

    /*allBlocksFromCalendar.forEach((elem,index)=>{
        if (elem.className === 'actual-day-in-month'){
            indexOfActualDay = index;
            console.log(indexOfActualDay)
        }
    })*/

    wrapperCalendar.addEventListener('mouseover', (e) => {
        let elem = e.target;

        if (Number(elem.textContent) === firstValueOfDay) {
            console.log(Number(elem.textContent), firstValueOfDay)
            getDataForRenderHtml(0)
            popupWeather.style.visibility = 'visible';
            // onmousemove = event.clientX
        }
        else if (Number(elem.textContent) === secondValueOfDay) {
            console.log(Number(elem.textContent), secondValueOfDay)
            getDataForRenderHtml(1)
            popupWeather.style.visibility = 'visible';
        }
        else if (Number(elem.textContent) === thirdValueOfDay) {
            console.log(Number(elem.textContent), thirdValueOfDay)
            getDataForRenderHtml(2)
            popupWeather.style.visibility = 'visible';
        }
        else if (Number(elem.textContent) === fourthValueOfDay) {
            console.log(Number(elem.textContent), fourthValueOfDay)
            getDataForRenderHtml(3)
            popupWeather.style.visibility = 'visible';
        } // mouseleave помещен внутри отслеживаемого события mouseover,
          // чтобы можно было отследить момент ухода за границы блока
        elem.addEventListener('mouseleave', () => {
            popupWeather.style.visibility = 'hidden';
        })
    })

}

async function showWeather(city = 'Mogilev') {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`)
        .then((response) => response.json())
        .then((data) => {
            let latitudeOfCity = data.coord.lat;
            let longitudeOfCity = data.coord.lon;
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitudeOfCity}&lon=${longitudeOfCity}&units=metric&exclude=minutely,hourly,alerts&appid=d2d35b6f5f8da4f517968aa7540b713d`)
        })
        .then((response) => response.json())
        .then((dataActual) => {
            // Погода сегодня

            dateForWeatherFirst = new Date((dataActual.daily[0].dt * 1000));
            firstValueOfDay = dateForWeatherFirst.getDate();

            dateForWeatherSecond = new Date((dataActual.daily[0].dt * 1000));
            secondValueOfDay = dateForWeatherSecond.getDate();

            dateForWeatherThird = new Date((dataActual.daily[0].dt * 1000));
            thirdValueOfDay = dateForWeatherThird.getDate();

            dateForWeatherFourth = new Date((dataActual.daily[0].dt * 1000));
            fourthValueOfDay = dateForWeatherFourth.getDate();


            renderElementsInWrapperWeatherHtml(dateForWeatherFirst, iconCurrentWeather, temperatureCurrentWeather, temperatureFeelsLikeWeather);
        })
}

function renderElementsInWrapperWeatherHtml(date, icon, temp, tempFeelsLike) {
    // Отрисовывает данные в блоке погоды для выбранного дня

    const dateWeatherHtml = document.querySelector('.date-weather');
    dateWeatherHtml.insertAdjacentHTML('beforeend', getDateWeather(date))

    const iconWeatherHtml = document.querySelector('.img-weather');
    iconWeatherHtml.insertAdjacentHTML('beforeend', changeImgWeather(icon));

    const temperatureWeatherHtml = document.querySelector('.temperature-weather');
    temperatureWeatherHtml.insertAdjacentHTML('beforeend', temp + symbolDegreesCelsius)

    const temperatureFeelsLikeWeatherHtml = document.querySelector('.temperature-feels-like-weather');
    temperatureFeelsLikeWeatherHtml.insertAdjacentHTML('beforeend', tempFeelsLike + symbolDegreesCelsius)
}

showWeather()

createCalendar(yearNow, monthNow);
// hoverWeather()

changeMonth(monthNow);
hoverWeather();
// Доделать функцию вывода чисел из прошлого месяца!!!!!!!!!!!!!