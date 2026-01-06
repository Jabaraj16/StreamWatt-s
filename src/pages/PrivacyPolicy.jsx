import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="privacy-policy-container">
            <SEO
                title="Privacy Policy"
                description="Privacy Policy for StreamWatt's. Learn how we handle your data and our use of cookies and third-party advertising."
                url="/privacy-policy"
            />

            <div className="privacy-content">
                <h1 className="privacy-title">Privacy Policy</h1>
                <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>

                <section className="privacy-section">
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to StreamWatt's. We respect your privacy and are committed to protecting it.
                        This Privacy Policy explains how we handle information when you visit our website.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>2. No Personal Data Collection</h2>
                    <p>
                        StreamWatt's does not require user accounts, registration, or login.
                        We do not collect, store, or share any personal identification information (PII) such as names,
                        email addresses, or phone numbers.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>3. Cookies and Tracking Technologies</h2>
                    <p>
                        We use cookies to analyze website traffic and optimize your website experience.
                        By accepting our use of cookies, your data will be aggregated with all other user data.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>4. Third-Party Advertising (Google AdSense)</h2>
                    <p>
                        We use Google AdSense to serve ads when you visit our website. Google may use cookies
                        (such as the DoubleClick cookie) to serve ads based on your prior visits to our website
                        or other websites on the Internet.
                    </p>
                    <p>
                        Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>5. External Links</h2>
                    <p>
                        Our website may contain links to external sites that are not operated by us.
                        If you click on a third-party link, you will be directed to that third party's site.
                        We strongly advise you to review the Privacy Policy of every site you visit.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>6. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at:
                        <br />
                        <strong>Email:</strong> privacy@streamwatts.com
                    </p>
                </section>
            </div>
        </main>
    );
};

export default PrivacyPolicy;
