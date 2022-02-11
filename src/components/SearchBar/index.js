/* We are going to create a Controlled Component
We will have our input field controlled by Reatc
The input field will be based in the value in the state
We will use useEffect to trigger when the local state changes
And we will update the searchterm so it will fetch new movies */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// Image
import searchIcon from '../../images/search-icon.svg';
// Styles
import { Wrapper, Content } from './SearchBar.styles';

const SearchBar = ({ setSearchTerm }) => {
    // This state will store the value of the input field
    const [state, setState] = useState('');

    // We want to trigger fetch when the user has typed something in
    // So when we call the useRef hook, it will create a mutable value for us that youccan compare to something similar
    // as a mutable variable
    const initial = useRef(true);

    // The actual value will be in the 'initial.current' property
    // This property will hold the value 'true'

    // This hook will trigger on the initial render
    useEffect(() => {

        // If this is the inital rerender, it will change the ref value to false and then, it will return
        if (initial.current) {
            // We can mutate this value directly
            // It won't trigger a rerender
            initial.current = false
            return
        }

        // We use a timer each time the value in the input field changes, so it can wait 500ms until the searchTerm changes (via setSearchTerm)
        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 500)

        // We clear our timer in each render, so we only have 1 timer
        return () => clearTimeout(timer);

    },[setSearchTerm, state])

    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt="search-icon" />
                <input
                    type="text"
                    placeholder="Search Movie"
                    // Event handler
                    // event.currentTarget.value will give us the current value in the input field
                    onChange={event => setState(event.currentTarget.value)}
                    // We set the value to the state
                    value={state}
                />
            </Content>
        </Wrapper>
    );
};

SearchBar.propTypes = {
    setSearchTerm: PropTypes.func,
};

export default SearchBar;