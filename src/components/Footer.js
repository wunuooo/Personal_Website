import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-transparent p-4 text-white footer">
            <div className="text-black container mx-auto flex justify-between">
                <a href="https://beian.miit.gov.cn/" rel="noreferrer" target="_blank" >闽ICP备2024053702号-2</a>
                <div className="flex items-center space-x-2">
                    <img src='/备案图标.png' alt="备案图标" className="w-4 h-4"></img>
                    <a href="https://beian.mps.gov.cn/#/query/webSearch?code=35012202350314" rel="noreferrer" target="_blank" >闽公网安备35012202350314</a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
