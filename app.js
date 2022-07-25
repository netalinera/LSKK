//library
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import route from "./routes/index.js"
import bodyParser from "body-parser"

//object
const app = express()

//db connect
//mongoose.connect("mongodb://localhost:27017/homeauto",
//mongoose.connect("mongodb+srv://neta:neta@cluster0.kclhjkj.mongodb.net/homeauto?retryWrites=true&w=majority",
mongoose.connect("mongodb+srv://fahal:fahal@fahal.fbiop.mongodb.net/homeauto?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('DB connect'))

//middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

//route
app.use('/api', route)

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})