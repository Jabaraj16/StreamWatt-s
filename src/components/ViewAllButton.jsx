import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
            <ExpandMoreIcon className="expand-icon" />
        </button>
    );
};

export default ViewAllButton;
