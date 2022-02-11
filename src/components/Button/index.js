import React from "react";
import PropTypes from "prop-types";
// Styles
import { Wrapper } from './Button.styles'

const Button = ({ text, callback }) => (
    // The onClick handler will trigger the callback function that was passed down as a prop when clicked
    <Wrapper type="button" onClick={callback}>
        {text}
    </Wrapper>
);

Button.propTypes = {
    text: PropTypes.string,
    callback: PropTypes.func,
}

export default Button;