const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')
const Director = require('../models/director')

// get all movies
router.get('/',async (req,res)=> {
    res.send('All Movies')
})

//get new movie
router.get('/new',async(req,res)=>{
    try {
        const directors = await Director.find({})
        const movie = new Movie()
        res.render('movies/new',{
            directors: directors,
            movie: movie
        } )
    } catch {
        res.redirect('/movies')
    }
})

// create new movie
router.post('/',async(req,res)=>{
   res.send('Add new movie')
})


module.exports = router

