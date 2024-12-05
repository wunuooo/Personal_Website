// src/pages/Home.js
import React, { useEffect, useState, useRef } from 'react';
import ThreeScene from '../components/ThreeScene';

const Home = () => {

    return (
        <div className="no-select">
            {/* Three 背景内容 */}
            <div className="fixed top-0 left-0">
                <ThreeScene />
            </div>

            {/* 文字内容 */}
            <div className="absolute w-full h-full">
                {/* 第一部分内容 */}
                <div className="container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
                    <h1 className="text-9xl font-bold mb-9">你好，我是 Nuo</h1>
                    <h2 className="text-7xl font-bold mb-7">欢迎来到我的个人主页</h2>
                    <h3 className="text-3xl font-bold mb-2">我是一名建筑设计从业者，但是并不只做设计</h3>
                    <p className="mt-8">
                        这里有我做过的部分项目，目前尚在补充和完善信息中
                    </p>
                    <p>
                        欢迎监督我的进度
                    </p>
                </div>

                {/* 第二部分内容 */}
                <div className="next-page container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
                    <h1 className="text-3xl font-bold mb-4">下一页内容标题</h1>
                    <h2 className="text-2xl font-bold mb-3">继续浏览更多内容</h2>
                    <p className="mb-4">
                        这是一些有关下一页的描述。
                    </p>
                </div>

                {/* 第三部分内容 */}
                <div className="next-page container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
                    <h1 className="text-3xl font-bold mb-4">下一页内容标题</h1>
                    <h2 className="text-2xl font-bold mb-3">继续浏览更多内容</h2>
                    <p className="mb-4">
                        这是一些有关下一页的描述。
                    </p>
                </div>

                {/* 第四部分内容 */}
                <div className="next-page container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
                    <h1 className="text-3xl font-bold mb-4">下一页内容标题</h1>
                    <h2 className="text-2xl font-bold mb-3">继续浏览更多内容</h2>
                    <p className="mb-4">
                        这是一些有关下一页的描述。
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
