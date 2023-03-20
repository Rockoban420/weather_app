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
var counter = 0;

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
  var current = true;
  fetch(requestUrl)
    .then(function (response) {
      if (response.status === 404) {
        current = false;
        let keys = Object.keys(citiesList)
        if (counter<1) {
        delete citiesList[keys[keys.length-1]];
        counter++;  
        }
        console.log (citiesList);
        localStorage.setItem("cities", JSON.stringify(citiesList));
      }
      else {
      return response.json();
      }
    })
    .then(function (data) {
      if (current===false) {
      window.alert ('Error 404 city not found');
      cityButton.removeChild(lastElementChild);
      return;
      }
      placeholder.text  ('');
      var cityName = data.name;
      let currentTempR = data.main.temp;
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
      var requestUrl3 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&id=524901&appid=d6c6f2f334d8420a6173b353ed5724d3`;
      fetch(requestUrl3)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let currentTempR;
        let currentWind;
        let humidityV;
        for (let i = 0 ; i < data.list.length; i++) {
          var currentITime = data.list[i].dt_txt;
          let myDateArr2 = currentITime.split(' ');
          if (myDateArr2[1] == '12:00:00') {
            list = i;
            i = data.list.length;
            console.log (myDateArr2);
          }
        }
        for (let i = 1; i <= cardEl.length; i++){
          let currentCardEl = $(`#${i}`);
          let iconEl2 = document.createElement ('img');
          currentWind = data.list[list].wind.speed;
          currentTempR = data.list[list].main.temp;
          humidityV = data.list[list].main.humidity;
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
let requestUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${Object.keys(citiesList)[0]}&units=imperial&id=524901&appid=d6c6f2f334d8420a6173b353ed5724d3`;
getCurrentW (requestUrl1);
} else {
  placeholder.text ('Current Day Forecast');
};

buttonEl.on('click', function () {
  let currentCityName = inputEl.val();
  citiesList[currentCityName] = 1;
  localStorage.setItem("cities", JSON.stringify(citiesList));
  let requestUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&units=imperial&id=524901&appid=d6c6f2f334d8420a6173b353ed5724d3`;
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
  let requestUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&units=imperial&id=524901&appid=d6c6f2f334d8420a6173b353ed5724d3`;
  getCurrentW (requestUrl2);
});