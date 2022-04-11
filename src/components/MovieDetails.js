import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import classes from './MovieDetails.module.css';


export default function MovieDetails(){
    const {movieId} = useParams();
    const [movieDescriptionData, setMovieDescriptionData] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        async function addData(){
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
        };
        
        try{
            addData();
        } catch(err) {
            console.log(err)
        }

    },[movieId])

    if(isLoading){
        return (
            <div className={classes.spinner}>
                <ClipLoader size="10vw"></ClipLoader>;
            </div>
            )
    } else if(movieDescriptionData) {
        return (
            <div className={classes.layout}>
                    <div className={classes.description}>
                        <h1>{movieDescriptionData.title}</h1>   
                        <h1>{movieDescriptionData['original_title']}</h1>   
                        <h3>{`director: ${movieDescriptionData.director}`}</h3>   
                        <h3>{`producer: ${movieDescriptionData.producer}`}</h3>   
                        <h3>{`relese date: ${movieDescriptionData["release_date"]}`}</h3>  
                        <p>{movieDescriptionData.description}</p>    
                    </div>
                </div>     
        )
    }
}