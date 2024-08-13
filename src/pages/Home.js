// src/pages/Home.js
import React from 'react';
import ThreeScene from '../components/ThreeScene';

const Home = () => {
    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <ThreeScene />
            <div className="container mx-auto my-8 p-4" style={{ position: 'relative', zIndex: 1 }}>
                <h1 className="text-3xl font-bold mb-4">一级标题</h1>
                <h2 className="text-2xl font-bold mb-3">二级标题</h2>
                <h3 className="text-xl font-bold mb-2">三级标题</h3>
                <p className="mb-4">
                    这是一些正文内容。你可以根据需要添加更多的段落和内容。
                </p>
                <p>
                    这是更多的正文内容。你可以根据需要添加更多的段落和内容。
                </p>
            </div>
        </div>
    );
};

export default Home;
