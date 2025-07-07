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

      <h2>2. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to analyze traffic, personalize content and ads, and improve user experience. 
          These may include browser cookies, web beacons, and local storage.
        </p>
        <p>
          By using this website, you consent to the use of such technologies. You can disable cookies through your browser settings at any time.
        </p>
        <p>
          Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.
          You can opt out of personalized advertising by visiting 
          <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">YourAdChoices</a>.
        </p>


      <h2>3. Information We Collect</h2>
      <p>We do not directly collect personal information. Google may collect usage data through ads and analytics as described above.</p>

      <h2>4. External Links</h2>
      <p>This site may link to external sites such as YouTube or Twitch. We are not responsible for their privacy practices.</p>

      <h2>5. Contact</h2>
      <p>If you have any questions about this Privacy Policy, please contact us via the Discord server.</p>

      <h2>6. User Rights</h2>
      <p>
        You have the right to access, correct, or delete any personal data we may hold about you. Since we do not collect personal data directly, 
        such requests typically apply to third-party services like Google. You can manage your data preferences via your Google account settings.
      </p>

    </div>
    <Footer />
    </>
  );
};

export default PrivacyPolicy;
