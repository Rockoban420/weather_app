
var responseText = document.getElementById('response-text');
var buttonEl = $('#searchButton');
var inputEl = $('#cityName');
var citiesListEl = $('#citiesList');
var dayWeather = $('#currentForecast');
var placeholder = $('#placeholder');
var citiesList = JSON.parse(localStorage.getItem("cities")) ?? {};
var cityNameEl = document.createElement ('h1');
var iconEl = document.createElement ('img');
var tempEl = document.createElement ('p');
var windEl = document.createElement ('p');
var humidityEl = document.createElement ('p');
var cardEl = $('.card');
var list = 3;

var appendCities = function () {
  for (const key in citiesList) {
    var cityButton = document.createElement('button');
    cityButton.innerHTML = key;
    cityButton.setAttribute('class', 'd-flex');
    cityButton.setAttribute('id', 'cityID');
    cityButton.setAttribute('style', 'margin-left: 2%; justify-content: center; margin-top: 2%; width: 65%;')
    citiesListEl.append(cityButton);
  }
};

function getCurrentW(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      if (response.status === 404) {
        return false;
      }
      else {
      return response.json();
      }
    })
    .then(function (data) {
      placeholder.text  ('');
      var cityName = data.name;
      let currentTempK = data.main.temp;
      let currentTempN = (currentTempK-273.15) * 1.8 + 32;
      let currentTempR = Math.floor(currentTempN);
      let currentWind = data.wind.speed;
      let humidityV = data.main.humidity;
      cityNameEl.innerHTML = '';
      iconEl.src = '';
      tempEl.innerHTML = '';
      iconEl.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      iconEl.setAttribute ('class' , 'd-inline');
      cityNameEl.textContent = 'Todays forecast for the city of ' + cityName;
      cityNameEl.setAttribute ('class', 'd-inline');
      dayWeather.append (cityNameEl);
      dayWeather.append (iconEl);
      tempEl.setAttribute ('style', 'margin-left: 2%;');
      tempEl.textContent = 'Current Temperature: ' + currentTempR + 'F';
      windEl.setAttribute ('style', 'margin-left: 2%;');
      windEl.textContent = 'Current Wind Speed: ' + currentWind + 'MPH';
      humidityEl.setAttribute ('style', 'margin-left: 2%;');
      humidityEl.textContent = 'Current Humidity: ' + humidityV + '%';
      dayWeather.append (tempEl);
      dayWeather.append (windEl);
      dayWeather.append (humidityEl);
      var requestUrl3 = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&id=524901&appid=d6c6f2f334d8420a6173b353ed5724d3`;
      fetch(requestUrl3)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let currentTempK;
        let currentWind;
        let humidityV;
        list = 3;
        for (let i = 1; i <= cardEl.length; i++){
          let currentCardEl = $(`#${i}`);
          let iconEl2 = document.createElement ('img');
          currentWind = data.list[list].wind.speed;
          currentTempK = data.list[list].main.temp;
          humidityV = data.list[list].main.humidity;
          let currentTempN = (currentTempK-273.15) * 1.8 + 32;
          let currentTempR = Math.floor(currentTempN);
          iconEl2.src = `https://openweathermap.org/img/w/${data.list[list].weather[0].icon}.png`;
          let currentDate = data.list[list].dt_txt;
          let myDateArr = currentDate.split(' ');
          currentCardEl[0].children[0].children[0].innerText = myDateArr[0];
          currentCardEl[0].children[0].children[0].append (iconEl2);
          currentCardEl[0].children[0].children[1].innerText = `Temp: ${currentTempR}°F\n`;
          currentCardEl[0].children[0].children[1].innerText += `Wind: ${currentWind}mph\n`;
          currentCardEl[0].children[0].children[1].innerText += `Humidity: ${humidityV}%`;
          list = list + 8;
        }
        });
  });
};

appendCities();
if (Object.keys(citiesList)[0]){
let requestUrl1 = `http://api.openweathermap.org/data/2.5/weather?q=${Object.keys(citiesList)[0]}&id=524901&appid=d6c6f2f334d8420a6173b353ed5724d3`;
getCurrentW (requestUrl1);
} else {
  placeholder.text ('Current Day Forecast');
};

buttonEl.on('click', function () {
  let currentCityName = inputEl.val();
  citiesList[currentCityName] = 1;
  localStorage.setItem("cities", JSON.stringify(citiesList));
  let requestUrl2 = `http://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&id=524901&appid=d6c6f2f334d8420a6173b353ed5724d3`;
  getCurrentW (requestUrl2);
  var cityButton = document.createElement('button');
  cityButton.innerHTML = currentCityName;
  cityButton.setAttribute('class', 'd-flex');
  cityButton.setAttribute('id', 'cityID');
  cityButton.setAttribute('style', 'margin-left: 2%; justify-content: center; margin-top: 2%; width: 65%;')
  citiesListEl.append(cityButton);
});



citiesListEl.on ('click' , function(event){
  let currentCityName = event.target.innerHTML;
  let requestUrl2 = `http://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&id=524901&appid=d6c6f2f334d8420a6173b353ed5724d3`;
  getCurrentW (requestUrl2);
});
