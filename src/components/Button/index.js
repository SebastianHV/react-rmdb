import React from "react";
// Styles
import { Wrapper } from './Button.styles'

const Button = ({ text, callback }) => (
    // The onClick handler will trigger the callback function that was passed down as a prop when clicked
    <Wrapper type="button" onClick={callback}>
        {text}
    </Wrapper>
);

export default Button;