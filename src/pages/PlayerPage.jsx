import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import PlayerErrorFallback from '../components/PlayerErrorFallback';
import RecommendationRow from '../components/RecommendationRow';
import CountryFlag from '../components/CountryFlag';
import ChannelLogo from '../components/ChannelLogo';
import { useIPTV } from '../hooks/useIPTV';
import { getCountryNameByCode } from '../utils/filterChannelsByCountry';
import { useRouteCleanup } from '../hooks/useRouteCleanup';
import { shareChannel } from '../utils/helpers';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './PlayerPage.css';

const PlayerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { channels, countries } = useIPTV();
    const [channel, setChannel] = useState(null);
    const [streamUrl, setStreamUrl] = useState('');
    const [hasError, setHasError] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [recommendations, setRecommendations] = useState([]);
    const videoPlayerRef = useRef(null);

    useEffect(() => {
        // Find channel by ID
        const foundChannel = channels.find(ch => ch.id === id);
        if (foundChannel) {
            setChannel(foundChannel);

            if (foundChannel.streams && foundChannel.streams.length > 0) {
                setStreamUrl(foundChannel.streams[0].url);
            }

            // Get recommendations from same country (non-personalized)
            if (foundChannel.country) {
                const sameCountry = channels.filter(ch =>
                    ch.country === foundChannel.country && ch.id !== foundChannel.id
                );
                const shuffled = sameCountry.sort(() => Math.random() - 0.5);
                setRecommendations(shuffled.slice(0, 6));
            }
        }
    }, [id, channels]);

    useRouteCleanup(() => {
        console.log('Cleaning up player on route change');
    });

    const handleStreamError = (errorData) => {
        console.error('Stream error in PlayerPage:', errorData);
        setHasError(true);
    };

    const handleRetry = (count) => {
        setRetryCount(count);
    };

    const handleManualRetry = () => {
        setHasError(false);
        setRetryCount(0);
        setIsRetrying(true);

        setTimeout(() => {
            setIsRetrying(false);
            if (channel.streams && channel.streams.length > 0) {
                setStreamUrl(channel.streams[0].url);
            }
        }, 500);
    };

    const handleReloadStream = () => {
        window.location.reload();
    };

    const handleShare = async () => {
        const success = await shareChannel(channel);
        if (success) {
            alert('Link copied to clipboard!');
        }
    };

    if (!channel) {
        return (
            <main className="player-main">
                <p>Channel not found</p>
            </main>
        );
    }

    const countryName = channel.country ? getCountryNameByCode(countries, channel.country) : null;

    return (
        <main className="player-main">
            <button className="back-button" onClick={() => navigate(-1)}>
                <ArrowBackIcon />
                <span>Back</span>
            </button>

            <div className="player-container">
                {streamUrl ? (
                    hasError ? (
                        <PlayerErrorFallback
                            channel={channel}
                            onRetry={handleManualRetry}
                            onReload={handleReloadStream}
                            isRetrying={isRetrying}
                            retryCount={retryCount}
                        />
                    ) : (
                        <VideoPlayer
                            ref={videoPlayerRef}
                            streamUrl={streamUrl}
                            autoPlay={true}
                            onError={handleStreamError}
                            onRetry={handleRetry}
                        />
                    )
                ) : (
                    <div className="no-stream">
                        <p>No stream available for this channel</p>
                    </div>
                )}
            </div>

            <div className="channel-details">
                <div className="details-header">
                    <div className="header-left">
                        <div className="player-title-row">
                            <ChannelLogo src={channel.logo} name={channel.name} size="lg" />
                            <div>
                                <h1 className="channel-title">{channel.name}</h1>
                                <div className="channel-meta-info">
                                    {channel.country && (
                                        <span className="meta-tag country-meta">
                                            <CountryFlag code={channel.country} size="md" />
                                            <span>{countryName || channel.country}</span>
                                        </span>
                                    )}
                                    {channel.categories && channel.categories.map(cat => (
                                        <span key={cat} className="meta-tag category">{cat}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="action-btn" onClick={handleShare}>
                            <ShareIcon />
                        </button>
                    </div>
                </div>

                {channel.network && (
                    <div className="detail-row">
                        <strong>Network:</strong> {channel.network}
                    </div>
                )}

                {channel.website && (
                    <div className="detail-row">
                        <strong>Website:</strong>{' '}
                        <a href={channel.website} target="_blank" rel="noopener noreferrer">
                            {channel.website}
                        </a>
                    </div>
                )}

                {channel.streams && channel.streams.length > 1 && (
                    <div className="streams-list">
                        <strong>Available Streams:</strong>
                        <div className="stream-options">
                            {channel.streams.map((stream, index) => (
                                <button
                                    key={index}
                                    className={`stream-option ${stream.url === streamUrl ? 'active' : ''}`}
                                    onClick={() => {
                                        setHasError(false);
                                        setRetryCount(0);
                                        setStreamUrl(stream.url);
                                    }}
                                >
                                    Stream {index + 1} {stream.quality && `(${stream.quality})`}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {recommendations.length > 0 && (
                <RecommendationRow
                    title={countryName ? `More from ${countryName}` : 'More Channels'}
                    channels={recommendations}
                />
            )}
        </main>
    );
};

export default PlayerPage;
