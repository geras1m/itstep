'use strict'
const calendarWrapper = document.querySelector('.wrapper-with-dates-of-calendar');
const dateYearAndMonth = document.querySelector('.calendar-date');
const popupWeather = document.querySelector('.popup');
const hintBox = document.querySelector('.hint-box');
const hintBoxImgCloud = document.querySelector('.hint-box img');
const hintBoxDescriptionText = document.querySelector('.hint-box p');
const inputValue = document.querySelector('.input');
const iconWeatherInHtml = `<img class="clouds-icon" src="img/clouds-icon.svg" alt="">`;

let timerID;

let countOfDaysInActualMonth;
let firstDayOfWeek;

let trackYearOnCalendar;
let trackMonthOnCalendar;

// Определяем текущую дату и достаем из нее год и месяц
let dateNow = new Date();
let yearNow = dateNow.getFullYear();
let monthNow = dateNow.getMonth();
let dateOfMonthNow = dateNow.getDate();

let monthBefore = monthNow - 1;

let dataApi;
let firstNumberOfNextDay;
let classesForFirstNumberOfNextDay;
let secondNumberOfNextDay;
let classesForSecondNumberOfNextDay;
let thirdNumberOfNextDay;
let classesForThirdNumberOfNextDay;
let fourthNumberOfNextDay;
let classesForFourthNumberOfNextDay;

let dateForWeatherFirst;
let firstValueOfDay;

let nameOfCityWeather;
let iconCurrentWeather;
let temperatureCurrentWeather;
let temperatureFeelsLikeWeather;
let windyCurrentWeather;
let humidityCurrentWeather;
let pressureCurrentWeather;
let popCurrentWeather;

let positionOfMouseX;
let positionOfMouseY;

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

function addEmptyBlocksBeforeDate() {
    // Добавляет пустые блоки (в начале каледаря) в календарь если месяц начинается не с понедельника

    let dateOfMonthBefore = new Date(yearNow, monthBefore + 1, 0).getDate();
    let emptyBlockBefore;
    if (firstDayOfWeek === 0) {
        dateOfMonthBefore -= 5;

        for (let j = firstDayOfWeek; j < 6; j++, dateOfMonthBefore++) {

            emptyBlockBefore = `<div class="block-date epmty">${dateOfMonthBefore}</div>`;
            calendarWrapper.insertAdjacentHTML('beforeend', emptyBlockBefore);
        }
    } else if (firstDayOfWeek !== 0 && firstDayOfWeek !== 1) {

        let newDateOfMonthBefore = dateOfMonthBefore - firstDayOfWeek + 2;
        for (let k = firstDayOfWeek - 1; k > 0; k--, newDateOfMonthBefore++) {

            emptyBlockBefore = `<div class="block-date epmty">${newDateOfMonthBefore}</div>`;
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
        monthBefore--;
        calendarWrapper.textContent = '';
        dateYearAndMonth.textContent = '';
        createCalendar(yearNow, month);
        findNextDays();
    })

    arrowAfter.addEventListener('click', () => {
        month++;
        monthBefore++;
        calendarWrapper.textContent = '';
        dateYearAndMonth.textContent = '';
        createCalendar(yearNow, month);
        findNextDays();
    })
}

function createCalendar(year, month) {

    hintHover()

    closeHintDescription()

    showYearAndMonthInCalendar(year, month);

    getFirstDayOfWeek(year, month);

    getCountOfDaysInActualMonth(year, month);

    addEmptyBlocksBeforeDate();

    createBlocksWithDates();

    addEmptyBlocksAfterDate();

    addColorForWeekends();

    markTodayDate();

    (async function () {                                         // Проверка на наличие города в localStorage
        if(localStorage.hasOwnProperty('cityMemory')){
            await showWeather(localStorage.getItem('cityMemory'));
        }
        else {
            await showWeather();
        }
    })();
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

///////////////////////////////////////// Работа с погодой /////////////////////////////////////////

function searchCity() {
    // Ввод города по нажатию 'Enter'
    inputValue.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            let newCity = inputValue.value;

            inputValue.value = '';
            console.log(newCity)
            if (!newCity) return;
            (async function () {
                await showWeather(newCity);
            })();
        }
    })
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

