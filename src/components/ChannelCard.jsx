import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getChannelThumbnail } from '../utils/helpers';
import CountryFlag from './CountryFlag';
import ChannelLogo from './ChannelLogo';
import './ChannelCard.css';

const ChannelCard = ({ channel }) => {
    const navigate = useNavigate();

    if (!channel) return null;

    const handleCardClick = () => {
        navigate(`/player/${channel.id}`, { state: { channel } });
    };

    return (
        <div className="channel-card" onClick={handleCardClick}>
            <div className="channel-thumbnail">
                <ChannelLogo
                    src={channel.logo}
                    name={channel.name}
                    size="xl"
                    className="card-logo"
                />
            </div>
            <div className="channel-info">
                <h3 className="channel-name">{channel.name || 'Unknown Channel'}</h3>
                <div className="channel-meta">
                    {channel.country && (
                        <div className="channel-country">
                            <CountryFlag code={channel.country} size="sm" showTooltip={false} />
                            <span className="country-text">{channel.country}</span>
                        </div>
                    )}
                    {channel.categories && channel.categories.length > 0 && (
                        <span className="channel-category">{channel.categories[0]}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChannelCard;
