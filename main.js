"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", function () {
    var _a, _b, _c;
    const printJoke = document.querySelector('.jokeContainer');
    const buttonNext = document.querySelector(".next");
    const temperatura = document.querySelector('.temp');
    const icon = document.querySelector('.icon');
    const kelvin = 273.15;
    function getWeather() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("https://api.openweathermap.org/data/2.5/weather?id=3128760&appid=875770920f08a7b78f84c8e18125c6dc");
                const weatherData = yield response.json();
                //imprimir en pantalla
                temperatura.textContent = Math.floor(weatherData.main.temp - kelvin) + "ºC";
                const iconCode = weatherData.weather[0].icon;
                icon.setAttribute('src', `http://openweathermap.org/img/wn/${iconCode}@2x.png`);
            }
            catch (error) {
                console.error('Error fetching weather:', error);
            }
        });
    }
    getWeather();
    function getDadJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("https://icanhazdadjoke.com/", {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = yield response.json();
                console.log(data.joke);
                return data.joke;
            }
            catch (error) {
                console.error('Error fetching joke:', error);
            }
        });
    }
    function getChuckJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("https://api.chucknorris.io/jokes/random", {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = yield response.json();
                console.log(data.value);
                return data.value;
            }
            catch (error) {
                console.error('Error fetching joke:', error);
            }
        });
    }
    function getJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            if (printJoke) {
                const numRandom = Math.floor(Math.random() * 2);
                const joke = numRandom === 0 ? yield getDadJoke() : yield getChuckJoke();
                printJoke.innerHTML = joke;
            }
        });
    }
    if (buttonNext) {
        buttonNext.addEventListener('click', getJoke);
    }
    getJoke();
    let jokeReport = [];
    function addScore(jokeText, score) {
        const index = jokeReport.findIndex((item) => item.joke === jokeText);
        if (index !== -1) {
            jokeReport[index].score = score;
            jokeReport[index].date = new Date().toISOString();
        }
        else {
            const report = {
                joke: jokeText,
                score: score,
                date: new Date().toISOString(),
            };
            jokeReport.push(report);
        }
        console.log(jokeReport);
    }
    const jokeTextElement = document.querySelector('.jokeContainer');
    (_a = document.getElementById('score1')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => addScore(jokeTextElement.innerText, 1));
    (_b = document.getElementById('score2')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => addScore(jokeTextElement.innerText, 2));
    (_c = document.getElementById('score3')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => addScore(jokeTextElement.innerText, 3));
});
