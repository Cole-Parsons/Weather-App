async function get_Lat_Long(city, state, url){
    try{
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Weather App (cole.tester2000@gmail.com'
            }
        })
        if (!res.ok) {
            throw new Error (`HTTP Error; Status: ${res.status}`)
        }

        const data = await res.json()
        console.log(data)

        return data
    } catch (error) {
        console.error('Error fetching lat/long:', error.message)
        return null
    }
}

async function get_Location_Hourly_Weather_Url(url, lat, lon) {
    let completed_Weather_Gov_Url = `${url}points/${lat},${lon}` 
    console.log(completed_Weather_Gov_Url)
    
    try{
        const res = await fetch(completed_Weather_Gov_Url)

        if (!res.ok) {
            throw new Error (`HTTP Error; Status: ${res.status}`)
        }

        const data = await res.json()
        return data.properties.forecastHourly
    } catch(error) {
        console.error('Error fetching Hourly Weather URL:', error.message)
        return null
    }
}

async function get_location_hourly_forecast(url) {
    try {
        const res = await fetch(url)

        if(!res.ok) {
            throw new Error (`HTTP Error: Status: ${res.status}`)
        }

        const data = await res.json()
    } catch (error) {
        console.error('Error:', error.message)
        return null
    }

}

const openMapUrl = 'https://nominatim.openstreetmap.org/search?q='
const weather_Gov_Url = 'https://forecast.weather.gov/'
const prompt = require("prompt-sync")();

var user_City = prompt('Enter a city: ')
var state = prompt('Enter a state as its abbreviation (e.g., Florida --> FL: ')

user_City = user_City.toLowerCase();
state = state.toUpperCase();

(async () => {
    completed_Openmap_URL = `${openMapUrl}${user_City},${state}&format=json`

    var location_Data = await get_Lat_Long(user_City, state, completed_Openmap_URL)

    var location_Lat = location_Data[0].lat 
    var location_Lon = location_Data[0].lon 

    var location_Hourly_Url = get_Location_Hourly_Weather_Url(weather_Gov_Url, location_Lat, location_Lon)



})()


