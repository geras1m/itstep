const calendarWrapper = document.querySelector('.wrapper-with-dates-of-calendar');
const dateYearAndMonth = document.querySelector('.calendar-date');

let countOfDaysInActualMonth;
let firstDayOfWeek;

let trackYearOnCalendar;
let trackMonthOnCalendar;

// Определяем текущую дату и достаем из нее год и месяц
let dateNow = new Date();
let yearNow = dateNow.getFullYear();
let monthNow = dateNow.getMonth();
let dateOfMonthNow = dateNow.getDate();

let dateForWeatherFirst;
/*let dateForWeatherSecond;
let dateForWeatherThird;
let dateForWeatherFourth;*/
let objDateAPI;
let firstValueOfDay;
/*let secondValueOfDay;
let thirdValueOfDay;
let fourthValueOfDay;*/

let iconCurrentWeather;
let temperatureCurrentWeather;
let temperatureFeelsLikeWeather;

let symbolDegreesCelsius = ' C<split>&#176;</split>';

function showYearAndMonthInCalendar(year, month) {
// Показывает в календаре месяц и год для отображаемого месяца

    let options = {
        year: 'numeric',
        month: 'long',
    };
    let showDate = (new Date(year, month));

    trackYearOnCalendar = showDate.getFullYear();
    trackMonthOnCalendar = showDate.getMonth();

    let newShowDate = showDate.toLocaleString('ru-RU', options);
    dateYearAndMonth.insertAdjacentHTML('afterbegin', newShowDate);
}

function getCountOfDaysInActualMonth(year, month) {
    // Определяет количество дней в месяце (последний день месяца)

    countOfDaysInActualMonth = new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(yearNow, monthNow) {
    // Определяет день недели (пн, вт и тд.) у первого дня месяца

    firstDayOfWeek = new Date(yearNow, monthNow, 1).getDay();
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
    // Добавляет пустые блоки в конце календаря

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
    // Функция для отрисовки блоков (с числами) для одного месяца

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
    // Переключает месяца по нажатию кнопок 'вверх' и 'вниз'

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
        calendarWrapper.textContent = '';
        dateYearAndMonth.textContent = '';
        createCalendar(yearNow, month);
    })
}

function createCalendar(year, month){

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

    if (yearNow === trackYearOnCalendar && monthNow === trackMonthOnCalendar) {
        // Сравнивает год и месяц из значений переменной полученных при первоночальном
        // отображении месяца из dateNow и значений получаемых при перключении месяцев в
        // календаре из функции showYearAndMonthInCalendar()

        const blocksAll = document.querySelectorAll('.numbers-of-date');
        blocksAll.forEach((item) => {
            if (Number(item.textContent) === dateOfMonthNow) {
                item.classList.add('actual-day-in-month');
            }
        })
    }
}

///////////////////////////////////////// Работа с блоком погоды /////////////////////////////////////////

function hoverWeather() {
    if(yearNow === trackYearOnCalendar && monthNow === trackMonthOnCalendar){

        const popupWeather = document.querySelector('.popup');
        calendarWrapper.addEventListener('mouseover', (e) => {
            let elem = e.target;

            if(Number(elem.textContent) === firstValueOfDay){
                console.log(elem.textContent);
                addDataToBlockWeather(0)
                popupWeather.style.visibility = 'visible';
                // onmousemove = event.clientX
            }
        })
    }
    (async function () {
        await showWeather();
    })();
}

function addDataToBlockWeather(index) {
    iconCurrentWeather = objDateAPI.daily[index].weather[0].icon;
    temperatureCurrentWeather = Math.round(objDateAPI.daily[index].temp.day);
    temperatureFeelsLikeWeather = Math.round(objDateAPI.daily[index].feels_like.day);
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
            objDateAPI = dataActual;

            dateForWeatherFirst = new Date((dataActual.daily[0].dt * 1000));
            firstValueOfDay = dateForWeatherFirst.getDate();

        })
}

/*
function hoverWeather() {
        const allBlocksFromCalendar = document.querySelectorAll('.block-date');
        const popupWeather = document.querySelector('.popup');
        console.log(allBlocksFromCalendar)

        calendarWrapper.addEventListener('mouseover', (e) => {
            let elem = e.target;

            if(Number(elem.textContent) === firstValueOfDay){
                console.log(Number(elem.textContent), firstValueOfDay)
                popupWeather.style.visibility = 'visible';
                // onmousemove = event.clientX
            }
            else if(Number(elem.textContent) === secondValueOfDay){
                console.log(Number(elem.textContent), secondValueOfDay)
                popupWeather.style.visibility = 'visible';
            }
            else if(Number(elem.textContent) === thirdValueOfDay){
                console.log(Number(elem.textContent), thirdValueOfDay)
                popupWeather.style.visibility = 'visible';
            }
            else if(Number(elem.textContent) === fourthValueOfDay){
                console.log(Number(elem.textContent), fourthValueOfDay)
                popupWeather.style.visibility = 'visible';
            } // mouseleave помещен внутри отслеживаемого события mouseover,
              // чтобы можно было отследить момент ухода за границы блока
            elem.addEventListener('mouseleave', () => {
                popupWeather.style.visibility = 'hidden';
            })
        })
    showWeather()
}

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

            dateForWeatherSecond =  new Date((dataActual.daily[1].dt) * 1000);
            secondValueOfDay = dateForWeatherSecond.getDate();

            dateForWeatherThird = new Date((dataActual.daily[2].dt) * 1000);
            thirdValueOfDay = dateForWeatherThird.getDate();

            dateForWeatherFourth = new Date((dataActual.daily[3].dt) * 1000);
            fourthValueOfDay = dateForWeatherFourth.getDate();

            iconCurrentWeather = dataActual.daily[0].weather[0].icon;
            temperatureCurrentWeather = Math.round(dataActual.daily[0].temp.day);
            temperatureFeelsLikeWeather = Math.round(dataActual.daily[0].feels_like.day);

            renderElementsInWrapperWeatherHtml(dateForWeatherFirst, iconCurrentWeather, temperatureCurrentWeather, temperatureFeelsLikeWeather)
        })
}

function renderElementsInWrapperWeatherHtml(date, icon, tepm, tempFeelsLike) {
    // Отрисовывает данные в блоке погоды для выбранного дня

    const dateWeatherHtml = document.querySelector('.date-weather');
    dateWeatherHtml.insertAdjacentHTML('beforeend', getDateWeather(date))

    const iconWeatherHtml = document.querySelector('.img-weather');
    iconWeatherHtml.insertAdjacentHTML('beforeend', changeImgWeather(icon));

    const temperatureWeatherHtml = document.querySelector('.temperature-weather');
    temperatureWeatherHtml.insertAdjacentHTML('beforeend', tepm + symbolDegreesCelsius)

    const temperatureFeelsLikeWeatherHtml = document.querySelector('.temperature-feels-like-weather');
    temperatureFeelsLikeWeatherHtml.insertAdjacentHTML('beforeend', tempFeelsLike + symbolDegreesCelsius)
}
*/




createCalendar(yearNow, monthNow);
hoverWeather()

changeMonth(monthNow);
// hoverWeather();
// Доделать функцию вывода чисел из прошлого месяца!!!!!!!!!!!!!