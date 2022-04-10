import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AllMovies from './components/AllMovies';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<AllMovies></AllMovies>}></Route>
      <Route path="movie/:movieId" element={<MovieDetails></MovieDetails>}></Route>
    </Routes>
  </BrowserRouter> 
  )
}

export default App;
