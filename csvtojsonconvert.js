const CSVToJSON = require('csvtojson')
const express = require('express')
const csvtojsonrouter = express.Router()
const port = 3000


csvtojsonrouter.get('/convertcsvtojson', (req, res) => {
    try {
    CSVToJSON().fromFile('./data/performance.csv')
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
            console.log(err);
            res.status(400).send("Some error occured")
        });
    } catch (err) {
        console.error(err)
        res.status(500).send('Invalid Data')
    }
})

module.exports = csvtojsonrouter