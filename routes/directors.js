const express = require('express')
const router = express.Router()
const Director = require('../models/director')
const Movie = require('../models/movie')

// get all directors
router.get('/',async (req,res)=> {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !='') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const directors = await Director.find(searchOptions) // empty object passed meaning no where or conditional statements 
        res.render('directors/index',{
            directors: directors,
            searchOptions: req.query
        })
    }
    catch {
        res.redirect('/')
    }
})



router.get('/:id/edit', async(req, res) => {
    try {
        const director = await Director.findById(req.params.id)
        res.render('directors/edit',{director: director})
    } catch {
        res.redirect('/directors')
    }
    
})

router.put('/:id', async(req, res) => {
    let director

    try {
        director = await Director.findById(req.params.id)
        director.name = req.body.name
        await director.save()
        res.redirect(`/directors/${director.id}`)
    }
    catch {
        if (author==null) {res.redirect('/')}
        else {
            res.render('directors/edit', {
                director: director,
                errorMessage: 'There was an error, director could not be updated'
            })
        }
    }
})

router.delete('/:id', async(req, res) => {
    let director

    try {
        director = await Director.findById(req.params.id)
        const movies = await Movie.find({director: director.id})
        
        if(movies.length==0) {
            await director.remove()
            res.redirect(`/directors`)
        }
        else {
            res.redirect(`/directors/${director.id}`)
        }
        
    }
    catch {
        if (author==null) {res.redirect('/')}
        else {
            res.redirect(`/directors/${director.id}`)
        }
    }
})

//get new director
router.get('/new',(req,res)=>{
    res.render('directors/new',{director: new Director()})
})

// get single director
router.get('/:id', async(req,res) => {
    try {
        const director = await Director.findById(req.params.id)
        const movies = await Movie.find({director: req.params.id}).limit(5).exec()
        res.render('directors/show',
        {
            director: director,
            movies: movies
        })
    }
    catch {
       
        res.redirect('/')
    }

})

// create new director
router.post('/',async(req,res)=>{
    const director = new Director({
        name: req.body.name
    })

    try {
        const newDirector = await director.save()
        res.redirect(`directors/${newDirector.id}`)
    }
    catch {
        res.render('directors/new', {
            director: director,
            errorMessage: 'There was an error, director could not be created'
        })
    }
})



module.exports = router

