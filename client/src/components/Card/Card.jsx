import React from 'react';
import style from './Card.module.css'

export default function Card({ name, diets, image }) {
    return (
        <div className={style.card}>
            <h3>{name}</h3>
            {diets.map((e, index) => <h5 key={index} className={style.diet}>{e.name}</h5>)}
            <img className={style.image} src={image} alt='img not found'/>
        </div>
    )
}