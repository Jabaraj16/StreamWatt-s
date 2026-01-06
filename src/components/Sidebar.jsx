import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import TvIcon from '@mui/icons-material/Tv';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CategoryIcon from '@mui/icons-material/Category';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
    const menuItems = [
        { path: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
        { path: '/channels', icon: LiveTvIcon, label: 'All Channels' },
        { path: '/categories', icon: CategoryIcon, label: 'Categories' },
    ];

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <Link to="/" className="sidebar-logo" style={{ textDecoration: 'none' }} onClick={onClose}>
                    <TvIcon className="logo-icon" />
                    <span className="logo-text">StreamWatt's</span>
                </Link>
                {/* Close button for mobile inside sidebar */}
                <button className="sidebar-close-btn" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                        onClick={onClose}
                    >
                        <item.icon className="nav-icon" />
                        <span className="nav-label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="sidebar-footer">
                <p className="footer-text">Public Live TV</p>
                <p className="footer-subtext">Watch Free Channels</p>
            </div>
        </aside>
    );
};

export default Sidebar;
