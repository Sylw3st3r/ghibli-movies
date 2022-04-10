import { NavLink } from "react-router-dom"
import classes from './Movie.module.css'

export default function Movie(props){
    return (
     <li className={classes.listElement}>
        <NavLink to={`movie/${props.id}`} className={classes.container}>
            <h1>{props.title}</h1>   
            <img src={props.image} alt={`${props.title} img`}></img>
        </NavLink>
    </li>
    )

}