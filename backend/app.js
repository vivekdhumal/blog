import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import 'dotenv/config'
import userRoutes from "./routes/user.route.js"
const port = process.env.BACKEND_PORT
const app = express()

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('mongodb is connected');
    }).catch((err) => {
        console.log(err)
    })

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/users', userRoutes)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})