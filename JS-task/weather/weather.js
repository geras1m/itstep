let weather = document.querySelector('.weather');

let linkMainPageMail = 'https://mail.ru/?utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=mail.ru&mt_click_id=mt-ds8xq6-1652626776-1984622503&mt_sub1=pogoda.mail.ru';
let linkMail = 'https://account.mail.ru/login?page=https%3A%2F%2Fe.mail.ru%2Fmessages%2Finbox%3Futm_source%3Dportal%26utm_medium%3Dnew_portal_navigation%26utm_campaign%3De.mail.ru%26mt_sub5%3D36%26mt_sub1%3Dmail.ru%26mt_click_id%3Dmt-y7s979-1652728966-2391393454&allow_external=1&from=octavius';
let linkCloud = 'https://cloud.mail.ru/?utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=cloud.mail.ru&mt_sub5=36&mt_sub1=mail.ru&mt_click_id=mt-pqaft6-1652728979-84093317';
let linkSocialNetworkClassmates = 'https://ok.ru/?mt_sub5=36&mt_sub1=mail.ru&mt_click_id=mt-koydy6-1652728990-3724490173';
let linkSocialNetworkVK = 'https://vk.com/';
let linkNews = 'https://news.mail.ru/?utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=news.mail.ru&mt_sub5=36&mt_sub1=mail.ru&mt_click_id=mt-curxh8-1652729053-954414224';
let linkSearch = 'https://go.mail.ru/?utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=go.mail.ru&mt_sub5=36&mt_sub1=news.mail.ru&mt_click_id=mt-h0c140-1652729065-3553585952';
let linkAcquaintances = 'https://love.mail.ru/ru?utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=love.mail.ru&mt_sub5=36&mt_sub1=go.mail.ru&mt_click_id=mt-k9iu14-1652729079-1096571841';
let linkMyWorld = 'https://my.mail.ru/?from=whiteline&utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=my.mail.ru&mt_sub5=36&mt_sub1=mail.ru&mt_click_id=mt-v6h9q7-1652729092-1463186944';
let linkGames = 'https://games.mail.ru/?utm_source=portal&utm_medium=new_portal_navigation&utm_campaign=games.mail.ru&mt_sub5=36&mt_sub1=mail.ru&mt_click_id=mt-pllim0-1652729102-4133023122';
let linkLogin = 'https://account.mail.ru/signup?from=navi&lang=ru_RU&siteid=169&app_id_mytracker=58519';
let linkNewsOfWeather = 'https://pogoda.mail.ru/news/';
let inputValue;
let btnSearch;
let symbol = '+';
let longitude;
let latitude;
let msSunrise;
let msSunset;
let dataSet;
let dataRise;
let dayOfWeekDateSecond;
let dayOfWeekDateThird;
let dayOfWeekDateFourth;
let dayOfWeekDateFifth;
let addImgPressure = '<img src="pressure-meter-svgrepo-com.svg" alt="">';
let addImgHumidity = '<img src="humidity.svg" alt="">';
let addImgWind = '<img src="wind.svg" alt="">';
let addImgSunrise = '<img src="sunrise.svg" alt="">';
let addImgSunset = '<img src="sunset.svg" alt="">';
let arrAllValue = [];
let arrHasDateForWeatherFiveDays = [];
let indexInArr = [];
let text;

let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
};
let dataNow = (new Date()).toLocaleString('ru', options);     //Вывод даты на сегодняшний день

