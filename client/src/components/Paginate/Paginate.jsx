import React from "react";
import style from "./Paginate.module.css";

export default function Paginate({ recipesPerPage, allRecipes, paginado }) {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i ++) {
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul>
                {pageNumbers.map(n => (
                    <li key={n}>
                        <button onClick={() => paginado(n)}>{n}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}