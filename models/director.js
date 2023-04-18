const mongoose = require('mongoose')
const Movie = require('./movie')
const directorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model('Director', directorSchema)