function renderElementsInWrapperWeatherHtml(date, icon, tepm, tempFeelsLike, windy, humidity, pressure, pop, nameOfCity) {
    // Отрисовывает данные в блоке погоды для выбранного дня

    const nameOfCityWeatherHtml = document.querySelector('.name-of-city');
    nameOfCityWeatherHtml.textContent = '';
    nameOfCityWeatherHtml.insertAdjacentHTML('beforeend', nameOfCity)

    const dateWeatherHtml = document.querySelector('.date-weather');
    dateWeatherHtml.textContent = '';
    dateWeatherHtml.insertAdjacentHTML('beforeend', getDateWeather(date));

    const iconWeatherHtml = document.querySelector('.img-weather');
    iconWeatherHtml.textContent = '';
    iconWeatherHtml.insertAdjacentHTML('beforeend', changeImgWeather(icon));

    const temperatureWeatherHtml = document.querySelector('.value-of-temperature');
    temperatureWeatherHtml.textContent = '';
    temperatureWeatherHtml.insertAdjacentHTML('beforeend', tepm + symbolDegreesCelsius);

    const temperatureFeelsLikeWeatherHtml = document.querySelector('.value-of-temperature-feels-like');
    temperatureFeelsLikeWeatherHtml.textContent = '';
    temperatureFeelsLikeWeatherHtml.insertAdjacentHTML('beforeend', tempFeelsLike + symbolDegreesCelsius);

    const windyWeatherHtml = document.querySelector('.value-of-windy');
    windyWeatherHtml.textContent = '';
    windyWeatherHtml.insertAdjacentHTML('beforeend', windy);

    const humidityWeatherHtml = document.querySelector('.value-of-humidity');
    humidityWeatherHtml.textContent = '';
    humidityWeatherHtml.insertAdjacentHTML('beforeend', humidity);

    const pressureWeatherHtml = document.querySelector('.value-of-pressure');
    pressureWeatherHtml.textContent = '';
    pressureWeatherHtml.insertAdjacentHTML('beforeend', pressure);

    const popWeatherHtml = document.querySelector('.value-of-pop');
    popWeatherHtml.textContent = '';
    popWeatherHtml.insertAdjacentHTML('beforeend', pop);
}

function findNextDays() {
    // Функция для определения следующих дней идущих после блока с актуальным днем

    const allBlocksFromCalendar = document.querySelectorAll('.block-date');
    // Переменная для добавления иконки облочка в календарь

    allBlocksFromCalendar.forEach((elem, index) => {
        if (elem.classList.contains('actual-day-in-month')) {

            // Добавлет иконку облачка для конкретных блоков с погодой
            allBlocksFromCalendar[index].insertAdjacentHTML('beforeend', iconWeatherInHtml);

            /*// Подкидывает блок подсказки к облаку
            allBlocksFromCalendar[index].insertAdjacentHTML('beforeend', hintBoxWeatherInHtml);*/

            allBlocksFromCalendar[index + 1].insertAdjacentHTML('beforeend', iconWeatherInHtml);
            allBlocksFromCalendar[index + 2].insertAdjacentHTML('beforeend', iconWeatherInHtml);
            allBlocksFromCalendar[index + 3].insertAdjacentHTML('beforeend', iconWeatherInHtml);
            allBlocksFromCalendar[index + 4].insertAdjacentHTML('beforeend', iconWeatherInHtml);

            firstNumberOfNextDay = allBlocksFromCalendar[index + 1].textContent;
            classesForFirstNumberOfNextDay = allBlocksFromCalendar[index + 1].className;

            secondNumberOfNextDay = allBlocksFromCalendar[index + 2].textContent;
            classesForSecondNumberOfNextDay = allBlocksFromCalendar[index + 2].className;

            thirdNumberOfNextDay = allBlocksFromCalendar[index + 3].textContent;
            classesForThirdNumberOfNextDay = allBlocksFromCalendar[index + 3].className;

            fourthNumberOfNextDay = allBlocksFromCalendar[index + 4].textContent;
            classesForFourthNumberOfNextDay = allBlocksFromCalendar[index + 4].className;
        }
    })
}

function appearanceAndDisappearancePopUp() {
//Стили для появления окна с погодой
    popupWeather.style.display = 'block';
    popupWeather.style.top = `${positionOfMouseY - 125}px`;
    popupWeather.style.left = `${positionOfMouseX - 100}px`;
    popupWeather.style.transition = '.2s';

    popupWeather.addEventListener('mouseleave', () => {
        popupWeather.style.display = 'none';
    })
}

function hintHover() {
    // Раскрытие подсказки при наведении на нее
    hintBox.addEventListener('mouseenter', () => {
        timerID = setTimeout(() => {
            hintBoxImgCloud.style.display = 'none';
            hintBoxDescriptionText.style.display = 'block';
        }, 1000);
        hintBox.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 50% 100%, 0 100%)';
        hintBox.style.width = '170px';
        hintBox.style.height = '100px';
        hintBoxDescriptionText.style.transition = 'display 1s linear 2s';

    })
    hintBox.addEventListener('mouseleave', () => {
        clearInterval(timerID);
        hintBox.style.width = '40px';
        hintBox.style.height = '50px';
        hintBox.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 50% 77%, 0 100%)';
        setTimeout(() => {
            hintBoxDescriptionText.style.display = 'none';
            hintBoxImgCloud.style.display = 'block';
        }, 0)
    })
}

