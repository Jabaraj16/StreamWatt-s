import React, { useState, useMemo } from 'react';
import './ChannelLogo.css';

const ChannelLogo = ({ src, name, size = 'md', className = '' }) => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Memoize initials generation
    const initials = useMemo(() => {
        if (!name) return '?';
        return name
            .split(' ')
            .map(part => part[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    }, [name]);

    // Generate consistent gradient based on name
    const gradientStyle = useMemo(() => {
        if (!name) return {};
        const colors = [
            ['#FF9A9E', '#FECFEF'],
            ['#a18cd1', '#fbc2eb'],
            ['#fad0c4', '#ffd1ff'],
            ['#ffecd2', '#fcb69f'],
            ['#ff9a9e', '#fecfef'],
            ['#a1c4fd', '#c2e9fb'],
            ['#667eea', '#764ba2'],
            ['#89f7fe', '#66a6ff'],
            ['#4facfe', '#00f2fe'],
            ['#43e97b', '#38f9d7']
        ];

        const index = name.charCodeAt(0) % colors.length;
        const [start, end] = colors[index];

        return {
            background: `linear-gradient(135deg, ${start} 0%, ${end} 100%)`
        };
    }, [name]);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoading(false);
    };

    if (!src || hasError) {
        return (
            <div
                className={`channel-logo placeholder size-${size} ${className}`}
                style={gradientStyle}
                aria-label={name}
            >
                <span className="logo-initials">{initials}</span>
            </div>
        );
    }

    return (
        <div className={`channel-logo size-${size} ${className}`}>
            {isLoading && <div className="logo-skeleton" />}
            <img
                src={src}
                alt={name}
                className={`logo-image ${isLoading ? 'hidden' : 'visible'}`}
                onLoad={handleLoad}
                onError={handleError}
                loading="lazy"
                decoding="async"
            />
        </div>
    );
};

export default React.memo(ChannelLogo);
