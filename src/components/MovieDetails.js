import { useEffect, useState } from "react";
import { useParams } from "react-router";
import classes from './MovieDetails.module.css';


const getMovie = async (id) => {
    const response = await fetch(`https://ghibliapi.herokuapp.com/films/${id}`, {
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
          const data = await response.json();
          return data;
      } else {
          throw new Error(`Something went wrong!!! Status: ${response.status}`);
      }
}

export default function MovieDetails(){
    const {movieId} = useParams();
    const [movieDescriptionData, setMovieDescriptionData] = useState(null);

    useEffect(()=>{
        async function addData(){
            try{
                setMovieDescriptionData(await getMovie(movieId));
            } catch(err){
                console.log(err);
            }
        };
        addData();

    },[movieId,setMovieDescriptionData])

    
    if(movieDescriptionData){
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
    } else {
        <div>Kurwa miało wyjść inaczej</div>
    }
}