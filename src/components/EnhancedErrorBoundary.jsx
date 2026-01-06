import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnhancedErrorBoundary.css';

class EnhancedErrorBoundaryClass extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details in development
        if (process.env.NODE_ENV === 'development') {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }

        this.setState({
            error,
            errorInfo
        });
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary-container">
                    <div className="error-boundary-card">
                        <div className="error-brand">StreamWatt's</div>
                        <h1 className="error-title">Something went wrong</h1>
                        <p className="error-message">We're fixing it.</p>
                        <div className="error-actions">
                            <button className="error-btn primary" onClick={this.handleReload}>
                                <span className="btn-icon">🔄</span>
                                <span>Reload App</span>
                            </button>
                            <button className="error-btn secondary" onClick={this.handleGoHome}>
                                <span className="btn-icon">🏠</span>
                                <span>Go Home</span>
                            </button>
                        </div>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="error-details">
                                <summary>Error Details (Dev Mode)</summary>
                                <pre>{this.state.error.toString()}</pre>
                                <pre>{this.state.errorInfo?.componentStack}</pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Wrapper to use with functional components if needed
const EnhancedErrorBoundary = ({ children }) => {
    return <EnhancedErrorBoundaryClass>{children}</EnhancedErrorBoundaryClass>;
};

export default EnhancedErrorBoundary;
