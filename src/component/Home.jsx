import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../reducer/moviereducer";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const { popularMovies, status, error } = useSelector((state) => state.movies);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMovies());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (popularMovies) {
            setData(popularMovies);
        }
    }, [popularMovies]);

    // console.log("Redux state:", { popularMovies, status, error });

    return (
        <>
            {status === "loading" && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {status === "succeeded" && data.length > 0 && (
                <div className="movies-tvshow-cards-main-container">
                    <div className="movies-tvshow-cards-container">
                        {data.map((item) => (
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
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
