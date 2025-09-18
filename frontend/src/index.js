import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext"; // ✅ Import EventProvider
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventProvider> {/* ✅ Wrap App in EventProvider */}
          <App />
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
