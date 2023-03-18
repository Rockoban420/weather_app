
var responseText = document.getElementById('response-text');
var buttonEl = $('#searchButton');
var inputEl = $('#cityName');
var citiesListEl = $('#citiesList');
var dayWeather = $('#currentForecast');
var citiesList = JSON.parse(localStorage.getItem("cities")) ?? {};

var appendCities = function () {
  for (const key in citiesList) {
    var cityButton = document.createElement('button');
    cityButton.innerHTML = key;
    cityButton.setAttribute('class', 'd-flex');
    cityButton.setAttribute('style', 'margin-left: 2%; justify-content: center; margin-top: 2%; width: 65%;')
    citiesListEl.append(cityButton);
  }
};

function getCurrentW(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log (response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var cityName = data.name;
      var currentTempK = data.main.temp;
      var currentTempN = (currentTempK-273.15) * 1.8 + 32;
      var currentTempR = Math.floor(currentTempN);
      let cityNameEl = document.createElement ('h1');
      var iconEl = document.createElement ('img');
      iconEl.src = 'https://openweathermap.org/img/w/10d.png'
      cityNameEl.textContent = 'Todays forecast for the city of ' + cityName;
      dayWeather.append (cityNameEl);
      let tempEl = document.createElement ('p');
      tempEl.setAttribute ('style', 'margin-left: 2%;');
      tempEl.textContent = 'Current Temperature: ' + currentTempR + 'F';
      dayWeather.append (tempEl);
    })
};

function displayWeather () {
  let cityNameEl = document.createElement ('h1');
  cityNameEl.textContent = 'Todays forecast for the city of ' + cityName;
  dayWeather.append (cityNameEl);
  let tempEl = document.createElement ('p');
  tempEl.textContent = currentTempR;
  dayWeather.append (tempEl);
}

appendCities();

buttonEl.on('click', function () {
  var currentCityName = inputEl.val();
  citiesList[currentCityName] = 1;
  localStorage.setItem("cities", JSON.stringify(citiesList));
  // var requestUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${currentCityName}&id=524901&appid=d6c6f2f334d8420a6173b353ed5724d3`;
  // getApi(requestUrl);
  var requestUrl2 = `http://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&id=524901&appid=d6c6f2f334d8420a6173b353ed5724d3`;
  getCurrentW (requestUrl2);
});