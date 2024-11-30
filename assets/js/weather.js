const weather = {
  container: document.querySelector('#weather'),
  icon: document.querySelector('#weather img'),
  desc: document.querySelector('#weather .desc'),
  temp: document.querySelector('#weather .temp'),
  time: document.querySelector('#weather .time')
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=52.251202&lon=-2.882980&units=metric&appid=5796abbde9106b7da4febfae8c44c232`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const weatherData = await response.json();

    weather.container.style.visibility = 'visible'
    weather.container.style.opacity = '1'
    weather.icon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    weather.desc.innerHTML = weatherData.weather[0].description;
    weather.temp.innerHTML = `${weatherData.main.temp}°c`;
  } catch (error) {
    console.error("Failed to fetch weather data:", error.message);
    throw error;
  }
}
getWeather()


function setTime() {
  time = new Intl.DateTimeFormat('en-GB', {timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit'});
  splittime = time.format(new Date()).split(':');
  splittimehtml = `${splittime[0]}<span class='colon'>:</span>${splittime[1]}`;
  weather.time.innerHTML = `${splittimehtml} <span class='tz'>(GMT)</span>`;
}
setTime()
setInterval(() => {
  setTime()
}, 10000);