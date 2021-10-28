const { Console } = require("console");
const express = require("express")
const Performance = require("./models/Performance")
const router = express.Router()

router.post("/import", async (req, res) => {
    try {
        data = req.body
        data.forEach(async function (item) {
            const performance = new Performance(item)
            await performance.save();
        });
        res.status(200).send('Data saved succesfully')
    } catch (err) {
        console.error(err)
        res.status(500).send('Invalid Data')
    }
});

router.get("/analytics", async (req, res) => {
    try {

        var dateArr = req.query.date.split(',')
        var start = new Date(dateArr[0])
        var end = new Date(dateArr[1])
        var metric = req.query.metric
        var Aggr = req.query.Aggr
        console.log(Aggr)
        var pipeline = [
            {
                $match: {
                    
                    "CounterName":metric,
                     "date":{
                        $gte: start,
                        $lte: end
                    }
                }
            },
            {
              $group: {
                _id: Aggr,
                max: { $max: '$'+Aggr}
              }
            }
          ]
        var aggregatefun = await Performance.aggregate(pipeline);
        console.log(aggregatefun)
       
        res.status(200).send(aggregatefun)
    } catch (err) {
        console.error(err)
        res.status(500).send('Invalid Data')
    }
})

router.get("/badperformance", async (req, res) => {
    try {

        var dateArr = req.query.date.split(',')
        let metric = req.query.metric
        let p90 = req.query.p90

        var data = await Performance.find({ 'CounterName': metric }).exec()
        var data = await Performance.find({
            'CounterName': metric, 'date': {
                $gte: dateArr[0],
                $lte: dateArr[1]
            },
            'P90': { $gte: p90 }
        }).exec()
        res.status(200).send(data)
    } catch (err) {
        console.error(err)
        res.status(500).send('Invalid Data')
    }
})
module.exports = router
