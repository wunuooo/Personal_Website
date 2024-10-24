import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="fixed top-0 w-full z-10 my-8">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <img src="/icon.png" alt="网站图标" width="80" />
                    </div>
                    <div>
                        <Link to="/" className="text-black mx-2">Home</Link>
                        <Link to="/works" className="text-black mx-2">Works</Link>
                        <Link to="/portfolio" className="text-black mx-2">Portfolio</Link>
                        <Link to="/contact" className="text-black mx-2">Contact</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
