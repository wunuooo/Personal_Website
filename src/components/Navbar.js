import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="useRef p-4 navbar">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-black text-xl">网站图标在这里</div>
                <div>
                    <Link to="/" className="text-black mx-2">Home</Link>
                    <Link to="/works" className="text-black mx-2">Works</Link>
                    <Link to="/portfolio" className="text-black mx-2">Portfolio</Link>
                    <Link to="/contact" className="text-black mx-2">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
