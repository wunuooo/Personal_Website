// src/App.js
import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Works from './pages/Works';
import WorkDetail from './components/WorkDetail';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { ReactLenis } from 'lenis/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const App = () => {
  //   const [loading, setLoading] = useState(true);
  //   const [resourcesLoaded, setResourcesLoaded] = useState(false);
  //   const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  //   useEffect(() => {
  //     // 监听关键资源加载
  //     const loadResources = async () => {
  //       try {
  //         // 在这里添加你的资源预加载逻辑
  //         await Promise.all([
  //           // 例如：预加载图片、字体等
  //           document.fonts.ready,
  //           // 其他异步加载的资源
  //         ]);
  //         setResourcesLoaded(true);
  //       } catch (error) {
  //         console.error('资源加载错误:', error);
  //         setResourcesLoaded(true);
  //       }
  //     };

  //     loadResources();

  //     // 监听初始渲染完成
  //     const timer = setTimeout(() => {
  //       setInitialRenderComplete(true);
  //     }, 3000); // 给React一些时间完成初始渲染

  //     return () => clearTimeout(timer);
  //   }, []);

  //   useEffect(() => {
  //     // 当资源加载完成且初始渲染完成时，结束加载
  //     if (resourcesLoaded && initialRenderComplete) {
  //       setLoading(false);
  //     }
  //   }, [resourcesLoaded, initialRenderComplete]);

  //   if (loading) {
  //     return <Loader />;
  //   }

  //   const lenisOptions = {
  //     duration: 2,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     direction: 'vertical',
  //     gestureDirection: 'vertical',
  //     smooth: true,
  //     smoothTouch: false,
  //     smoothWheel: true,
  //     touchMultiplier: 2,
  //     lerp: 0.01
  //   };

  //   return (
  //     <ReactLenis root options={lenisOptions}>
  //       <Router>
  //         <div className="flex flex-col">
  //           <Navbar />
  //           <main>
  //             <Routes>
  //               <Route path="/" element={<Home />} />
  //               <Route path="/works" element={<Works />} />
  //               <Route path="/works/:id" element={<WorkDetail />} />
  //               <Route path="/portfolio" element={<Portfolio />} />
  //               <Route path="/contact" element={<Contact />} />
  //             </Routes>
  //           </main>
  //           <Footer />
  //         </div>
  //       </Router>
  //     </ReactLenis>
  //   );

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
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/works" element={<Works />} />
              <Route path="/works/:id" element={<WorkDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ReactLenis>
  );
};




export default App;
