import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <React.Fragment>
            <h2>404</h2>
            <p><img className="not-found-image" src={require('../images/not-found.png')} alt="Not found" /> There is not a Gallery page site here.</p>
            <br/>
            <p><Link to="/">Go back to home page</Link></p>
        </React.Fragment>
    );
};

export default NotFound;