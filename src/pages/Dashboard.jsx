import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import SearchBar from '../components/SearchBar';
import FeaturedCarousel from '../components/FeaturedCarousel';
import RecommendationRow from '../components/RecommendationRow';
import ChannelCard from '../components/ChannelCard';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { useIPTV } from '../hooks/useIPTV';
import { useDebounce } from '../hooks/useDebounce';
import TvIcon from '@mui/icons-material/Tv';
import CategoryIcon from '@mui/icons-material/Category';
import PublicIcon from '@mui/icons-material/Public';
import './Dashboard.css';

const ITEMS_PER_PAGE = 20;

const Dashboard = () => {
    const navigate = useNavigate();
    const { channels, categories, countries, loading } = useIPTV();
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [popularChannels, setPopularChannels] = useState([]);
    const [filteredChannels, setFilteredChannels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (channels.length > 0) {
            // Show random popular channels as recommendations
            const shuffled = [...channels].sort(() => Math.random() - 0.5);
            setPopularChannels(shuffled.slice(0, 8));
        }
    }, [channels]);

    useEffect(() => {
        if (debouncedSearch && channels.length > 0) {
            const filtered = channels.filter(channel =>
                channel.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                channel.country?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                channel.categories?.some(cat => cat.toLowerCase().includes(debouncedSearch.toLowerCase()))
            );
            setFilteredChannels(filtered);
            setCurrentPage(1);
        } else {
            setFilteredChannels([]);
        }
    }, [debouncedSearch, channels]);

    const totalPages = Math.ceil(filteredChannels.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentChannels = filteredChannels.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return <Loader />;
    }

    // If user is searching, show search results
    if (debouncedSearch && filteredChannels.length >= 0) {
        return (
            <main className="dashboard-main">
                <SEO title="Search Results" description={`Search results for ${debouncedSearch}`} />
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Search Results</h1>
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search channels, countries..."
                    />
                </div>

                {filteredChannels.length > 0 ? (
                    <>
                        <p className="search-results-count">
                            Found {filteredChannels.length} channel{filteredChannels.length !== 1 ? 's' : ''} matching "{debouncedSearch}"
                        </p>
                        <p className="channels-count">
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredChannels.length)} of {filteredChannels.length}
                        </p>
                        <div className="channels-grid">
                            {currentChannels.map(channel => (
                                <ChannelCard key={channel.id} channel={channel} />
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="no-results">
                        <p>No channels found for "{debouncedSearch}"</p>
                        <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                            Clear Search
                        </button>
                    </div>
                )}
            </main>
        );
    }

    // Default dashboard view
    return (
        <main className="dashboard-main">
            <SEO title="Home" />
            <div className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search channels, countries..."
                />
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <TvIcon className="stat-icon" />
                    <div className="stat-info">
                        <h3 className="stat-value">{channels.length}</h3>
                        <p className="stat-label">Live Channels</p>
                    </div>
                </div>
                <div className="stat-card">
                    <CategoryIcon className="stat-icon" />
                    <div className="stat-info">
                        <h3 className="stat-value">{categories.length}</h3>
                        <p className="stat-label">Categories</p>
                    </div>
                </div>
                <div className="stat-card">
                    <PublicIcon className="stat-icon" />
                    <div className="stat-info">
                        <h3 className="stat-value">{countries.length}</h3>
                        <p className="stat-label">Countries</p>
                    </div>
                </div>
            </div>

            <FeaturedCarousel channels={channels} />

            {popularChannels.length > 0 && (
                <RecommendationRow
                    title="Popular Channels"
                    channels={popularChannels}
                />
            )}
        </main>
    );
};

export default Dashboard;
