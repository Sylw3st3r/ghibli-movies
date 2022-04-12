import { useEffect, useState } from "react";
import Movie from "./Movie";
import classes from './AllMovies.module.css';
import Spinner from "./Spinner";
import logo from "../images/logo.png"

export default function AllMovies(){
    const [moviesData, setMoviesData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        try{
            (async () => {
            setIsLoading(true);
            const response = await fetch("https://ghibliapi.herokuapp.com/films?limit=250", {
            method: 'GET', 
            mode: 'cors', 
            cache: 'default',
            credentials: 'omit', 
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            });
            if(response.ok){
                setMoviesData(await response.json());
                setIsLoading(false);
            } else {
                setIsLoading(false);
                throw new Error(`Something went wrong!!! Status: ${response.status}`);
            }
            })();
        } catch(err){
            setError(err.message);
        }
    },[])

    if(error){
        return <p>{error}</p>
    } else if(isLoading){
        return (
            <div className={classes.spinner}>
                <Spinner></Spinner>
            </div>
        )
    } else {
        return (
            <div className={classes.pageContainer}>
                <div className={classes.center}>
                    <img className={classes.logo} src={logo} alt="logo"></img>
                </div>
                <ul className={classes.moviesContainer}>
                    {moviesData.map(movie =><Movie id={movie.id} key={movie.id} title={movie.title} image={movie.image}></Movie>)}
                </ul>
            </div>
        )
    }
}