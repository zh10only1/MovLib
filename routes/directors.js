const express = require('express')
const router = express.Router()
const Director = require('../models/director')

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

//get new director
router.get('/new',(req,res)=>{
    res.render('directors/new',
    {
        director: new Director()
    })
})

// create new director
router.post('/',async(req,res)=>{
    const director = new Director({
        name: req.body.name
    })

    try {
        const newDirector = await director.save()
        //res.redirect(`directors/${newDirector.id}`)
        res.redirect('directors')
    }
    catch {
        res.render('directors/new', {
            director: director,
            errorMessage: 'There was an error, director could not be created'
        })
    }
})




module.exports = router

