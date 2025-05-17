import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import BO from './components/BO/BO';
import Coaching from './components/Coaching/Coaching';
import Merch from './components/Merch/Merch';
import './index.css';
import { HomeAnimationProvider } from './contexts/HomeAnimationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomeAnimationProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/build-order" element={<BO />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/merch" element={<Merch />} />
        </Routes>
      </BrowserRouter>
    </HomeAnimationProvider>
  </React.StrictMode>
);
