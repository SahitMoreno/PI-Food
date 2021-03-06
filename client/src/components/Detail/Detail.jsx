import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRecipeDetail, getClean } from '../../actions/actions';
import style from './Detail.module.css'

export default function Detail() {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getRecipeDetail(id)) 
        return () => {dispatch(getClean())}
    }, [dispatch, id])

    const recipeDetail = useSelector(state => state.detail)

    return(
        <div className={style.contains}>

            <div className={style.margen}>
            <div className={style.buttonLeft}>    
            <Link to ='/home'>
                <button className={style.button}>HOME</button>
            </Link>
            </div>
                {recipeDetail.length > 0 ?
                    <div>
                        <h1 className={style.title}>
                            {recipeDetail[0].name && recipeDetail[0].name}
                        </h1>
                        <img className={style.image} src={recipeDetail[0].image ? recipeDetail[0].image : 'https://th.bing.com/th/id/R.bd90c39e1235f68b88affffa2bf55fe4?rik=38DZcpZjUEDV5w&pid=ImgRaw&r=0'} alt={'Img not found'}/>
                        <div>
                        {recipeDetail[0].diets.length > 0 ?
                            <h5 className={style.titles}>TYPE OF DIET:</h5> : <h5 className={style.titles}>NO HAVE DIETS YET  </h5>}
                            <h2>{recipeDetail[0].diets && recipeDetail[0].diets.map(t => t.name.toUpperCase() + ', ')}</h2>
                        </div>
                        <div>
                            <h5 className={style.titles}>SCORE:</h5>
                            <h2>{recipeDetail[0].score && recipeDetail[0].score}</h2>
                        </div>
                        <div>
                            <h5 className={style.titles}>DISH TYPE:</h5>
                            <h2 className={style.dish}>{recipeDetail[0].dishTypes ? recipeDetail[0].dishTypes.map(t => t.name) : 'Dish type not found' }</h2>
                        </div>
                        <div>
                            <h5 className={style.titles}>SUMMARY:</h5>
                            <h2 className={style.summary}><div dangerouslySetInnerHTML={{ __html: recipeDetail[0].summary}}/></h2>
                        </div>
                        <div>
                            <h5 className={style.titles}>HEALTH SCORE:</h5>
                            <h2>{recipeDetail[0].healthScore && recipeDetail[0].healthScore}</h2>
                        </div>
                        <div>
                            {recipeDetail[0].analyzedInstructions.length > 0 ?
                            <div>
                             <h5 className={style.titles}>STEPS:</h5>
                            </div> : <h5 className={style.titles}>NO HAVE STEPS YET  </h5>}
                            <h2 className={style.steps}>{Array.isArray(recipeDetail[0].analyzedInstructions) ? recipeDetail[0].analyzedInstructions.map(e => e.steps.map(s => s.step)) : recipeDetail[0].analyzedInstructions}</h2> 
                        </div> 
                    </div> : <p className={style.titles}>LOADING...</p>
                }
            </div>
        </div>
    )
}