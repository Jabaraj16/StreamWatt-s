import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCountryFlag } from '../utils/helpers';
import './CountryCard.css';

const CountryCard = ({ country, channelCount }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/channels/country/${country.code}`);
    };

    return (
        <div className="country-card" onClick={handleClick}>
            <div className="country-flag">{country.flag || getCountryFlag(country.code)}</div>
            <div className="country-info">
                <h3 className="country-name">{country.name}</h3>
                <p className="country-channels">{channelCount} channels</p>
            </div>
        </div>
    );
};

export default CountryCard;
