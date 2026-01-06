import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import SearchBar from '../components/SearchBar';
import SEO from '../components/SEO';
import ChannelCard from '../components/ChannelCard';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import { useIPTV } from '../hooks/useIPTV';
import { useDebounce } from '../hooks/useDebounce';
import { filterChannelsByCountry, getCountryNameByCode } from '../utils/filterChannelsByCountry';
import TvIcon from '@mui/icons-material/Tv';
import PublicIcon from '@mui/icons-material/Public';
import ClearIcon from '@mui/icons-material/Clear';
import './ChannelsPage.css';

const ITEMS_PER_PAGE = 20;

const ChannelsPage = () => {
    const { countryCode } = useParams();
    const navigate = useNavigate();
    const { channels, countries, loading } = useIPTV();
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [filteredChannels, setFilteredChannels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const contentRef = useRef(null);

    useEffect(() => {
        let filtered = channels;

        // Apply country filter if present
        if (countryCode) {
            filtered = filterChannelsByCountry(filtered, countryCode);
        }

        // Apply search filter
        if (debouncedSearch) {
            filtered = filtered.filter(channel =>
                channel.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                channel.country?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                channel.categories?.some(cat =>
                    cat.toLowerCase().includes(debouncedSearch.toLowerCase())
                )
            );
        }

        setFilteredChannels(filtered);
        setCurrentPage(1);
    }, [debouncedSearch, channels, countryCode]);

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            );
        }
    }, [countryCode]);

    const totalPages = Math.ceil(filteredChannels.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentChannels = filteredChannels.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleClearFilter = () => {
        navigate('/channels');
    };

    const countryName = countryCode ? getCountryNameByCode(countries, countryCode) : null;
    const pageTitle = countryName ? `Channels in ${countryName}` : 'All Channels';

    return (
        <main className="channels-main" ref={contentRef}>
            <SEO
                title={pageTitle}
                description={`Browse ${countryName ? `live TV channels from ${countryName}` : 'all live TV channels'} on StreamWatt's.`}
                url={`/channels${countryCode ? `/country/${countryCode}` : ''}`}
            />
            <div className="channels-header">
                <div className="header-title-section">
                    {countryCode && countryName ? (
                        <>
                            <PublicIcon className="country-header-icon" />
                            <div>
                                <h1 className="page-title">Channels in {countryName}</h1>
                                <p className="country-subtitle">
                                    {filteredChannels.length} channel{filteredChannels.length !== 1 ? 's' : ''} available
                                </p>
                            </div>
                        </>
                    ) : (
                        <h1 className="page-title">All Channels</h1>
                    )}
                </div>
                <div className="header-actions">
                    {countryCode && (
                        <button className="clear-filter-btn" onClick={handleClearFilter}>
                            <ClearIcon />
                            <span>Clear Filter</span>
                        </button>
                    )}
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search channels..."
                    />
                </div>
            </div>

            {loading ? (
                <div className="channels-grid">
                    {[...Array(12)].map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            ) : filteredChannels.length > 0 ? (
                <>
                    <p className="channels-count">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredChannels.length)} of {filteredChannels.length} channel{filteredChannels.length !== 1 ? 's' : ''}
                    </p>
                    <div className="channels-grid">
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
            ) : countryCode ? (
                <EmptyState
                    icon={PublicIcon}
                    title={`No channels found in ${countryName || 'this country'}`}
                    message="Try browsing all channels or select a different country"
                    action={{
                        label: 'View All Channels',
                        onClick: handleClearFilter
                    }}
                />
            ) : (
                <EmptyState
                    icon={TvIcon}
                    title="No channels found"
                    message="Try adjusting your search query"
                />
            )}
        </main>
    );
};

export default ChannelsPage;
