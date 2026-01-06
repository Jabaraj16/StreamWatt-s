import React, { useEffect, useRef, useState } from 'react';
import './AdSlot.css';

const AdSlot = ({ slotId, format = 'auto', layoutKey, style, className = '' }) => {
    const [isAdLoaded, setIsAdLoaded] = useState(false);
    const adRef = useRef(null);

    useEffect(() => {
        // Prevent double loading or loading on unmounted component
        let isMounted = true;

        try {
            if (window.adsbygoogle && isMounted) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                setIsAdLoaded(true);
            }
        } catch (error) {
            console.error('AdSense error:', error);
        }

        return () => {
            isMounted = false;
        };
    }, [slotId]);

    // Development placeholder if no ID provided or localhost
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isDev && !slotId) {
        return (
            <div className={`ad-placeholder ${className}`} style={style}>
                <div className="ad-label">Ad Space ({format})</div>
                <div className="ad-mock-content"></div>
            </div>
        );
    }

    return (
        <div className={`ad-slot-container ${className}`} style={style}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', ...style }}
                data-ad-client="ca-pub-4184187094447841"
                data-ad-slot={slotId || "1234567890"}
                data-ad-format={format}
                data-full-width-responsive="true"
                data-ad-layout-key={layoutKey}
                ref={adRef}
            />
        </div>
    );
};

export default AdSlot;
