export const filterChannelsByCountry = (channels, countryCode) => {
    if (!countryCode) return channels;

    return channels.filter(channel =>
        channel.country &&
        channel.country.toLowerCase() === countryCode.toLowerCase()
    );
};

export const getCountryNameByCode = (countries, countryCode) => {
    if (!countryCode || !countries) return null;

    const country = countries.find(c =>
        c.code && c.code.toLowerCase() === countryCode.toLowerCase()
    );

    return country ? country.name : null;
};
