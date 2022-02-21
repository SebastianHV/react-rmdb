/* We are going to create a Controlled Component
We will have our input field controlled by Reatc
The input field will be based in the value in the state
We will use useEffect to trigger when the local state changes
And we will update the searchterm so it will fetch new movies */
import React, { Component } from "react";
import PropTypes from "prop-types";
// Image
import searchIcon from '../../images/search-icon.svg';
// Styles
import { Wrapper, Content } from './SearchBar.styles';

// Everytime we tyope something in, we are gonna set the state
// and that will update the component and it will trigger the componentDidUpdate funtion

class SearchBar extends Component {
    // This state will store the value of the input field
    // Babel and Webpack will make sure it transiples corrwectly, we don't need a constructor
    state = { value: '' };
    timeout = null;

    // We martk with an underscore prevProps because we are not going to use them 
    // This function will trigger in each update of the component
    componentDidUpdate(_prevProps, prevState) {
        // If the value in the state is not same as te previous one, we make the following
        if (this.state.value !== prevState.value) {
            const { setSearchTerm } = this.props;

            clearTimeout(this.timeout);

            // We use a timer each time the value in the input field changes, so it can wait 500ms until the searchTerm changes (via setSearchTerm)
            this.timeout = setTimeout(() => {
                const { value } = this.state;
                setSearchTerm(value);
            }, 500)
        }
    }

    render() {

        // We can destructure the state
        const { value } = this.state.value;

        return (
            <Wrapper>
                <Content>
                    <img src={searchIcon} alt="search-icon" />
                    <input
                        type="text"
                        placeholder="Search Movie"
                        // Event handler
                        // event.currentTarget.value will give us the current value in the input field
                        // We set the value in the state when we type something in
                        onChange={event => this.setState( { value : event.currentTarget.value })}
                        // We set the value of the inpuit field from the value in the state
                        value={value}
                    />
                </Content>
            </Wrapper >
        );
    }
};

SearchBar.propTypes = {
    setSearchTerm: PropTypes.func,
};

export default SearchBar;