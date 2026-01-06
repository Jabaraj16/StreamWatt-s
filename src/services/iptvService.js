import axios from 'axios';

const BASE_URL = 'https://iptv-org.github.io/api';

// Cache for API data
let channelsCache = null;
let streamsCache = null;
let categoriesCache = null;
let countriesCache = null;
let languagesCache = null;

export const iptvService = {
  // Fetch all channels
  async getChannels() {
    if (channelsCache) return channelsCache;
    try {
      const response = await axios.get(`${BASE_URL}/channels.json`);
      channelsCache = response.data;
      return channelsCache;
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw error;
    }
  },

  // Fetch all streams
  async getStreams() {
    if (streamsCache) return streamsCache;
    try {
      const response = await axios.get(`${BASE_URL}/streams.json`);
      streamsCache = response.data;
      return streamsCache;
    } catch (error) {
      console.error('Error fetching streams:', error);
      throw error;
    }
  },

  // Fetch all categories
  async getCategories() {
    if (categoriesCache) return categoriesCache;
    try {
      const response = await axios.get(`${BASE_URL}/categories.json`);
      categoriesCache = response.data;
      return categoriesCache;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Fetch all countries
  async getCountries() {
    if (countriesCache) return countriesCache;
    try {
      const response = await axios.get(`${BASE_URL}/countries.json`);
      countriesCache = response.data;
      return countriesCache;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  },

  // Fetch all languages
  async getLanguages() {
    if (languagesCache) return languagesCache;
    try {
      const response = await axios.get(`${BASE_URL}/languages.json`);
      languagesCache = response.data;
      return languagesCache;
    } catch (error) {
      console.error('Error fetching languages:', error);
      throw error;
    }
  },

  // Get combined channel data with streams
  async getChannelsWithStreams() {
    try {
      const [channels, streams] = await Promise.all([
        this.getChannels(),
        this.getStreams()
      ]);

      // Map streams to channels
      const channelMap = new Map();
      
      channels.forEach(channel => {
        channelMap.set(channel.id, {
          ...channel,
          streams: []
        });
      });

      streams.forEach(stream => {
        if (channelMap.has(stream.channel)) {
          channelMap.get(stream.channel).streams.push(stream);
        }
      });

      // Convert map to array and filter channels with streams
      return Array.from(channelMap.values()).filter(channel => channel.streams.length > 0);
    } catch (error) {
      console.error('Error combining channels with streams:', error);
      throw error;
    }
  },

  // Clear cache
  clearCache() {
    channelsCache = null;
    streamsCache = null;
    categoriesCache = null;
    countriesCache = null;
    languagesCache = null;
  }
};
