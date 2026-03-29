# Weather CLI App  

A simple Node.js command-line application that fetches the **current temperature** and **precipitation** for a given city and state using OpenStreetMap and the National Weather Service (weather.gov) APIs.

---

## Features  

- Prompts the user for city and state.  
- Uses OpenStreetMap API to get latitude and longitude.  
- Uses weather.gov API to fetch hourly weather forecasts.  
- Displays the current hour's temperature and precipitation probability.  

---

## Prerequisites  

- Node.js  
- npm  

---

## Installation  

1. Clone this repository:  
`git clone https://github.com/Cole-Parsons/Weather-App.git`  
`cd Weather-App`

2. Install Dependencies:  
`npm install prompt-sync`  

3. Run with:  
`node script.js`

---

## How It Works

1. Get latitude and longitude:  
- Uses OpenStreetMap API (https://nominatim.openstreetmap.org/search) to find coordinates for the city/state.  

2. Fetch hourly forecast URL:  
- Calls https://api.weather.gov/points/{lat},{lon} to get the URL for hourly forecasts.  
 
3. Fetch hourly forecast data:  
- Accesses the forecastHourly endpoint.  
- Finds the period object for the current hour using the system time.  

4. Display Results:  
- Prints temperature and precipitation chance to console.  

---

## Notes  

* All API requests include a User-Agent header as required by OpenStreetMap and weather.gov.  
* The script currently only displays temperature and precipitation for the current hour.  
* Can be extended to show multiple hours, wind, humidity, or other weather details.  





