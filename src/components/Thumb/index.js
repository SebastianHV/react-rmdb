import React from "react";
// Styles
import { Image } from './Thumb.styles';

const Thumb = ({ image, movie, clickable }) => (
    <div>
        <Image src={image} alt='movie-thumb' />
    </div>
);

export default Thumb;