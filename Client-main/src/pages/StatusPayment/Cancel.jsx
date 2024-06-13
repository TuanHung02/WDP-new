import React from 'react';
import './styleStatus.scss'

const Cancel = () => {
    return (
        <div className="cancel-container">
            <h1 className="cancel-title">Payment Cancelled</h1>
            <p className="cancel-message">Your payment has been cancelled.</p>
        </div>
    );
};

export default Cancel;