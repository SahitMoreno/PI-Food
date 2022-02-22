import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByType, getRecipes, filterByName, filterByScore, getDiets, filterMayor80 } from "../../actions/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";


export default function Home() {

  const dispatch = useDispatch() 
  const allRecipes = useSelector((state) => state.recipes)
  const [currentPage, setCurrentPage] = useState(1) 
  const [recipesPerPage, setRecipesPerPage] = useState(9)  
  const iOfLastRecipe = currentPage * recipesPerPage
  const iOfFirstRecipe = iOfLastRecipe - recipesPerPage
  const currentRecipes = allRecipes.slice(iOfFirstRecipe, iOfLastRecipe) // parte de todas las recetas
  const [orden, setOrden] = useState('')
  const [orden1, setOrden1] = useState('') 
  
  const paginado = (pageNumber) => {  setCurrentPage(pageNumber) }


  useEffect(() => { dispatch(getRecipes()) }, [dispatch])  
  useEffect(() => { dispatch(getDiets()) }, [dispatch])  

  function handleClick(e) {
    e.preventDefault()
    dispatch(getRecipes())
  }

  function handleFilterMayor(e) {
    e.preventDefault()
    dispatch(filterMayor80(e.target.value))

  }

  function handleDiets(e) {
    e.preventDefault()
    setCurrentPage(1)
    dispatch(filterByType(e.target.value));
  }

  function handleOrderByName(e) {
    e.preventDefault()
    dispatch(filterByName(e.target.value))  
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }


  function handleOrderByScore(e) {
    e.preventDefault()
    dispatch(filterByScore(e.target.value))
    setCurrentPage(1)
    setOrden1(`Ordenado ${e.target.value}`)
  }




  return (

    <div className={style.container}>

      <Link className={style.button2}
        to="/recipe">CREATE RECIPE</Link>
      <div>
        <h1 className={style.page}
        >RECIPE'S PAGE</h1>
      </div>
      <div className={style.bordercont}>

        <SearchBar />
        <select className={style.select}
          onChange={(e) => handleOrderByName(e)}>
          <option value="asc">A to Z</option>   
          <option value="desc">Z to A</option>
        </select>
        <select defaultValue='vacio' className={style.select}
          onChange={(e) => handleOrderByScore(e)}>
          <option value='vacio'></option>
          <option value="high"> High score </option>
          <option value="low"> Low score </option>
        </select>
        <select className={style.select}
          onChange={(e) => handleDiets(e)}>
          <option value="All"> All diets</option>
          <option value="gluten free"> Gluten free</option>
          <option value="dairy free"> Dairy free</option>
          <option value="paleolithic"> Paleolithic</option>
          <option value="ketogenic"> Ketogenic</option>
          <option value="lacto ovo vegetarian"> Lacto ovo vegetarian</option>
          <option value="vegan"> Vegan</option>
          <option value="pescatarian"> Pescatarian</option>
          <option value="primal"> Primal</option>
          <option value="fodmap friendly"> Fodmap friendly</option>
          <option value="whole 30"> Whole 30</option>
        </select>
        <button value="mayor 80" onClick={e => handleFilterMayor(e)}> Score mayor 80</button>     
        <button className={style.button}
          onClick={e => { handleClick(e) }}>
          BACK TO ALL RECIPES
        </button>


        <div className={style.cards}>
          {currentRecipes?.map((el) => { 
            return ( 
              <Link className={style.link}
              key = {el.ID}
                to={`recipes/${el.ID}`}>
                <Card key = {el.ID} id={el.ID} name={el.name} diets={el.diets} image={el.image}/>
              </Link>

            ) 
          })
          }
        </div>
        <Paginate 
        key = {1}
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}   
          paginado={paginado}
        />
      </div>
    </div>
  )
}