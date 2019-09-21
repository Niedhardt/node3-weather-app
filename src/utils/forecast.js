const request = require("request")
const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/e09cf447cd19d3965aaf830f6b142980/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "?units=si"

    request({url,json:true} , (error, {body}) => {
        if(error){
            callback("Unable to connect weather service!", undefined)
        } else if(body.error){
            callback("Unable to find this location", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.apparentTemperature + 
            " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast