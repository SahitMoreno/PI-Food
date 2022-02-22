const { Router } = require('express');
const { Diet } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    const diets = [
        "gluten free",
        "dairy free",
        "paleolithic",
        "ketogenic",
        "lacto ovo vegetarian",
        "vegan",
        "pescatarian",
        "primal",
        "fodmap friendly",
        "whole 30"
    ]

    diets.forEach(d => {
        Diet.findOrCreate({
            where: { name: d }
        })
    })

    const allTypes = await Diet.findAll()
    res.status(200).send(allTypes)
})

module.exports = router