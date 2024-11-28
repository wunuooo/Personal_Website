// src/components/Loader.js
import Lottie from 'lottie-web';
import React, { useEffect, useState, useRef } from 'react';

const Loader = () => {
    useEffect(() => {
        const ani = Lottie.loadAnimation({
            container: document.getElementById("logo_box"),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'nuo.json'
        });
        return () => ani.destroy();
    }, []);


    return (
        <div className="loader">
            <div id="logo_box"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loader;