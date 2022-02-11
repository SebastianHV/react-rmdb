import React from "react";
import PropTypes from "prop-types";
// Styles
import { Wrapper, Content } from './Grid.styles';

// We destructure the 2 props: header and children
// Children is a default prop in React
// When we nest stuff inside a component, they will be accessible in the children prop
const Grid = ({ header, children }) => (
    <Wrapper>
        <h1>{header}</h1>
        <Content>{children}</Content>
    </Wrapper>
);

// We don't need to typecheck the children becasue is a built-in prop
Grid.propTypes = {
    header: PropTypes.string,
}

export default Grid;