import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ChannelCard from './ChannelCard';
import SkeletonCard from './SkeletonCard';
import './RecommendationRow.css';

const RecommendationRow = ({ title, channels, loading = false }) => {
    const rowRef = useRef(null);

    useEffect(() => {
        if (rowRef.current && channels.length > 0) {
            const cards = rowRef.current.querySelectorAll('.channel-card');
            gsap.fromTo(
                cards,
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }
            );

            return () => {
                gsap.killTweensOf(cards);
            };
        }
    }, [channels]);

    if (!loading && (!channels || channels.length === 0)) {
        return null;
    }

    return (
        <div className="recommendation-section">
            <h2 className="recommendation-title">{title}</h2>
            <div className="recommendation-scroll" ref={rowRef}>
                <div className="recommendation-grid">
                    {loading ? (
                        [...Array(6)].map((_, index) => (
                            <div key={index} className="recommendation-card-wrapper">
                                <SkeletonCard />
                            </div>
                        ))
                    ) : (
                        channels.map(channel => (
                            <div key={channel.id} className="recommendation-card-wrapper">
                                <ChannelCard channel={channel} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecommendationRow;
