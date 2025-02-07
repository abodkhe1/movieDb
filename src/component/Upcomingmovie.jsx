import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { upComingMovies } from "../reducer/moviereducer";
import { Link } from 'react-router-dom';
function Upcomingmovie() {
    const dispatch = useDispatch();
      const { upcoming = [], status, error } = useSelector((state) => state.movies);
    
      useEffect(() => {
        dispatch(upComingMovies());
      }, [dispatch]);
    
      // console.log("Top Rated Movies:", upcoming); 
    
      if (status === "loading") return <p>Loading top-rated movies...</p>;
      if (status === "failed") return <p>Error: {error}</p>;
    return (
        <div className="movies-tvshow-cards-main-container">
        <div className="movies-tvshow-cards-container">
          {upcoming.length > 0 ? (
            upcoming.map((item) => (
              <div key={item.id} className="card-main-container">
                <Link to={`/movie/${item.id}`}>
                <div className="card-container">
                  <div className="card-image-container">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      alt={item.title}
                      className="card-image"
                    />
                  </div>
                  <div className="card-footer-container">
                    <div className="card-title">{item.title}</div>
                    <div className="card-title">Rating: {item.vote_average}</div>
                  </div>
                </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No upcoming movies available.</p>
          )}
        </div>
      </div>
    )
}

export default Upcomingmovie;
