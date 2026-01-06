import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useRouteCleanup = (cleanupFn) => {
    const location = useLocation();

    useEffect(() => {
        return () => {
            if (cleanupFn) {
                cleanupFn();
            }
        };
    }, [location.pathname]);
};
