import React from 'react';
import Footer from './../Footer';

const PrivacyPolicy = () => {
  return (
    <>
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1rem, 1.2vw, 1.5rem)', color: "#ffffff" }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: May 24, 2025</p>

      <p>This website, <strong>https://thedodclan.com</strong>, respects your privacy. This Privacy Policy explains how we collect, use, and protect your information.</p>

      <h2>1. Google AdSense</h2>
      <p>
        We use Google AdSense to serve ads on this site. Google may use cookies to personalize content and ads,
        to provide social media features, and to analyze our traffic. These cookies allow Google and its partners
        to serve ads based on your visits to this and other sites.
      </p>
      <p>
        You can learn more about how Google uses your data{' '}
        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
          here
        </a>.
      </p>

      <h2>2. Cookies</h2>
      <p>This site may use cookies for basic analytics or to enhance your experience. By using this site, you consent to the use of cookies unless you disable them in your browser settings.</p>

      <h2>3. Information We Collect</h2>
      <p>We do not directly collect personal information. Google may collect usage data through ads and analytics as described above.</p>

      <h2>4. External Links</h2>
      <p>This site may link to external sites such as YouTube or Twitch. We are not responsible for their privacy practices.</p>

      <h2>5. Contact</h2>
      <p>If you have any questions about this Privacy Policy, please contact us via the Discord server.</p>
    </div>
    <Footer />
    </>
  );
};

export default PrivacyPolicy;
