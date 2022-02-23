// Container component
import React, { Component } from "react";
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// Components
import HeroImage from './HeroImage';
import Grid from './Grid'
import Thumb from './Thumb'
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";
// Image
import NoImage from '../images/no_image.jpg'
// API
import API from '../API'; // This will give us the object with the methods 

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

class Home extends Component {

    // This is the structure of the state
    state = {
        movies: initialState,
        searchTerm: '',
        isLoadingMore: false,
        loading: false,
        error: false,
    }

    // This function will fetch the movies from the API
    fetchMovies = async (page, searchTerm = "") => {
        try {
            // We change the properties of the state instead of ussing the seter method of the hook
            // Other properties will stay the same
            this.setState({ error: false, loading: true });

            // This constant will grab the values fetched form the API
            const movies = await API.fetchMovies(searchTerm, page);

            // We put our movies on the state
            // The callback function  will be called with the previous state by the state setter
            // If we provide a state setter with a function, it is going to be called with the previous step <<prev>>
            //  Because we will return an object, we need to wrap the curly braces within parenthesis
            // We use the spread operator to create a new object with all the properties of the  <<movies>> object
            // WE SHOULD NEVER MUTATE THE STATE
            this.setState(prev => ({
                // We spread out the previous state
                ...prev,
                // Inside this property we will place everything that is retuerned from the database API
                movies: {
                    ...movies,
                    // We will append the new movies to the old ones
                    results:
                        page > 1 ? [...prev.movies.results, ...movies.results] : [...movies.results]

                },
                loading: false,
            }))
        } catch (error) {
            this.setState({ error: true, loading: false })
        }
    }

    handleSearch = searchTerm => {
        this.setState({ movies: initialState, searchTerm }, () =>
            // We want to do something when the state has updated
            // setState has a callback function that will trigger when the new state is set
            // We use thuis callback funtion to fetchMovies with the new searchTerm
            this.fetchMovies(1, this.state.searchTerm)
        )
    }

    handleLoadMore = () =>
        this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);

    // To make the first fetch
    componentDidMount() {
        this.fetchMovies(1);
    }

    render() {

        // We destructure the state into separate variables, so is easir to handle them
        const { searchTerm, movies, loading, error } = this.state;

        if (error) return <div>Something went wrong...</div>

        return (
            <>
                {/* This is a short crictuit, if the state.results[0] exists, then it will run the following code */}
                {/* {state.results[0] &&
                    <HeroImage />
                } */}
                {/* We can also use a ternary operator instead */}
                {/* If we are searching, ie, we have a search term, we don't show the hero image */}
                {!searchTerm && movies.results[0] ?
                    <HeroImage
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
                        title={movies.results[0].original_title}
                        text={movies.results[0].overview}
                    />
                    : null
                }
                {/* Our setter for the search term will be the prop we pass into the SearchBar component */}
                <SearchBar setSearchTerm={this.handleSearch} />
                {/* We change the header, depending on if we have a searchTerm  */}
                <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
                    {movies.results.map(movie => (
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
                {movies.page < movies.total_pages && !loading && (
                    // If the button is clicked it will trigger the callbakc function
                    <Button text='Load More' callback={this.handleLoadMore} />
                )}
            </>
        )
    }


}

export default Home;