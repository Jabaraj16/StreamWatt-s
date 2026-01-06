import React from 'react';
import './EmptyState.css';

const EmptyState = ({ icon: Icon, title, message, action }) => {
    return (
        <div className="empty-state">
            <Icon className="empty-state-icon" />
            <h2 className="empty-state-title">{title}</h2>
            <p className="empty-state-message">{message}</p>
            {action && (
                <button className="empty-state-action" onClick={action.onClick}>
                    {action.label}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
