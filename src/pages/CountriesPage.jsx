import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import SearchBar from '../components/SearchBar';
import CountryCard from '../components/CountryCard';
import Loader from '../components/Loader';
import { useIPTV } from '../hooks/useIPTV';
import { useDebounce } from '../hooks/useDebounce';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PublicIcon from '@mui/icons-material/Public';
import './CountriesPage.css';

const CountriesPage = () => {
    const navigate = useNavigate();
    const { channels, countries, loading } = useIPTV();
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [countryChannelCounts, setCountryChannelCounts] = useState({});
    const cardsRef = useRef([]);
    const pageRef = useRef(null);

    useEffect(() => {
        // Calculate channel counts per country
        const counts = {};
        channels.forEach(channel => {
            if (channel.country) {
                counts[channel.country] = (counts[channel.country] || 0) + 1;
            }
        });
        setCountryChannelCounts(counts);
    }, [channels]);

    useEffect(() => {
        let filtered = countries.filter(country =>
            countryChannelCounts[country.code] > 0
        );

        if (debouncedSearch) {
            filtered = filtered.filter(country =>
                country.name.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
        }

        // Sort alphabetically
        filtered.sort((a, b) => a.name.localeCompare(b.name));

        setFilteredCountries(filtered);
    }, [debouncedSearch, countries, countryChannelCounts]);

    useEffect(() => {
        if (pageRef.current) {
            gsap.fromTo(
                pageRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            );
        }
    }, []);

    useEffect(() => {
        if (cardsRef.current.length > 0) {
            gsap.fromTo(
                cardsRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: 'power2.out'
                }
            );
        }
    }, [filteredCountries]);

    if (loading) {
        return <Loader />;
    }

    // Group countries by first letter
    const groupedCountries = filteredCountries.reduce((acc, country) => {
        const firstLetter = country.name[0].toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(country);
        return acc;
    }, {});

    const letters = Object.keys(groupedCountries).sort();

    return (
        <main className="countries-page" ref={pageRef}>
            <div className="countries-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                    <span>Back</span>
                </button>
                <div className="header-content">
                    <div className="header-info">
                        <PublicIcon className="header-icon" />
                        <div>
                            <h1 className="page-title">All Countries</h1>
                            <p className="page-subtitle">
                                {filteredCountries.length} countries with live channels
                            </p>
                        </div>
                    </div>
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search countries..."
                    />
                </div>
            </div>

            <div className="countries-content">
                {filteredCountries.length > 0 ? (
                    <div className="countries-list">
                        {letters.map(letter => (
                            <div key={letter} className="country-group">
                                <div className="group-letter" id={`letter-${letter}`}>{letter}</div>
                                <div className="country-grid">
                                    {groupedCountries[letter].map((country, index) => (
                                        <div
                                            key={country.code}
                                            ref={el => cardsRef.current[index] = el}
                                        >
                                            <CountryCard
                                                country={country}
                                                channelCount={countryChannelCounts[country.code] || 0}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <PublicIcon className="no-results-icon" />
                        <h3>No countries found</h3>
                        <p>Try adjusting your search query</p>
                    </div>
                )}
            </div>

            {/* A-Z Quick Jump */}
            {!searchQuery && letters.length > 5 && (
                <div className="quick-jump">
                    {letters.map(letter => (
                        <a
                            key={letter}
                            href={`#letter-${letter}`}
                            className="quick-jump-letter"
                        >
                            {letter}
                        </a>
                    ))}
                </div>
            )}
        </main>
    );
};

export default CountriesPage;
