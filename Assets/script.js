
var responseText = document.getElementById('response-text');
var buttonEl = $('#searchButton');
var inputEl = $('#cityName');
var citiesListEl = $('#citiesList');
var citiesList = JSON.parse(localStorage.getItem("cities")) ?? {};

var appendCities = function () {
for (const key in citiesList) {
    var cityButton = document.createElement('button');
    cityButton.innerHTML = key;
    cityButton.setAttribute ('class' , 'd-flex');
    cityButton.setAttribute ('style' , 'margin-left: 0.5%; justify-content: center; margin-top: 1%; width: 21.5%;' )
    citiesListEl.append(cityButton); 
}
};

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
        }
        return response.json();
      })
    .then (function(data) {
      console.log (data);
    })
  };

appendCities();

buttonEl.on ('click', function(){
var currentCityName = inputEl.val();
citiesList[currentCityName] = 1;
localStorage.setItem( "cities", JSON.stringify(citiesList));
var requestUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${currentCityName}&id=524901&appid=d6c6f2f334d8420a6173b353ed5724d3`;
  getApi(requestUrl);
});