import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import App from './App';
import BO from './components/BO/BO';
import Coaching from './components/Coaching/Coaching';
import Merch from './components/Merch/Merch';
import './index.css';
import { HomeAnimationProvider } from './contexts/HomeAnimationContext';
import BOGodPage from './components/BO/BOGodPage';
import PrivacyPolicy from './components/Privacy/PrivacyPolicy';
import Contact from './components/Contact';
import About from './components/About';
import Legal from './components/Legal';
import RandomGods from './components/RandomGods/RandomGods';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HomeAnimationProvider>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/build-orders" element={<BO />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/build-orders/:god" element={<BOGodPage />} />
            <Route path="/build-orders/:god/:title_share" element={<BOGodPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/random-draft" element={<RandomGods />} />
          </Routes>
        </BrowserRouter>
      </HomeAnimationProvider>
  </React.StrictMode>
);