function hoverWeather() {
// Функция отрабатывающая при наведение на блоки с погодой

    calendarWrapper.addEventListener('mouseover', (e) => {
        let elem = e.target;

        if (yearNow === trackYearOnCalendar && monthNow === trackMonthOnCalendar) {

            positionOfMouseX = e.pageX;
            positionOfMouseY = e.pageY;

            if (elem.classList.contains('actual-day-in-month')) {
                // appearanceAndDisappearancePopUp(elem);
                appearanceAndDisappearancePopUp();
                addDataToBlockWeather(dataApi, 0);
            } else if (elem.textContent === firstNumberOfNextDay && elem.className === classesForFirstNumberOfNextDay) {
                // appearanceAndDisappearancePopUp(elem);
                appearanceAndDisappearancePopUp();
                addDataToBlockWeather(dataApi, 1);
            } else if (elem.textContent === secondNumberOfNextDay && elem.className === classesForSecondNumberOfNextDay) {
                // appearanceAndDisappearancePopUp(elem);
                appearanceAndDisappearancePopUp();
                addDataToBlockWeather(dataApi, 2);
            } else if (elem.textContent === thirdNumberOfNextDay && elem.className === classesForThirdNumberOfNextDay) {
                // appearanceAndDisappearancePopUp(elem);
                appearanceAndDisappearancePopUp();
                addDataToBlockWeather(dataApi, 3);
            } else if (elem.textContent === fourthNumberOfNextDay && elem.className === classesForFourthNumberOfNextDay) {
                // appearanceAndDisappearancePopUp(elem);
                appearanceAndDisappearancePopUp();
                addDataToBlockWeather(dataApi, 4);
            }
        }
    })
}

function addDataToBlockWeather(api, index = 0) {
// Собираем данные из API и отрисовываем на странице

    dateForWeatherFirst = new Date((api.daily[index].dt * 1000));
    firstValueOfDay = dateForWeatherFirst.getDate();

    iconCurrentWeather = api.daily[index].weather[0].icon;
    temperatureCurrentWeather = Math.round(api.daily[index].temp.day);
    temperatureFeelsLikeWeather = Math.round(api.daily[index].feels_like.day);
    windyCurrentWeather = Math.round(api.daily[index].wind_speed);
    humidityCurrentWeather = api.daily[index].humidity;
    pressureCurrentWeather = Math.round(api.daily[index].pressure * 0.75);
    popCurrentWeather = Math.round(api.daily[index].pop * 100);

    renderElementsInWrapperWeatherHtml(
        dateForWeatherFirst,
        iconCurrentWeather,
        temperatureCurrentWeather,
        temperatureFeelsLikeWeather,
        windyCurrentWeather,
        humidityCurrentWeather,
        pressureCurrentWeather,
        popCurrentWeather,
        nameOfCityWeather)
}

async function showWeather(city = 'Mogilev') {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`)
        .then((response) => response.json())
        .then((data) => {



            nameOfCityWeather = data.name;
            let latitudeOfCity = data.coord.lat;
            let longitudeOfCity = data.coord.lon;
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitudeOfCity}&lon=${longitudeOfCity}&units=metric&exclude=minutely,hourly,alerts&appid=d2d35b6f5f8da4f517968aa7540b713d`)
        })
        .then((response) => response.json())
        .then((dataActual) => {
            dataApi = dataActual;
        })
        .catch((a) => {
            console.log(a)
            alert(`Упс! Что-то пошло не так. Возможно, Вы ввели несуществующий город :)`);

            (async function () {                                        // Проверка на наличие города в localStorage
                if(localStorage.hasOwnProperty('cityMemory')){
                    await showWeather(localStorage.getItem('cityMemory'));
                }
                else {
                    await showWeather();
                }
            })();

            // Обработка неправильно введенных данных
        })

    localStorage.removeItem('cityMemory');
    localStorage.setItem('cityMemory', city);                                // Добавление города в localStorage
}

function stopVideo() {
    // Кнопка play/stop фонового видео

    const btnVideo = document.querySelector('#my-btn');
    const videoBackground = document.querySelector('#myVideo');

    btnVideo.addEventListener('click', () => {
        if (videoBackground.paused) {
            videoBackground.play();
            btnVideo.innerHTML = "Stop video";
        } else {
            videoBackground.pause();
            btnVideo.innerHTML = "Play video";
        }
    })
}

function closeHintDescription() {
    // Кнопка закрывающая описания

    const btnCloseDescription = document.querySelector('.close-hint-box');
    const hintDescription = document.querySelector('.hint-box');

    btnCloseDescription.addEventListener('click', () => {
        hintDescription.style.display = 'none';
    })
}






createCalendar(yearNow, monthNow);

findNextDays();

hoverWeather();

changeMonth(monthNow);

stopVideo()

searchCity()
// Старые, иногда полезные, наработки
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