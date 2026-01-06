// Format date to readable string
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString();
};

// Get fallback thumbnail if logo is missing
export const getFallbackThumbnail = (channelName) => {
    const firstLetter = channelName?.charAt(0).toUpperCase() || 'T';
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    const colorIndex = firstLetter.charCodeAt(0) % colors.length;

    return {
        letter: firstLetter,
        color: colors[colorIndex]
    };
};

// Get channel thumbnail URL or generate placeholder
export const getChannelThumbnail = (channel) => {
    // If channel has a logo, use it
    if (channel.logo) {
        return channel.logo;
    }

    // Generate a data URL for a colored placeholder with first letter
    const fallback = getFallbackThumbnail(channel.name);
    const svg = `
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="${fallback.color}"/>
            <text x="50%" y="50%" font-size="80" fill="white" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-weight="bold">
                ${fallback.letter}
            </text>
        </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
};


// Validate stream URL
export const isValidStreamUrl = (url) => {
    if (!url) return false;
    try {
        new URL(url);
        return url.startsWith('http://') || url.startsWith('https://');
    } catch {
        return false;
    }
};

// Share functionality
export const shareChannel = async (channel) => {
    const shareData = {
        title: channel.name,
        text: `Watch ${channel.name} on IPTV Streaming`,
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
            return true;
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(window.location.href);
            return true;
        }
    } catch (error) {
        console.error('Error sharing:', error);
        return false;
    }
};

// Get country flag emoji
export const getCountryFlag = (countryCode) => {
    if (!countryCode || countryCode.length !== 2) return '🌍';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};
