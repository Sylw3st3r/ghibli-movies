import { useEffect, useState } from "react";
import Movie from "./Movie";
import classes from './AllMovies.module.css';

const getMovies = async () => {

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
          const data = await response.json();
          return data;
      } else {
          throw new Error(`Something went wrong!!! Status: ${response.status}`);
      }
}
export default function AllMovies(){
    const [moviesData, setMoviesData] = useState([]);

    useEffect(()=>{
        async function addData(){
            try{
                setMoviesData(await getMovies());
            } catch(err){
                console.log(err);
            }
        };
        addData();
    },[])

    return (
        <div className={classes.pageContainer}>
            <div className={classes.center}>
                <img class={classes.logo} src="https://www.pngkey.com/png/full/198-1987073_open-studio-ghibli-logo.png" alt="kurwa"></img>
            </div>
            <ul className={classes.moviesContainer}>{moviesData.map(movie =><Movie id={movie.id} key={movie.id} title={movie.title} image={movie.image}></Movie>)}</ul>
        </div>
    )
}