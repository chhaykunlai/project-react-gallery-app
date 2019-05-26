import React from 'react';

import Gallery from './Gallery.js';
import NoGallery from './NoGallery.js';

const Results = props => {
    const results = props.images;
    let galleries;
    if (results && results.length) {
        galleries = results.map(image => {
            return <Gallery
                        key={ image.id }
                        url={ `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg` }
                        alt={ image.title }
                    />
        });
    } else {
        galleries = <NoGallery />
    }

    if (props.isLoad) {
        return <p>Loading...</p>;
    }

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                { galleries }
            </ul>
        </div>
    );
};

export default Results;