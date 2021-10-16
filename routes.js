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

module.exports = router