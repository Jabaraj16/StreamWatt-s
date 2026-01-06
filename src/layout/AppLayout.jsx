import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdSlot from '../components/AdSlot';
import ConsentBanner from '../components/ConsentBanner';
import './AppLayout.css';

const AppLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="app-layout">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>

            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={closeSidebar}></div>
            )}

            <div className="app-content">
                <Outlet />

                <footer className="app-footer">
                    <AdSlot slotId="2468135790" className="ad-footer" />
                    <div className="footer-links">
                        <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
                        <span className="footer-separator">•</span>
                        <span>StreamWatt's © {new Date().getFullYear()}</span>
                    </div>
                </footer>
            </div>

            <ConsentBanner />
        </div>
    );
};

export default AppLayout;
