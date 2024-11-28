import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="fixed top-0 w-full z-10 my-8">
                <div className="container mx-auto flex items-center">
                    <div className="mr-0">
                        <Link to="/"><img src="/icon.png" alt="网站图标" width="80" /></Link>
                    </div>
                    <div className="mx-auto">
                        <ul>
                            <li><Link to="/" className="text-black mx-0">主页</Link></li>
                            <li><Link to="/works" className="text-black mx-0">作品集</Link></li>
                            <li><Link to="/portfolio" className="text-black mx-0">简历</Link></li>
                            <li><Link to="/contact" className="text-black mx-0">联系我！</Link></li>
                        </ul>
                    </div>
                    <div className="ml-0">
                        <Link to="/" className="text-black mx-2">Language</Link>
                        <Link to="/works" className="text-black mx-2">Dark</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
