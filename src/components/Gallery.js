import React from 'react';

const Gallery = props => {
    return (
        <li>
            <img src={ props.url } alt={ props.alt} />
        </li>
    );
};

export default Gallery;