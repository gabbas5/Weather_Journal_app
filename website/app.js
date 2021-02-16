/* Global Variables */

// Personal API Key for OpenWeatherMap 
const iconPath = 'http://openweathermap.org/img/wn/'
const apiKey = '5c434ad12b781cd1971f95a94d894011';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generate);

/* Function called by event listener */
function generate() {
    let zipcode = document.getElementById("zip");
    console.log("fetch weather data");
    console.log(zipcode.value)
    if (zipcode.value != '') {
        let url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode.value + '&units=imperial&appid=' + apiKey;
        // call getWeatherData function and pass url + saveWeatherData function
        getWeatherData(url, saveWeatherData, displayErrorMessage)
    }

    zipcode.value = ''
}

function saveWeatherData(data) {
    console.log(data);

    console.log("save data");

    let currentDate = new Date();
    let feelings = document.getElementById("feelings");

    let weatherData = {
        date: currentDate.toDateString(),
        time: currentDate.toLocaleTimeString(),
        city: data.name,
        country: data.sys.country,
        icon: data.weather[0].icon,
        temp: data.main.temp,
        description: data.weather[0].description,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        feelings: feelings.value
    }
    feelings.value = ''
    console.log(weatherData);

    // Post weatherData to route:/lastEntry
    postWeatherData('lastEntry', weatherData)

    // call displayWeatherData
    displayWeatherData(weatherData);
}


// This function is used to display the weatherData in the browser
function displayWeatherData(weatherData) {
    let dateInfo = `<p> ${weatherData.date} ${weatherData.time}</p>`
    let dateDiv = document.getElementById("date");
    dateDiv.innerHTML = dateInfo;

    let locationInfo = `<p> ${weatherData.city}, ${weatherData.country}</p>`
    let locationDiv = document.getElementById("location");
    locationDiv.innerHTML = locationInfo;

    let tempInfo = `<img src="${iconPath}${weatherData.icon}@2x.png"></img><p>${Math.floor(weatherData.temp)} &#8457</p>`
    let tempDiv = document.getElementById("temp");
    tempDiv.innerHTML = tempInfo;

    let description = `<p> ${weatherData.description}, feels like: ${Math.floor(weatherData.feelsLike)} &#8457 </p>`
    let descriptionDiv = document.getElementById("description");
    descriptionDiv.innerHTML = description;

    let contentInfo = `<p>humidity: ${weatherData.humidity} &#37, wind speed: ${weatherData.wind} mph </p>`
    let contentDiv = document.getElementById("content");
    contentDiv.innerHTML = contentInfo;

    let myFeelingsInfo = `<p>I am feeling: ${weatherData.feelings} </p>`
    let myFeelingsDiv = document.getElementById("myFeelings");
    myFeelingsDiv.innerHTML = myFeelingsInfo;
}

/* Function to GET Web API Data*/
// function to get weather data
// The purpose of this function is to fetch the data from the weatherapp
const getWeatherData = async (url = '', callBack, errorCallBack) => {
    fetchData(url, callBack, errorCallBack);
};

/* Function to POST data */
// This function makes a post request to the url and bundles the data in it
// Used to post weatherData
const postWeatherData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
// This function gets the project data(var projectData) also known as the lastEntry
const getLastSavedEntryData = async (url = '', callBack, errorCallBack) => {
    fetchData(url, callBack, errorCallBack);
};

const fetchData = async (url, callBack, errorCallBack) => {

    try {
        const request = await fetch(url);
        // Transform into JSON
        const data = await request.json()
        console.log(request);
        if (!request.ok) {
            errorCallBack();
        }
        else{
            callBack(data);
        }
    }
    catch (error) {
        errorCallBack()
        console.log("error", error);
        // appropriately handle the error
    }
}

function displayErrorMessage(){
    console.log("Couldn't find any weather data for zipcode provided.")
    let message = "<p>Couldn't find any weather data for zip code provided!</p>"
    let errorMessage = document.getElementById("errorMessage");
    errorMessage.innerHTML = message;
}
errorMessage.innerHTML = ''

// Display lastEntry
function showRecentEntry() {
    console.log("check")
    getLastSavedEntryData('lastEntry', displayWeatherData, displayErrorMessage )
}
// call the function   
showRecentEntry()
//END
