import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpandMore } from '@mui/icons-material';
import './ViewAllButton.css';

const ViewAllButton = ({ to, children }) => {
    const navigate = useNavigate();

    return (
        <button
            className="view-all-button"
            onClick={() => navigate(to)}
            aria-label={children}
        >
            <span>{children}</span>
            <ExpandMore className="expand-icon" />
        </button>
    );
};

export default ViewAllButton;
