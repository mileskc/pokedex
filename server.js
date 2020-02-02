const express = require('express')
const app = express()
const port = 3000
const methodOverride = require('method-override')

//middleware
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(express.static('public'))

//data
const pokedex = require('./pokedex/models/pokemon')

//index
app.get('/pokedex', (req, res) => {
    res.render('index.ejs', {pokedex: pokedex})
})

//new
app.get('/pokedex/new', (req, res) => {
    res.render('new.ejs')
})

//edit
app.get('/pokedex/:index/edit', (req,res) => {
    res.render('edit.ejs', {
        pokemon: pokedex[req.params.index],
        index: req.params.index
    }
    )
})

//show
app.get('/pokedex/:index', (req, res) => {
    res.render('show.ejs', {pokemon: pokedex[req.params.index]})
})

//create
app.post('/pokedex', (req, res) => {
    // pokedex.push(req.body.name, req.body.id, req.body.type, req.body.hp, req.body.attack, req.body.defense, req.body.spattack, req.body.spdefense, req.body.speed)
    const newPokemon = {}
    newPokemon.name = req.body.name
    newPokemon.img = req.body.img
    newPokemon.id = req.body.id
    newPokemon.type = req.body.type
    newPokemon.stats= {
                        hp: req.body.hp,
                        attack: req.body.attack,
                        defense: req.body.defense,
                        spattack: req.body.spattack,
                        spdefense: req.body.spdefense,
                        speed:req.body.speed
    }    
    // pokedex.push(req.body)
    pokedex.unshift(newPokemon)
    res.redirect('/pokedex')
})

//delete
app.delete('/pokedex/:index', (req, res) => {
    pokedex.splice(req.params.index, 1)
    res.redirect('/pokedex')
})

app.put('/pokedex/:index', (req, res) => {
    pokedex[req.params.index].name = req.body.name
    pokedex[req.params.index].img = req.body.img
    pokedex[req.params.index].id = req.body.id
    pokedex[req.params.index].type = req.body.type
    pokedex[req.params.index].stats.hp = req.body.hp
    pokedex[req.params.index].stats.attack = req.body.attack
    pokedex[req.params.index].stats.defense = req.body.defense
    pokedex[req.params.index].stats.spattack = req.body.spattack
    pokedex[req.params.index].stats.spdefense = req.body.spdefense
    pokedex[req.params.index].stats.speed = req.body.speed
    res.redirect('/pokedex')
})

app.listen(port, () =>{
    console.log('listening on', 3000)
})