import React from 'react';
// Styles
import { Wrapper, Content, Text } from './HeroImage.styles'

// A prop is a value we can send into a component, so that component can change dinamically
// A prop should never be changed inside a component that receives the props
const HeroImage = ({ image, title, text }) => (
    <Wrapper image={image}>
        <Content>
            <Text>
                <h1>{title}</h1>
                <p>{text}</p>
            </Text>
        </Content>
    </Wrapper>
);

export default HeroImage;