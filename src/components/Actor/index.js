import React from "react";
import PropTypes from "prop-types";
// Styles
import { Wrapper, Image } from "./Actor.styles";

const Actor = ({ name, character, imageUrl }) => (
    <Wrapper>
        <Image src={imageUrl} alt='actor-thumb' />
        <h3>{name}</h3>
        <p>{character}</p>
    </Wrapper>
);

// We use propTypes to verify and check that the type of the prop that we are sending into the Compoenent is correct (string, number, array, object, fucntion, etc.)
// Available on development mode only. We don't see the warnings in production.
Actor.propTypes = {
    // Here, we verify that the props we are receiving are strings
    name: PropTypes.string,
    character: PropTypes.string,
    imageUrl: PropTypes.string,
}

export default Actor;