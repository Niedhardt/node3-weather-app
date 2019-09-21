const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWFiZTE0MDMiLCJhIjoiY2swNndudHFqMDIwZDNkcXcxdjVueTZ2YSJ9.uFFOfpLhMagg405fdGVxRw&limit=1"
    
    request({url , json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect ot location services!", undefined)
        } else if(body.message){
            callback("Search....", undefined)
        } else if(body.features.length === 0){
            callback("Unable to find locaiton. Try another search.", undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
 }

module.exports = geocode