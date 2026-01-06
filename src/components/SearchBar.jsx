import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Search channels, countries...' }) => {
    return (
        <div className="search-bar">
            <SearchIcon className="search-icon" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
