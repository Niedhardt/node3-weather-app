const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../template/views")
const partialPath = path.join(__dirname, "../template/partials")


// Setup handlebars engine and views location
app.set("view engine","hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialPath)

//Setup static eninge for express
app.use(express.static(publicDirectoryPath))

app.get("/about" , (req, res) =>{
    res.render("about", {
        title:"hbs about page",
        name: "Emil"
    })
})
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather app",
        name: "Emil"
    })
})
app.get("/products" , (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: "you must provide a search term"
        })
    } 
    console.log(req.query)
    res.send({
        products: []
    })

})
app.get("/help", (req, res) => {
    res.render("help", {
        title: "hbs help page",
        name: "Emil"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide adress"
        }) 
    }
   geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error, forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
   })
    
})
app.get("/help/*", (req, res) => {
    res.render("helpArticleError" ,{
        name:"Emil"
    })
})
app.get("*", (req, res) => {
    res.render("404handler", {
        name:"Emil"
    })
})


app.listen(port, () => {
    console.log("Server is up on port" + port)
})