import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import classes from './MovieDetails.module.css';
import Spinner from "./Spinner";
import logo from "../images/logo.png"

export default function MovieDetails(){
    const {movieId} = useParams();
    const [movieDescriptionData, setMovieDescriptionData] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect(()=>{
        try{
            (async () => {
                setIsLoading(true)
                const response = await fetch(`https://ghibliapi.herokuapp.com/films/${movieId}`, {
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
                    setIsLoading(false);
                    setMovieDescriptionData(await response.json());
                  } else {
                      setIsLoading(false);
                      throw new Error(`Something went wrong!!! Status: ${response.status}`);
                  }
            })();
        } catch(err) {
            setError(err.message);
        }
    },[movieId])

    if(isLoading){
        return (
            <div className={classes.spinner}>
                <Spinner></Spinner>
            </div>
        )
    }else if(error){
        return <p>{error}</p>
    } else if(movieDescriptionData) {
        return (
            <div className={classes.layout}>
                <div className={classes.description}>
                    <NavLink to="/">
                        <img src={logo} alt="logo"></img>  
                    </NavLink>
                    <h1>{movieDescriptionData.title}</h1>   
                    <h1>{movieDescriptionData['original_title']}</h1>   
                    <h2>{`director: ${movieDescriptionData.director}`}</h2>   
                    <h2>{`producer: ${movieDescriptionData.producer}`}</h2>   
                    <h2>{`relese date: ${movieDescriptionData["release_date"]}`}</h2>  
                    <p>{movieDescriptionData.description}</p>  
                </div>
            </div>     
        )
    }
}