function renderHtml(weatherObj, weatherObjAdditionalData, weatherObjFiveDays) {
    let html = `
<div class="menu">
    <div class="menu-item">
        <a class="item item-mail" target="_blank" href="${linkMainPageMail}">
            Mail.ru
        </a>
        <a class="item" target="_blank" href="${linkMail}">
            Почта
        </a>
        <a class="item" target="_blank" href="${linkCloud}">
            Облако
        </a>
        <a class="item" target="_blank" href="${linkSocialNetworkClassmates}">
            Однаклассники
        </a>
        <a class="item" target="_blank" href="${linkSocialNetworkVK}">
            Вконтакте 
        </a>
        <a class="item" target="_blank" href="${linkNews}">
            Новости
        </a>
        <a class="item" target="_blank" href="${linkSearch}">
            Поиск
        </a>
        <a class="item" target="_blank" href="${linkAcquaintances}">
            Знакомства
        </a>
        <a class="item" target="_blank" href="${linkMyWorld}">
            Мой мир
        </a>
        <a class="item" target="_blank" href="${linkGames}">
            Игры
        </a>
    </div>
    <a class="menu-login" target="_blank" href="${linkLogin}" >
           Login
    </a>
</div>
<div class="wrapper-input">
    <a class="input-text" href="${linkMainPageMail}" target="_blank">
        ПОГОДА
    </a>
    <input type="text" name="city" class="input-city" placeholder="Поиск города">
    <button class="btn">
        <img src="lupa-svg.svg" alt="">
    </button>
</div>
<div class="wrapper-black">
    <a class="news-of-weather" href="${linkNewsOfWeather}" target="_blank">
    Новости погоды
    </a>
</div>
<div class="wrapper-weather">
     <div class="wrapper-first">
        <div class="weather-head">
            <p class="weather-city"> 
                Прогноз погоды в ${weatherObj.name}, ${weatherObj.sys.country}
            </p>
            <p class="data-now">
                сегодня ${dataNow}
            </p>
        </div>
        <div class="wrapper-gif-value">
            <div class="gif">
                <img src="${changeGif(weatherObj.weather[0].icon)}" alt="">
            </div>
            <div class="value">
                ${symbol}${Math.round(weatherObj.main.temp - 273.15)}<split>&#176;</split>
            </div>
            <div class="description">
                ${weatherObj.weather[0].description}
            </div>
        </div>
        <p class="feeling">
            <span>
                ощущается как
            </span> 
            ${symbol}${Math.round(weatherObj.main.feels_like - 273.15)}
            <split>
                &#176;
            </split>C 
        </p>
    </div>
    <div class="wrapper-second">
        <div class="additional-description pressure">
            ${addImgPressure}
            ${Math.round(weatherObj.main.pressure * 0.75)} мм.рт.ст
        </div>
        <div class="additional-description humidity">
            ${addImgHumidity}
            ${weatherObj.main.humidity} %
        </div>
        <div class="additional-description wind-speed">
            ${addImgWind}
            ${weatherObj.wind.speed} м/с
        </div>
        <div class="additional-description uvi">
            <span class="uv">uv </span>  ${weatherObjAdditionalData.current.uvi}
        </div>
        <div class="additional-description sunrise-sunset">
            <span class="sunrise">
                ${addImgSunrise}
                ${dataRise}
            </span> 
            <span class="sunset">
                ${addImgSunset}
                ${dataSet}
            </span>
        </div>
    </div>
</div>

<div class="wrapper-weather-5-days">
        <div class="day">
            <div class="day-titl">
                Завтра 
            </div>
            <div class="day-img">
                <img src="${changeGif(weatherObjFiveDays.list[indexInArr[0]].weather[0].icon)}" alt="">
            </div>
            <div class="day-temperatura">
                ${symbol}${Math.round(weatherObjFiveDays.list[indexInArr[0]].main.temp - 273.15)}<split>&#176;</split>
            </div>
            <div class="day-description">
                ${weatherObjFiveDays.list[indexInArr[0]].weather[0].description}
            </div>
            <div>
                <div class="day-pressure">
                    ${addImgPressure}
                    ${Math.round(weatherObjFiveDays.list[indexInArr[0]].main.pressure * 0.75)} мм.рт.ст
                </div>
                <div class="day-humidity">
                    ${addImgHumidity}
                    ${weatherObjFiveDays.list[indexInArr[0]].main.humidity} %
                </div>
                <div class="day-wind">
                    ${addImgWind}
                    ${weatherObjFiveDays.list[indexInArr[0]].wind.speed} м/с
                </div>
            </div>
        </div>
        <div class="day">
            <div class="day-titl">
                ${dayOfWeekDateSecond}
            </div>
            <div class="day-img">
                <img src="${changeGif(weatherObjFiveDays.list[indexInArr[1]].weather[0].icon)}" alt="">
            </div>
            <div class="day-temperatura">
                ${symbol}${Math.round(weatherObjFiveDays.list[indexInArr[1]].main.temp - 273.15)}<split>&#176;</split>
            </div>
            <div class="day-description">
                ${weatherObjFiveDays.list[indexInArr[1]].weather[0].description}
            </div>
            <div>
                <div class="day-pressure">
                    ${addImgPressure}
                    ${Math.round(weatherObjFiveDays.list[indexInArr[1]].main.pressure * 0.75)} мм.рт.ст    
                </div>
                <div class="day-humidity">
                    ${addImgHumidity}
                    ${weatherObjFiveDays.list[indexInArr[1]].main.humidity} %
                </div>
                <div class="day-wind">
                    ${addImgWind}
                    ${weatherObjFiveDays.list[indexInArr[1]].wind.speed} м/с
                </div>
            </div>
        </div>
        <div class="day">
            <div class="day-titl">
                ${dayOfWeekDateThird}
            </div>
            <div class="day-img">
                <img src="${changeGif(weatherObjFiveDays.list[indexInArr[2]].weather[0].icon)}" alt="">
            </div>
            <div class="day-temperatura">
                ${symbol}${Math.round(weatherObjFiveDays.list[indexInArr[2]].main.temp - 273.15)}<split>&#176;</split>
            </div>
            <div class="day-description">
                ${weatherObjFiveDays.list[indexInArr[2]].weather[0].description}
            </div>
            <div>
                <div class="day-pressure">
                    ${addImgPressure}
                    ${Math.round(weatherObjFiveDays.list[indexInArr[2]].main.pressure * 0.75)} мм.рт.ст
                </div>
                <div class="day-humidity">
                    ${addImgHumidity}
                    ${weatherObjFiveDays.list[indexInArr[2]].main.humidity} %
                </div>
                <div class="day-wind">
                    ${addImgWind}
                    ${weatherObjFiveDays.list[indexInArr[2]].wind.speed} м/с
                </div>
            </div>
        </div>
        <div class="day">
            <div class="day-titl">
                ${dayOfWeekDateFourth}
            </div>
            <div class="day-img">
                <img src="${changeGif(weatherObjFiveDays.list[indexInArr[3]].weather[0].icon)}" alt="">
            </div>
            <div class="day-temperatura">
                ${symbol}${Math.round(weatherObjFiveDays.list[indexInArr[3]].main.temp - 273.15)}<split>&#176;</split>
            </div>
            <div class="day-description">
                ${weatherObjFiveDays.list[indexInArr[3]].weather[0].description}
            </div>
            <div>
                <div class="day-pressure">
                    ${addImgPressure}
                    ${Math.round(weatherObjFiveDays.list[indexInArr[3]].main.pressure * 0.75)} мм.рт.ст
                </div>
                <div class="day-humidity">
                    ${addImgHumidity}
                    ${weatherObjFiveDays.list[indexInArr[3]].main.humidity} %
                </div>
                <div class="day-wind">
                    ${addImgWind}
                    ${weatherObjFiveDays.list[indexInArr[3]].wind.speed} м/с
                </div>
            </div>
        </div>
        <div class="day">
            <div class="day-titl">
                ${dayOfWeekDateFifth}
            </div>
            <div class="day-img">
                <img src="${changeGif(weatherObjFiveDays.list[indexInArr[4]].weather[0].icon)}" alt="">
            </div>
            <div class="day-temperatura">
                ${symbol}${Math.round(weatherObjFiveDays.list[indexInArr[4]].main.temp - 273.15)}<split>&#176;</split>
            </div>
            <div class="day-description">
                ${weatherObjFiveDays.list[indexInArr[4]].weather[0].description}
            </div>
            <div>
                <div class="day-pressure">
                    ${addImgPressure}
                    ${Math.round(weatherObjFiveDays.list[indexInArr[4]].main.pressure * 0.75)} мм.рт.ст
                </div>
                <div class="day-humidity">
                    ${addImgHumidity}
                    ${weatherObjFiveDays.list[indexInArr[4]].main.humidity} %
                </div>
                <div class="day-wind">
                    ${addImgWind}
                    ${weatherObjFiveDays.list[indexInArr[4]].wind.speed} м/с
                </div>
            </div>
        </div>
    </div>
`;
    weather.insertAdjacentHTML('beforeend', html);

    inputValue = document.querySelector('.input-city');
    btnSearch = document.querySelector('.btn');
    btnSearch.addEventListener('click', () => {
        let newCity = inputValue.value;
        if (!newCity) return;
        (async function () {
            await getCityNew(newCity);
        })();
    });
}

