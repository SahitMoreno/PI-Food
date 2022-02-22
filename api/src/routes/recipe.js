const { Router } = require('express')
const { Recipe, Diet } = require('../db')

const router = Router()

router.post('/', async (req, res) => {
    let {
        name,
        image,
        summary,
        score,
        healthScore,
        analyzedInstructions,
        diets,
        createdInDB
    } = req.body
    let recipeCreated = await Recipe.create({
        name,
        image,
        summary,
        score,
        healthScore,
        analyzedInstructions,
        createdInDB
    })

    for(let i = 0; i < diets.length; i++) {
        let diet = await Diet.findOne({
            where: { name: diets[i] }
        })
        recipeCreated.addDiet(diet)
    }
    res.status(200).send('Receta creada con exito')
})

module.exports = router