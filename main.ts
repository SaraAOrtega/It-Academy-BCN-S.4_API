document.addEventListener("DOMContentLoaded", function() {

        const printJoke = document.querySelector('.jokeContainer') as HTMLElement;
        const buttonNext = document.querySelector (".next") as HTMLElement; 
        const temperatura = document.querySelector('.temp') as HTMLElement;
        const icon = document.querySelector('.icon') as HTMLImageElement;
        const kelvin = 273.15;
    
        async function getWeather() {
            try {
                const response = await fetch("https://api.openweathermap.org/data/2.5/weather?id=3128760&appid=875770920f08a7b78f84c8e18125c6dc");
                const weatherData = await response.json();
    
                //imprimir en pantalla
                temperatura.textContent = Math.floor(weatherData.main.temp - kelvin) + "ºC";
                const iconCode = weatherData.weather[0].icon;
                 icon.setAttribute('src', `http://openweathermap.org/img/wn/${iconCode}@2x.png`);
                } catch (error) {
                console.error('Error fetching weather:', error);
            }
        }
    
        getWeather();
   
        async function getDadJoke() {
            try {
                const response = await fetch("https://icanhazdadjoke.com/", {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data.joke);
                return data.joke; 
            } catch (error) {
                console.error('Error fetching joke:', error);
            }
        }
    
        async function getChuckJoke() {
            try {
                const response = await fetch("https://api.chucknorris.io/jokes/random", {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data.value);
                return data.value; 
            } catch (error) {
                console.error('Error fetching joke:', error);
            }
        }
    
        async function getJoke() {
            if (printJoke) {
                const numRandom = Math.floor(Math.random() * 2); 
                const joke = numRandom === 0 ? await getDadJoke() : await getChuckJoke();
                printJoke.innerHTML = joke;
            }
        }
    
        if (buttonNext) {
            buttonNext.addEventListener('click', getJoke);
        }
        
        getJoke();

    //Array report

    interface JokeReport {
    joke: string;
    score: number;
    date: string;
    }

    let jokeReport: JokeReport[] = [];

    function addScore(jokeText: string, score: number): void {
    const index = jokeReport.findIndex((item) => item.joke === jokeText);

    if (index !== -1) {
    jokeReport[index].score = score;
    jokeReport[index].date = new Date().toISOString();
    } else {
    const report: JokeReport = {
        joke: jokeText,
        score: score,
        date: new Date().toISOString(),
    };
    jokeReport.push(report);
    }
    console.log(jokeReport);
    }

    const jokeTextElement = document.querySelector('.jokeContainer') as HTMLElement;

    document.getElementById('score1')?.addEventListener('click', () => addScore(jokeTextElement.innerText, 1));
    document.getElementById('score2')?.addEventListener('click', () => addScore(jokeTextElement.innerText, 2));
    document.getElementById('score3')?.addEventListener('click', () => addScore(jokeTextElement.innerText, 3));
});