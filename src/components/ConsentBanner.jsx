import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ConsentBanner.css';

const ConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consentGiven = localStorage.getItem('streamWatt_consent_given');
        if (!consentGiven) {
            // Small delay to prevent layout jump on load
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('streamWatt_consent_given', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="consent-banner">
            <div className="consent-content">
                <p>
                    StreamWatt's uses cookies to enhance your experience and display ads.
                    By continuing to visit this site you agree to our use of cookies.
                </p>
                <div className="consent-actions">
                    <Link to="/privacy-policy" className="learn-more-link">
                        Learn More
                    </Link>
                    <button className="accept-btn" onClick={handleAccept}>
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsentBanner;
