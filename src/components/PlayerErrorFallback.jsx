import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { getFallbackThumbnail } from '../utils/helpers';
import './PlayerErrorFallback.css';

const PlayerErrorFallback = ({ channel, onRetry, onReload, isRetrying, retryCount }) => {
    const navigate = useNavigate();
    const cardRef = useRef(null);
    const fallback = getFallbackThumbnail(channel?.name || 'Channel');

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            );
        }
    }, []);

    const handleGoBack = () => {
        navigate('/channels');
    };

    return (
        <div className="player-error-fallback" ref={cardRef}>
            <div className="error-fallback-card">
                <div className="fallback-thumbnail-container">
                    {channel?.logo ? (
                        <img
                            src={channel.logo}
                            alt={channel.name}
                            className="fallback-logo"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : null}
                    <div
                        className="fallback-thumbnail"
                        style={{
                            background: fallback.color,
                            display: channel?.logo ? 'none' : 'flex'
                        }}
                    >
                        {fallback.letter}
                    </div>
                </div>

                <h2 className="fallback-title">Channel Unavailable</h2>
                <p className="fallback-message">
                    This channel is currently unavailable.
                    {retryCount > 0 && ` (Retry ${retryCount}/2)`}
                </p>

                <div className="fallback-actions">
                    <button
                        className="fallback-btn primary"
                        onClick={onRetry}
                        disabled={isRetrying}
                    >
                        <span className="btn-icon">▶</span>
                        <span>{isRetrying ? 'Retrying...' : 'Try Again'}</span>
                    </button>
                    <button
                        className="fallback-btn secondary"
                        onClick={onReload}
                        disabled={isRetrying}
                    >
                        <span className="btn-icon">🔁</span>
                        <span>Reload Stream</span>
                    </button>
                    <button
                        className="fallback-btn tertiary"
                        onClick={handleGoBack}
                    >
                        <span className="btn-icon">⬅</span>
                        <span>Go Back to Channels</span>
                    </button>
                </div>

                {channel?.name && (
                    <p className="fallback-channel-name">{channel.name}</p>
                )}
            </div>
        </div>
    );
};

export default PlayerErrorFallback;
