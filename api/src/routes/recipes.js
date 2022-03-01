const { Router } = require('express');
const { Recipe, Diet } = require('../db');
require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const axios = require('axios');

const router = Router();

const getInfo = async () => {
    const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)

    const apiInfo = api.data.results.map(d => {
        return {
            ID: d.id,
            name: d.title,
            image: d.image,
            score: d.spoonacularScore,
            dishTypes: d.dishTypes.map(d => { return { name: d }}),
            diets: d.diets.map(d => { return { name: d }}),
            summary: d.summary,
            healthScore: d.healthScore,
            analyzedInstructions: d.analyzedInstructions
        }
    })
    return apiInfo
}

const getInfoDB = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getInfo()
    const dbInfo = await getInfoDB()
    const allInfo = apiInfo.concat(dbInfo)

    return allInfo
}

router.get('/', async (req, res) => {
    const { name } = req.query
    const recipesTotal = await getAllRecipes()

    if(name) {
        let recipeName = recipesTotal.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(418).json({ msg: 'La receta no existe' })
    } else {
        res.send(recipesTotal)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allRecipes = await getAllRecipes();

    if(id) {
        let recipeId = allRecipes.filter(e => e.ID == id) // cambiar aca
        recipeId.length ?
            res.status(200).json(recipeId) :
            res.status(418).json({ msg: 'No se encontro la receta' })
    }
 })

module.exports = router