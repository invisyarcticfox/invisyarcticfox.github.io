async function getData() {
  // https://gist.github.com/lalithabacies/c8f973dc6754384d6cade282b64a8cb1 hehehe not exposing my own api key today
  const url = "https://api.openweathermap.org/data/2.5/weather?lat=52.251202&lon=-2.882980&units=metric&appid=bd5e378503939ddaee76f12ad7a97608";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const w = await response.json();

    document.querySelector('#weather img').src = `https://openweathermap.org/img/wn/${w.weather.filter(m => m.length != '1').shift().icon}@2x.png`
    document.querySelector('#weather .desc').innerHTML = w.weather.filter(m => m.length != '1').shift().description
    document.querySelector('#weather .temp').innerHTML = `${w.main.temp}°C`
    // idk what the filter thing is i just know it works and it gets around the stupid weather.0 in the original json
    // also for the record the "name" in the json is NOT my town so the weather might be off at times, i just didnt wanna dox myself :(
  } catch (error) {
    console.error(error.message);
  }
}
getData()


hour = new Intl.DateTimeFormat('en-GB', {timeZone: 'Europe/London', hour: '2-digit'});
minute = new Intl.DateTimeFormat('en-GB', {timeZone: 'Europe/London', minute: '2-digit'});
document.querySelector('#weather .time .hour').innerHTML = hour.format(new Date())
document.querySelector('#weather .time .minute').innerHTML = minute.format(new Date())



// this one is from w3schools
// it counts up time automatically
// but doesnt have timezone so ew

//function startTime() {
//  const today = new Date();
//  let h = today.getHours();
//  let m = today.getMinutes();
//  m = checkTime(m);
//  document.querySelector('#weather .time .hour').innerHTML =  h;
//  document.querySelector('#weather .time .minute').innerHTML =  m;
//  setTimeout(startTime, 1000);
//}
//
//function checkTime(i) {
//  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
//  return i;
//}
// onload="startTime()"