import React from 'react';
import { Link } from 'react-router-dom';
import CustomModal from './CustomModal';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="fixed top-0 w-full z-10 my-8">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="mr-0">
                        <Link to="/"><img src="/icon.png" alt="网站图标" width="80" /></Link>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <ul>
                            <li><Link to="/" className="text-black mx-0">主页</Link></li>
                            <li><Link to="/works" className="text-black mx-0">作品</Link></li>
                            <li><Link to="/portfolio" className="text-black mx-0">简历</Link></li>
                            <li><Link to="/blog" className="text-black mx-0">博客</Link></li>
                            <li><Link to="/contact" className="text-black mx-0">找到我！</Link></li>
                        </ul>
                    </div>
                    <div className="ml-0">
                        <CustomModal
                            triggerText="语言/深色模式"
                            title="功能开发中"
                            content="语言切换和深色模式功能尚在开发中"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
