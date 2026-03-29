async function get_Lat_Long(city, state, url){
    try{
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Weather App (cole.tester2000@gmail.com)'
            }
        })
        if (!res.ok) {
            throw new Error (`HTTP Error; Status: ${res.status}`)
        }

        const data = await res.json()

        return data
    } catch (error) {
        console.error('Error fetching lat/long:', error.message)
        return null
    }
}

async function get_Location_Hourly_Weather_Url(url, lat, lon) {
    let completed_Weather_Gov_Url = `${url}points/${lat},${lon}` 
    
    try{
        const res = await fetch(completed_Weather_Gov_Url, {
            headers: {
                'User-Agent': 'Weather App (cole.tester2000@gmail.com)'
            }
        })

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
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Weather App (cole.tester2000@gmail.com)'
            }
        })

        if(!res.ok) {
            throw new Error (`HTTP Error: Status: ${res.status}`)
        }

        const data = await res.json()
        return data
    } catch (error) {
        console.error('Error:', error.message)
        return null
    }

}

const openMapUrl = 'https://nominatim.openstreetmap.org/search?q='
const weather_Gov_Url = 'https://api.weather.gov/'
const prompt = require("prompt-sync")();

var user_City = prompt('Enter a city: ')
var user_State = prompt('Enter a state as its abbreviation (e.g., Florida --> FL: ')

user_City = user_City.toLowerCase().trim();
user_State = user_State.toUpperCase().trim();

(async () => {
    var completed_Openmap_URL = `${openMapUrl}${user_City},${user_State}&format=json`

    var location_Data = await get_Lat_Long(user_City, user_State, completed_Openmap_URL)

    var location_Lat = location_Data[0].lat 
    var location_Lon = location_Data[0].lon 

    var location_Hourly_Url = await get_Location_Hourly_Weather_Url(weather_Gov_Url, location_Lat, location_Lon)

    var hourly_Forecast = await get_location_hourly_forecast(location_Hourly_Url)

    const nowHour = new Date().getHours()

    const currentPeriod = hourly_Forecast.properties.periods.find(period => {
        const periodHour = new Date(period.startTime).getHours()
        return periodHour === nowHour
    })

    if (currentPeriod) {
        console.log(`Weather for: ${user_City}, ${user_State}`)
        console.log('Temperature: ', currentPeriod.temperature)
        console.log('Precipitation: ', currentPeriod.probabilityOfPrecipitation.value)
    } else {
        console.log('No forecast found for the current hour.')
    }
})()



