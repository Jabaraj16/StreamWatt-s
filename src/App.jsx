import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import EnhancedErrorBoundary from './components/EnhancedErrorBoundary';
import AppLayout from './layout/AppLayout';
import Loader from './components/Loader';
import './index.css';

// Lazy load pages for performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ChannelsPage = lazy(() => import('./pages/ChannelsPage'));
const PlayerPage = lazy(() => import('./pages/PlayerPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const CountriesPage = lazy(() => import('./pages/CountriesPage'));

function App() {
  return (
    <HelmetProvider>
      <EnhancedErrorBoundary>
        <Suspense fallback={<Loader />}>
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
        </Suspense>
      </EnhancedErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