async function getCityNew(city = 'Mogilev') {
    let data1;
    let data2;
    let data3;
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`)
        .then((response) => response.json())
        .then((data) => {
            data1 = data;
            longitude = data1.coord.lon;   // Долгота
            latitude = data1.coord.lat;    // Широта
            msSunrise = data1.sys.sunrise;
            msSunset = data1.sys.sunset;
            getSunriseAndSunset(msSunrise, msSunset);
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru\``)
        })
        .catch( () => {
            alert('Упс! Что-то пошло не так. Возможно, был введен несуществующий город :)')
            // Обработка неправильно введенных данных

        })
        .then((response) => response.json())
        .then((data) => {
            data2 = data;
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`)
        })
        .then((response) => response.json())
        .then((data) => {
            data3 = data;

            getInformationForWeatherFiveDays(data3)
            getDateForWeatherFiveDays(arrHasDateForWeatherFiveDays)

            console.log(indexInArr);
            console.log(arrHasDateForWeatherFiveDays);

        })
        .then(() => {

            symbol = getPlusOrMinus(data1);
            weather.textContent = '';             // Обновляет в самом конце, чтобы в случае некорректного
            renderHtml(data1, data2, data3)       // ввода данных в input он не удалял содержимое из страницы
        })
}

(async function () {
    await getCityNew();
})();

function getDateForWeatherFiveDays(date){
    // Вывод даты для прогноза на пять дней

    let options = {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
    };
    dayOfWeekDateSecond = (new Date(date[1])).toLocaleString('ru', options);
    dayOfWeekDateThird = (new Date(date[2])).toLocaleString('ru', options);
    dayOfWeekDateFourth = (new Date(date[3])).toLocaleString('ru', options);
    dayOfWeekDateFifth = (new Date(date[4])).toLocaleString('ru', options);
}

function getInformationForWeatherFiveDays(obj){
    // Учитывает обновление времени в промисе т.е. объекты внутри соответствующие
    // определенному вермени при обновлении погоды находятся в рвзных позициях этого промиса

    for (let i = 0; i < obj.list.length; i++){
        arrAllValue.push(obj?.list[i]?.dt_txt)
    }
    console.log(arrAllValue)

    for (let j = 0; j < arrAllValue.length; j++){
        text = arrAllValue[j];
        let isText = text.indexOf('15:00:00');
        if(isText >= 0){
            indexInArr.push(arrAllValue.indexOf(arrAllValue[j]));
            arrHasDateForWeatherFiveDays.push(arrAllValue[j]);
        }
    }
}

function getSunriseAndSunset(sunrise, sunset) {
    let optionsSunriseSunset = {
        hour: 'numeric',
        minute: 'numeric',
    };
    dataRise = (new Date(sunrise * 1000)).toLocaleString('ru', optionsSunriseSunset);    //Вывод времени восхода солнца
    dataSet = (new Date(sunset * 1000)).toLocaleString('ru', optionsSunriseSunset);     //Вывод времени захода солнца
}

function changeGif(codeOfIcon) {
    // Изменение GIF/img у погоды

    return `http://openweathermap.org/img/wn/${codeOfIcon}@2x.png`;
}

function getPlusOrMinus(data) {
    // Изменение знака у значения температуры

    let temp = data.main.temp - 273.15;
    if (temp > 0) {
        return '+';
    } else if (temp <= 0) {
        return ''
    }
}





/*function getDayOfWeek(dayMS) {//Вывод даты и дня недели (среда,18.05)
    let optionsDayOfWeek = {
        weekday: 'short',
    };
    let optionsDayOfWeekDate = {
        day: 'numeric',
        month: 'numeric',
    };                                          // Скорей всего карявенько, но додумался только до такого :)
                                                // Вывод даты для прогноза на несколько дней

    dayOfWeekFirst = (new Date(dayMS * 1000)).toLocaleString('ru', optionsDayOfWeek);
    dayOfWeekDateFirst = (new Date(dayMS * 1000)).toLocaleString('ru', optionsDayOfWeekDate);
    dayOfWeekSecond = (new Date(dayMS * 1000 + 864 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeek);
    dayOfWeekDateSecond = (new Date(dayMS * 1000 + 864 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeekDate);
    dayOfWeekThird = (new Date(dayMS * 1000 + 1728 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeek);
    dayOfWeekDateThird = (new Date(dayMS * 1000 + 1728 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeekDate);
    dayOfWeekFourth = (new Date(dayMS * 1000 + 2592 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeek);
    dayOfWeekDateFourth = (new Date(dayMS * 1000 + 2592 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeekDate);
    dayOfWeekFifth = (new Date(dayMS * 1000 + 3456 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeek);
    dayOfWeekDateFifth = (new Date(dayMS * 1000 + 3456 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeekDate);
}*/

/*function getDayOfWeek(dayMS) {

// Даты работают не правильно в прогнозе на 5 дней
// и соответственно погода т.к. в получаемом промисе
// позиции с данными динамически обновляются
//
// Часовой пояс не учитывает


    let optionsDayOfWeek = {
        weekday: 'short',
    };
    let optionsDayOfWeekDate = {
        day: 'numeric',
        month: 'numeric',
    };

    dayOfWeekFirst = (new Date(dayMS * 1000)).toLocaleString('ru', optionsDayOfWeek);
    dayOfWeekDateFirst = (new Date(dayMS * 1000)).toLocaleString('ru', optionsDayOfWeekDate);
    dayOfWeekSecond = (new Date(dayMS * 1000 + 864 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeek);
    dayOfWeekDateSecond = (new Date(dayMS * 1000 + 864 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeekDate);
    dayOfWeekThird = (new Date(dayMS * 1000 + 1728 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeek);
    dayOfWeekDateThird = (new Date(dayMS * 1000 + 1728 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeekDate);
    dayOfWeekFourth = (new Date(dayMS * 1000 + 2592 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeek);
    dayOfWeekDateFourth = (new Date(dayMS * 1000 + 2592 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeekDate);
    dayOfWeekFifth = (new Date(dayMS * 1000 + 3456 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeek);
    dayOfWeekDateFifth = (new Date(dayMS * 1000 + 3456 * 10 ** 5)).toLocaleString('ru', optionsDayOfWeekDate);
}*/

/*
// Рабочий код, только выше написан код через цепочку промисов

async function getCity(city = 'Mogilev') {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`);
    const data = await response.json();

    longitude = data.coord.lon;   // Долгота
    latitude = data.coord.lat;    // Широта
    msSunrise = data.sys.sunrise;
    msSunset = data.sys.sunset;
    getSunriseAndSunset(msSunrise, msSunset);

    const responseAdditionalData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`);
    const dataAdditionalData = await responseAdditionalData.json();

    const responseFiveDays = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`)
    const dataFiveDays = await responseFiveDays.json();
    dayOfWeekFirst = dataFiveDays.list[1].dt;
    dayOfWeekSecond = dataFiveDays.list[2].dt;

    getDayOfWeek(dayOfWeekFirst);
    symbol = getPlusOrMinus(data);
    renderHtml(data, dataAdditionalData, dataFiveDays);
}

(async function () {
    await getCity();
})();
*/

/*function getCityNew(city = 'Mogilev') {             // Zhenya's code
    let data1;
    let data2;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`)
        .then((response) => response.json())
        .then((data) => {
            data1 = data;
            return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`)
        })
        .then((response) => response.json())
        .then((data) => {
            data2 = data;
        })
        .then(() => {
            let result = data1 + data2;
        })
}

*/

/*function showWeather() {                                // My code
    let data;
    // let dataFiveDays;

    const request = new XMLHttpRequest();
    let cityDefault = 'Mogilev';
    request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityDefault}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`);
    request.send();
    request.addEventListener('load', () => {
        data = JSON.parse(request.responseText);
        symbol = getPlusOrMinus(data);
        renderHtml(data);

        // const inputValue = document.querySelector('.input-city');
        // const btnSearch = document.querySelector('.btn');

        /!*btnSearch.addEventListener('click', (e) => {
            console.log(e.target);
            let newCity = inputValue.value;
            if(newCity !==''){
            weather.textContent = '';

            request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=d2d35b6f5f8da4f517968aa7540b713d&lang=ru`);
            request.send();
            request.addEventListener('load',()=>{
                let dataNew = JSON.parse(request.responseText);
                renderHtml(dataNew);
            })
            }
        });*!/
    })
}*/
// showWeather()



