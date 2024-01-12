//=============== variables=================================

// ===serach ====================================
let citySearch =document.getElementById("citySearch")


// ==============today vars===========================
let todayName=document.getElementById("todayName")
let todayNumber=document.getElementById("todayNumber")
let cityName=document.getElementById("cityName")
let todayTemp=document.getElementById("todayTemp")
let todayIcon=document.getElementById("todayIcon")
let todayCondition=document.getElementById("todayCondition")
let humidty=document.getElementById("humidty")
let wind=document.getElementById("wind")
let windDirection=document.getElementById("windDirection")

// ===========next days forecast var=======================

let nextdayName=document.querySelectorAll(".nextdayName")
let nextdayMaxTemp=document.querySelectorAll(".nextdayMaxTemp")
let nextdayMinTemp=document.querySelectorAll(".nextdayMinTemp")
let nextdayIcon=document.querySelectorAll(".nextdayIcon")
let nextdayCondition=document.querySelectorAll(".nextdayCondition")
// ======================================================



//========================================fetch API data============================


async function getWeatherdata (city){
    let weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=9ad696c4aade4c4a8a8122125241101&q=${city}&days=3`)
    let weatherData= await weatherResponse.json()
    return weatherData;

}

// ====fetch ends========================================

async function start(city="london"){
    let weatherData=await getWeatherdata(city)
    if(!weatherData.error){

        displayTodayForecast(weatherData)
        displayNextDaysForecast(weatherData)
    }
  
}

start()




function displayTodayForecast(data){

    let todayDate=new Date()
    todayName.innerHTML=todayDate.toLocaleDateString("en-us",{weekday:"long"})
    todayNumber.innerHTML=todayDate.getDate()+` ${todayDate.toLocaleDateString("en-us",{month:"long"})}`
    cityName.innerHTML=data.location.name
    todayTemp.innerHTML=data.current.temp_c+"&deg;C"
    todayIcon.setAttribute("src",data.current.condition.icon)
    console.log(todayIcon);
    todayCondition.innerHTML=data.current.condition.text
    humidty.innerHTML=data.current.humidity+"%"
    wind.innerHTML=data.current.wind_kph+" k/hr"
    windDirection.innerHTML=data.current.wind_dir
    }
    
function displayNextDaysForecast(data){

    for(let i=0; i<2;i++){
        
    let nextDaysDate=new Date(data.forecast.forecastday[i+1].date)
       nextdayName[i].innerHTML=nextDaysDate.toLocaleDateString("en-us",{weekday:"long"})
       nextdayMaxTemp[i].innerHTML=data.forecast.forecastday[i+1].day.maxtemp_c+"&deg;C"
       nextdayMinTemp[i].innerHTML=data.forecast.forecastday[i+1].day.mintemp_c+"&deg;C"
       nextdayIcon[i].setAttribute("src",data.forecast.forecastday[i+1].day.condition.icon)
       nextdayCondition[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text
    }

}


citySearch.addEventListener("input",function(){


start(citySearch.value)

})


