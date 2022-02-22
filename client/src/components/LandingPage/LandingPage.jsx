import React from "react";
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div>
            <h1> FIND YOUR IDEAL RECIPE </h1>
            <Link to='/home'>
                <button> GO! </button>
            </Link>
        </div>
    )
}