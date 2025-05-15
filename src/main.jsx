// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import BO from './components/BO';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter basename="/DeitiesOfDeath">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/build-order" element={<BO />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
