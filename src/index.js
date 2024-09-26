import connectDB from '../src/config/mongose.js';
import express from 'express'
import router from './router/router.js';

const app = express()
const PORT = 3000

app.use(express.json());
app.use('/customer', router)


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })
    })
    .catch(() => {
        console.log("Connect Mongdb fail")
    })

