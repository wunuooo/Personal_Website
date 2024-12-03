// src/App.js
import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Works from './pages/Works';
import WorkDetail from './components/WorkDetail';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { ReactLenis } from 'lenis/react';
import CustomCursor from "./components/utils/CustomMouse";

const App = () => {

  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };


  const lenisOptions = {
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    smoothWheel: true,
    touchMultiplier: 2,
    lerp: 0.01
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {loading && <Loader onLoadComplete={handleLoadComplete} />}
      <Router>
        <div className="flex flex-col">
          <CustomCursor />

          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/works" element={<Works />} />
              <Route path="/works/:id" element={<WorkDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ReactLenis>
  );
};

export default App;
