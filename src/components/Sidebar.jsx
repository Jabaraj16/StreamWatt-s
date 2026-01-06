import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import TvIcon from '@mui/icons-material/Tv';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CategoryIcon from '@mui/icons-material/Category';
import './Sidebar.css';

const Sidebar = () => {
    const menuItems = [
        { path: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
        { path: '/channels', icon: LiveTvIcon, label: 'All Channels' },
        { path: '/categories', icon: CategoryIcon, label: 'Categories' },
    ];

    return (
        <aside className="sidebar">
            <Link to="/" className="sidebar-logo" style={{ textDecoration: 'none' }}>
                <TvIcon className="logo-icon" />
                <span className="logo-text">StreamWatt's</span>
            </Link>
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
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
