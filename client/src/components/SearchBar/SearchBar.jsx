import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../../actions/actions";
import style from "./SearchBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getNameRecipes(name))
        setName('')
    }

    return (
        <div>
            <input 
            type="text" 
            value={name}
            placeholder='Recipe...'
            onChange={(e) => {handleInputChange(e)}}
            />
            <button
                type='submit' onClick={(e) => handleSubmit(e)}
            >Search</button>
        </div>
    )
}