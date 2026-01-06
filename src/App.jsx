import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EnhancedErrorBoundary from './components/EnhancedErrorBoundary';
import AppLayout from './layout/AppLayout';
import Dashboard from './pages/Dashboard';
import ChannelsPage from './pages/ChannelsPage';
import PlayerPage from './pages/PlayerPage';
import CategoriesPage from './pages/CategoriesPage';
import CountriesPage from './pages/CountriesPage';
import './index.css';

function App() {
  return (
    <EnhancedErrorBoundary>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/channels" element={<ChannelsPage />} />
          <Route path="/channels/country/:countryCode" element={<ChannelsPage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/countries" element={<CountriesPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </EnhancedErrorBoundary>
  );
}

export default App;
