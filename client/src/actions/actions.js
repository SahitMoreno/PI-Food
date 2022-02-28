import axios from 'axios';

export const GET_CLEAN = 'GET_CLEAN'

const GET_RECIPES = 'GET_RECIPES'
const GET_DIETS = 'GET_DIETS'
const GET_FILTER_BY_TYPE = 'GET_FILTER_BY_TYPE'
const GET_FILTER_BY_SCORE = 'GET_FILTER_BY_SCORE'
const GET_FILTER_BY_NAME = 'GET_FILTER_BY_NAME'
const GET_NAME_RECIPES = 'GET_NAME_RECIPES'
const GET_DETAIL = 'GET_DETAIL'

export function getRecipes() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/recipes')
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}

export function getDiets() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: GET_DIETS,
            payload: json.data
        })
    }
}

export function filterByType(payload) {
    return {
        type: GET_FILTER_BY_TYPE,
        payload
    }
}

export function filterByName(payload) {
    return {
        type: GET_FILTER_BY_NAME,
        payload
    }
}

export function filterByScore(payload) {
    return {
        type: GET_FILTER_BY_SCORE,
        payload
    }
}

export function getNameRecipes(name) { //query
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type: GET_NAME_RECIPES,
                payload: json.data
            })
        } catch (error) {
            return error
        }
    }
}

export function getRecipeDetail(id) { // arreglar?
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/recipes/${id}`)
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        } catch (error) {
            return error
        }
    }
}

export function postRecipe(payload) {
    return async function (dispatch) {
        var data = await axios.post('http://localhost:3001/recipe', payload)
        return data
    }
}

export function getClean() {
    return {
        type: GET_CLEAN,
    }
}