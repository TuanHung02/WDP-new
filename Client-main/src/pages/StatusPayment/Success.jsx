import React from 'react';
import './styleStatus.scss'

const Success = () => {
    return (
        <div className="success-container">
            <h1 className="success-title">Payment Successful</h1>
            <p className="success-message">Thank you for your payment!</p>
        </div>
    );
};

export default Success;