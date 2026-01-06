import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ChannelCard from './ChannelCard';
import './FeaturedCarousel.css';

const FeaturedCarousel = ({ channels }) => {
    const carouselRef = useRef(null);

    useEffect(() => {
        if (channels.length > 0 && carouselRef.current) {
            const cards = carouselRef.current.querySelectorAll('.channel-card');
            gsap.fromTo(
                cards,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power3.out'
                }
            );

            return () => {
                gsap.killTweensOf(cards);
            };
        }
    }, [channels]);

    const featuredChannels = channels.slice(0, 6);

    if (featuredChannels.length === 0) return null;

    return (
        <div className="featured-carousel">
            <h2 className="carousel-title">Featured Channels</h2>
            <div className="carousel-grid" ref={carouselRef}>
                {featuredChannels.map((channel) => (
                    <ChannelCard key={channel.id} channel={channel} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedCarousel;
