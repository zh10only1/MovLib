const mongoose = require('mongoose')

const coverImageBasePath = 'uploads/movieCovers'
const path = require('path')
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String
    },
    releaseDate: {
        type: Date,
        required: true
    },
    movieTime: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Director'
    }

})

movieSchema.virtual('coverImagePath').get(function() {
    if(this.coverImageName != null) {
        return path.join('/',coverImageBasePath, this.coverImageName)
    }
})

module.exports = mongoose.model('Movie', movieSchema)
module.exports.coverImageBasePath = coverImageBasePath

