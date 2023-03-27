const express = require('express')
const mongoose = require('mongoose')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const directorRouter = require('./routes/directors')
const movieRouter = require('./routes/movies')
const envVar = require('dotenv')
envVar.config()
const bodyParser = require('body-parser')


const PORT = process.env.PORT
const conn = process.env.conn

mongoose.set('strictQuery', false)
mongoose.connect(conn)

const db = mongoose.connection
db.on('error',(error)=> console.error(error))
db.once('open',()=> console.log('Connected to db'))

app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/',indexRouter)
app.use('/directors', directorRouter)
app.use('/movies', movieRouter)


app.listen(PORT,()=> console.log(`Sever running on port ${PORT}`))
