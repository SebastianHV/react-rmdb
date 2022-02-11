// Here, we don't import react because we don't need the react library
import { useState, useEffect, useRef } from 'react'
// API
import API from '../API'; // This will give us the object with the methods 

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    // We give the initial state of the <<state> variable
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // We have a state kind of a flag, it will trigger a  when we click the button and is set to true
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // console.log(`searchTerm: ${searchTerm}`);

    // This function will fetch the movies from the API
    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            // This constant will grab the values fetched form the API
            const movies = await API.fetchMovies(searchTerm, page);

            // We put our movies on the state
            // The callback function  will be called with the previous state by the state setter
            // If we provide a state setter with a function, it is going to be called with the previous step <<prev>>
            //  Because we will return an object, we need to wrap the curly braces within parenthesis
            // We use the spread operator to create a new object with all the properties of the  <<movies>> object
            // WE SHOULD NEVER MUTATE THE STATE
            setState(prev => ({
                ...movies,
                // We will append the new movies to the old ones
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }))
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    }

    // Initial render and search
    // This will trigger only we mount the Home component, on the initial run
    // The empty array means it will only trigger when we start up the application and the Home compoennt mounts
    // Now that within the array is the searchTerm state, each time it changes, it will trigger this function
    useEffect(() => {
        // We have to wipe out the old state before we make a new search, so we show the new 
        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm])

    // Load More
    useEffect(() =>{
        if (!isLoadingMore) return;

        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
        
    }, [isLoadingMore, searchTerm, state.page])

    // We return an object with their respective property/attribute name 
    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore }
};