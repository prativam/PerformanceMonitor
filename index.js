const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")

const port = 3000
const url = "mongodb://localhost:27017/Performance"
const app = express()
const CSVToJSON = require('./csvtojsonconvert')

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use("/api", routes)
app.use("/api",CSVToJSON)

mongoose
    .connect(url, { useNewUrlParser: true })
    .then(() => {
        console.log("Mongo DB Connected")
    })

app.listen(port, () => {
    console.log("Server has started!")
})


