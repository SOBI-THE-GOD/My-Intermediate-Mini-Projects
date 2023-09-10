const imgSrcesArr = ['img/pexels-baskin-creative-studios-1766838.jpg',
'img/pexels-emre-keskinol-1718345.jpg',
'img/pexels-ian-turnell-709552.jpg',
'img/pexels-joshua-woroniecki-2607956.jpg',
'img/pexels-krivec-ales-547114.jpg',
'img/pexels-pixabay-302549.jpg',
'img/pexels-pixabay-35600.jpg',
'img/pexels-pixabay-36478.jpg',
'img/pexels-tayyab-khan-2839837.jpg'];
const citiesWeatherArr = [{cityName : 'Tehran' , temprature : '27C°' , weatherDiscribe : 'Sunny' , weatherHumidity : '11%' , windSpeed : '6 m/s' } ,
{cityName : 'Rey' , temprature : '17C°' , weatherDiscribe : 'Rainy' , weatherHumidity : '21%' , windSpeed : '9 m/s' } ,
{cityName : 'Bukhara' , temprature : '21C°' , weatherDiscribe : 'Cloudy' , weatherHumidity : '16%' , windSpeed : '13 m/s' }];
let randomIndex = Math.floor(Math.random() * imgSrcesArr.length);
document.body.style.backgroundImage = 'url(' + imgSrcesArr[randomIndex] + ')';
let searchButton = document.querySelector('#search-section button');
let searchInput = document.getElementById('search-input');
let isCityAvailable = false ;
let cityIndex = 0 ;
let alertElem = document.querySelector("#alert");
let weatherDisciptionsArr = document.getElementsByClassName('city-weather-discription');
searchButton.addEventListener('click' , () => {
    isCityAvailable = citiesWeatherArr.some(element => element.cityName.toLowerCase() === searchInput.value.toLowerCase());
    if (isCityAvailable) {
        cityIndex = citiesWeatherArr.findIndex(element => element.cityName.toLowerCase() === searchInput.value.toLowerCase());
        weatherDisciptionsArr[0].innerHTML = 'Weather In ' + citiesWeatherArr[cityIndex].cityName;
        weatherDisciptionsArr[1].innerHTML = citiesWeatherArr[cityIndex].temprature;
        weatherDisciptionsArr[2].innerHTML = '<img src="04n.png" alt="Cloud">' + citiesWeatherArr[cityIndex].weatherDiscribe;
        weatherDisciptionsArr[3].innerHTML = 'Humidity: ' + citiesWeatherArr[cityIndex].weatherHumidity;
        weatherDisciptionsArr[4].innerHTML = 'Wind: ' + citiesWeatherArr[cityIndex].windSpeed;
        Array.from(weatherDisciptionsArr).forEach(element => {
            element.style.display = 'block';
        });
        document.getElementById('weather-discribe').style.display = 'inherit';
    } else {
        alertElem.innerHTML = 'Entered City Is Not Found !';
        alertElem.style.display = 'block';
        setTimeout(() => alertElem.style.display = 'none' , 5000);
        Array.from(weatherDisciptionsArr).forEach(element => {
            element.style.display = 'none';
        });
        document.getElementById('weather-discribe').style.display = 'none';
    };
});
searchInput.addEventListener('focus' , () => {
    if (isCityAvailable === false) {
        searchInput.value = '' ;
    };
});


