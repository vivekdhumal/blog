import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
const port = 3000
const app = express()

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('mongodb is connected');
    }).catch((err) => {
        console.log(err)
    })

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})