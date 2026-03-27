async function get_Lat_Long(city, state, url){
    const res = await fetch(url)
    const data = await res.json()

    return data
}

const openMapUrl = 'https://nominatim.openstreetmap.org/search?q='
const prompt = require("prompt-sync")();

var user_City = prompt('Enter a city: ')
var state = prompt('Enter a state as its abbreviation (e.g., Florida --> FL: ')

user_City = user_City.toLowerCase()
state = state.toUpperCase()

completed_URL = `${openMapUrl}${user_City},${state}&format=json`

var location_json = get_Lat_Long(user_City, state, completed_URL)

console.log(completed_URL)


