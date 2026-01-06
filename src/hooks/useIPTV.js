import { useState, useEffect } from 'react';
import { iptvService } from '../services/iptvService';

export const useIPTV = () => {
    const [channels, setChannels] = useState([]);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [channelsData, categoriesData, countriesData, languagesData] = await Promise.all([
                    iptvService.getChannelsWithStreams(),
                    iptvService.getCategories(),
                    iptvService.getCountries(),
                    iptvService.getLanguages()
                ]);

                setChannels(channelsData);
                setCategories(categoriesData);
                setCountries(countriesData);
                setLanguages(languagesData);
            } catch (err) {
                setError(err.message || 'Failed to fetch data');
                console.error('Error fetching IPTV data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Memoize return value to prevent unnecessary re-renders in consumers
    if (loading) {
        // Return stable loading object
        return { channels: [], categories: [], countries: [], languages: [], loading: true, error: null };
    }

    return {
        channels,
        categories,
        countries,
        languages,
        loading,
        error
    };
};
