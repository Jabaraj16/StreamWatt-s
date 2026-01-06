import React, { useState } from 'react';
import PublicIcon from '@mui/icons-material/Public';
import './CountryFlag.css';

const CountryFlag = ({ code, size = 'sm', showTooltip = true }) => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    if (!code || hasError) {
        return (
            <div
                className={`country-flag-container size-${size} fallback`}
                title={showTooltip ? 'Country unknown' : ''}
            >
                <PublicIcon className="fallback-icon" />
            </div>
        );
    }

    const flagUrl = `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
    const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(code.toUpperCase());

    return (
        <div
            className={`country-flag-container size-${size}`}
            title={showTooltip ? `Country: ${countryName}` : ''}
        >
            {isLoading && <div className="flag-skeleton" />}
            <img
                src={flagUrl}
                alt={`${countryName} flag`}
                className="country-flag-img"
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setHasError(true);
                    setIsLoading(false);
                }}
                style={{ display: isLoading ? 'none' : 'block' }}
            />
        </div>
    );
};

export default CountryFlag;
