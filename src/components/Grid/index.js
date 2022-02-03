import React from "react";
// Styles
import { Wrapper, Content } from './Grid.styles';

// We destructure the 2 props: header and children
// Children is a default prop in React
// When we nest studd inside a component, they will be accessible in the children prop
const Grid = ({ header, children }) => (
    <Wrapper>
        <h1>{header}</h1>
        <Content>{children}</Content>
    </Wrapper>
)

export default Grid;