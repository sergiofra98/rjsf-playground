import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

export const LoadingHelper = () => {
    return (
        <div className="col d-flex justify-content-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default LoadingHelper