import { useState, useEffect } from "react";
// We do not import React because we are note using JSX
import API from '../API';
// Helpers
import { isPersistedState } from "../helpers";

export const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // We can aslo define our fetchMovie function outside of the useEffect
    // But to avoid recreating the function each render and the useEffect think it's a nre function and thus an infinity loop
    // We wrap this function into a useCallback hook
    /* 
    const fetchMovie = useCallback( async () => {
        try {
            setLoading(true);
            setError(false);

            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);
            // Get directors only
            const directors = credits.crew.filter(
                member => member.job === 'Director'
            );

            setState({
                // With the spread operator we put everything the fetchMovie method returns in the movie const
                ...movie,
                // Also, we add the actors in another property/attribute, we can find the actors wuithin cast property/attribute in the credits object
                actors: credits.cast,
                // We also add the directors. ES6 Syntax, we add a property with the same name as the directos const
                directors
            })

            setLoading(false);
        } catch (error) {
            setError(true);
        }, [movieId, ]);
     */

    useEffect(() => {
        // We define our async function inside a useEffect hook
        const fetchMovie = async () => {
            try {
                setLoading(true);
                setError(false);

                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);
                // Get directors only
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );

                setState({
                    // With the spread operator we put everything the fetchMovie method returns in the movie const
                    ...movie,
                    // Also, we add the actors in another property/attribute, we can find the actors wuithin cast property/attribute in the credits object
                    actors: credits.cast,
                    // We also add the directors. ES6 Syntax, we add a property with the same name as the directos const
                    directors
                })

                setLoading(false);
            } catch (error) {
                setError(true);
            }

        };

        // First, we check if we already have the movie we are loooking for in the sessionStorage
        const sessionState = isPersistedState(movieId);
        // If we do have the movie in the sessionStorage, we set the state from the sessionState, instead of using the API
        if (sessionState) {
            setState(sessionState);
            setLoading(false);
            return;
        }

        // Here, we call the fetchMovie function we created above
        fetchMovie();

    }, [movieId]);

    // Write to sessionStorage
    useEffect(() => {
        sessionStorage.setItem(movieId, JSON.stringify(state));
    }, [movieId, state])

    return { state, loading, error };
};