import React, { useState, useEffect } from 'react';
import ChannelCard from '../components/ChannelCard';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import ViewAllButton from '../components/ViewAllButton';
import { useIPTV } from '../hooks/useIPTV';
import CategoryIcon from '@mui/icons-material/Category';
import './CategoriesPage.css';

const ITEMS_PER_PAGE = 20;
const TOP_COUNTRIES_COUNT = 8;

const CategoriesPage = () => {
    const { channels, categories, countries, languages } = useIPTV();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [filteredChannels, setFilteredChannels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [countryChannelCounts, setCountryChannelCounts] = useState({});

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
        let filtered = channels;

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(channel =>
                channel.categories?.some(cat => selectedCategories.includes(cat))
            );
        }

        if (selectedCountries.length > 0) {
            filtered = filtered.filter(channel =>
                selectedCountries.includes(channel.country)
            );
        }

        if (selectedLanguages.length > 0) {
            filtered = filtered.filter(channel =>
                channel.languages?.some(lang => selectedLanguages.includes(lang))
            );
        }

        setFilteredChannels(filtered);
        setCurrentPage(1);
    }, [selectedCategories, selectedCountries, selectedLanguages, channels]);

    const toggleCategory = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(c => c !== categoryId)
                : [...prev, categoryId]
        );
    };

    const toggleCountry = (countryCode) => {
        setSelectedCountries(prev =>
            prev.includes(countryCode)
                ? prev.filter(c => c !== countryCode)
                : [...prev, countryCode]
        );
    };

    const toggleLanguage = (langCode) => {
        setSelectedLanguages(prev =>
            prev.includes(langCode)
                ? prev.filter(l => l !== langCode)
                : [...prev, langCode]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedCountries([]);
        setSelectedLanguages([]);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const hasFilters = selectedCategories.length > 0 || selectedCountries.length > 0 || selectedLanguages.length > 0;
    const uniqueCategories = [...new Set(channels.flatMap(ch => ch.categories || []))].sort();

    // Get top countries by channel count
    const topCountries = countries
        .filter(country => countryChannelCounts[country.code] > 0)
        .sort((a, b) => (countryChannelCounts[b.code] || 0) - (countryChannelCounts[a.code] || 0))
        .slice(0, TOP_COUNTRIES_COUNT);

    const totalPages = Math.ceil(filteredChannels.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentChannels = filteredChannels.slice(startIndex, endIndex);

    return (
        <main className="categories-main">
            <div className="categories-header">
                <h1 className="page-title">Filter By Categories</h1>
                {hasFilters && (
                    <button className="clear-filters-btn" onClick={clearFilters}>
                        Clear All Filters
                    </button>
                )}
            </div>

            <div className="filters-section">
                <div className="filter-group">
                    <h3 className="filter-title">Categories</h3>
                    <div className="filter-tags">
                        {uniqueCategories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-tag ${selectedCategories.includes(cat) ? 'active' : ''}`}
                                onClick={() => toggleCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <h3 className="filter-title">Countries</h3>
                    <div className="filter-tags">
                        {topCountries.map((country) => (
                            <button
                                key={country.code}
                                className={`filter-tag ${selectedCountries.includes(country.code) ? 'active' : ''}`}
                                onClick={() => toggleCountry(country.code)}
                            >
                                {country.flag} {country.name}
                            </button>
                        ))}
                    </div>
                    <ViewAllButton to="/categories/countries">
                        View All Countries
                    </ViewAllButton>
                </div>
            </div>

            {filteredChannels.length > 0 ? (
                <>
                    <p className="results-count">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredChannels.length)} of {filteredChannels.length} channel{filteredChannels.length !== 1 ? 's' : ''} found
                    </p>
                    <div className="results-grid">
                        {currentChannels.map((channel) => (
                            <ChannelCard key={channel.id} channel={channel} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : hasFilters ? (
                <EmptyState
                    icon={CategoryIcon}
                    title="No channels found"
                    message="Try adjusting your filters"
                />
            ) : (
                <EmptyState
                    icon={CategoryIcon}
                    title="Select filters"
                    message="Choose categories, countries, or languages to filter channels"
                />
            )}
        </main>
    );
};

export default CategoriesPage;
