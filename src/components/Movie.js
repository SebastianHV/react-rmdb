import React from "react";
// With this hook we can grab the parameter we have in the URL
import { useParams } from "react-router-dom";
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
// Components
import BreadCrumb from './BreadCrumb'
import Grid from './Grid';
import Spinner from "./Spinner";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Actor from './Actor'
// Hook
import { useMovieFetch } from '../hooks/useMovieFetch'
// Image
import NoImage from '../images/no_image.jpg'

const Movie = () => {
    // We get the params
    // We have to name our const the same as we named our param in the App.js file
    const { movieId } = useParams();
    // We can rename a property when destructuring. Here we renamed state to movie
    const { state: movie, loading, error } = useMovieFetch(movieId)

    // console.log(`Movie: `);
    // console.log(movie);

    // We can return the spinner if twe are loading the mvoie
    if (loading) return <Spinner />
    // If there is an error, we retun this
    if (error) return <div>Something went wrong...</div>

    return (
        <>
            <BreadCrumb movieTitle={movie.original_title}></BreadCrumb>
            <MovieInfo movie={movie} />
            <MovieInfoBar
                time={movie.runtime}
                budget={movie.budget}
                revenue={movie.revenue}
            />
            <Grid header='Actors'>
                {
                    movie.actors.map(actor => (
                        <Actor
                            key={actor.credit_id}
                            name={actor.name}
                            character={actor.character}
                            imageUrl={
                                actor.profile_path
                                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                                : NoImage
                            }
                        />
                    ))
                }
            </Grid>
        </>
    );
};

export default Movie;