// Container component
import React from "react";
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// Components
import HeroImage from './HeroImage';
import Grid from './Grid'
import Thumb from './Thumb'
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";
// Hook
import { useHomeFetch } from '../hooks/useHomeFetch'
// Image
import NoImage from '../images/no_image.jpg'

const Home = () => {
    const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch();
    console.log(state);

    if (error) return <div>Something went wrong...</div>

    return (
        <>
            {/* This is a short crictuit, if the state.results[0] exists, then it will run the following code */}
            {/* {state.results[0] &&
                <HeroImage />
            } */}
            {/* We can also use a ternary operator instead */}
            {/* If we are searching, ie, we have a search term, we don't show the hero image */}
            {!searchTerm && state.results[0] ?
                <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                    title={state.results[0].original_title}
                    text={state.results[0].overview}
                />
                : null
            }
            {/* Our setter for the search term will be the prop we pass into the SearchBar component */}
            <SearchBar setSearchTerm={setSearchTerm} />
            {/* We change the header, depending on if we have a searchTerm  */}
            <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
                {state.results.map(movie => (
                    // <div key={movie.id}>{movie.title}</div>
                    <Thumb
                        key={movie.id}
                        clickable
                        image={
                            movie.poster_path
                                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                                : NoImage
                        }
                        movieId={movie.id}
                    />
                ))}
            </Grid>
            {/* We show the sppiner if we are loading */}
            {loading && <Spinner />}
            {/* We will check if we are showing the last page of mivies, so we don't show the buttonm once reached */}
            {state.page < state.total_pages && !loading && (
                // If the button is clicked it will trigger the callbakc function
                <Button text='Load More' callback={() => setIsLoadingMore(true)} />
            )}
        </>
    )
}

export default Home;