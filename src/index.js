// src/index.js
import React, { useState } from 'react';
import ReactDom from 'react-dom/client';
import Hero from './Components/Hero';
import { Navbar, Footer } from './layout';
import App from './App';

export function MainApp() {
  const [showSearchQuery, setShowSearchQuery] = useState(false);

  const handleMenuClick = (menu) => {
    if (menu === 'entities') {
      setShowSearchQuery(true);
    } else {
      setShowSearchQuery(false);
    }
  };

  return (
    <>
      <Navbar onMenuClick={handleMenuClick} />
      <Hero />
      <div>
        {showSearchQuery && <App />}
        <hr />
      </div>
      <Footer />
    </>
  );
}

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
