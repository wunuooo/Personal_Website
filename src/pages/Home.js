// src/pages/Home.js

import React, { useEffect, useState, useRef } from 'react';
import ThreeScene from '../components/ThreeScene';
import LottieAnimator from '../components/utils/LottieAnimator';

const Home = () => {
    const lottieRef = useRef(null);

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
                    <h1 className="text-[10rem] mb-9" style={{ fontFamily: "'OPPOSans-H', sans-serif" }}>你好，我是 Nuo</h1>
                    <h2 className="text-7xl font-bold mb-7">欢迎来到我的个人主页</h2>
                    <h3 className="text-3xl font-bold mb-2">我是一名建筑学学生，有时候不只做建筑设计</h3>
                    <p className="mt-8">
                        这里有我做过的部分项目，目前尚在补充和完善信息中
                    </p>
                    <p>
                        欢迎来监督我的进度，或者访问我的博客 :)
                    </p>
                </div>

                {/* 第二部分内容 */}
                <div className="next-page container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
                    <div className="absolute mb-20 w-full" style={{ transform: 'translateY(-45vh)' }}>
                        <LottieAnimator />
                    </div>
                    <h1 className="text-7xl font-bold mb-9">曾学过一些建筑设计，偶尔做点简单的开发</h1>
                    <h2 className="text-3xl font-bold mb-3">大约是兴趣使然</h2>
                    <p className="mt-8">
                        往下滑动可以浏览我之前完成的一些工作，点击进入详情页面
                    </p>
                </div>

                {/* 第三部分内容 */}
                <div className="next-page container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
                    <div style={{ transform: 'translateY(20vh)' }}>
                        <h1 className="text-7xl font-bold mb-9">总共可分为六个板块</h1>
                        <h1 className="text-3xl font-bold mb-4">内容有待更新和补充</h1>
                        <p className="mt-8">
                            如果感觉背景场景挡住图片或是影响文字阅读
                        </p>
                        <p>
                            可以刷新页面重新加载（马铃薯的位置是随机的）
                        </p>
                        <p>
                            之后应该会根据文字与图片位置调整模型，固定其位置
                        </p>
                    </div>
                </div>

                {/* 第四部分内容 */}
                <div className="next-page container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
                    <h1 className="text-7xl font-bold mb-9">以上是一些基本信息</h1>
                    <h2 className="text-2xl font-bold mb-3">更多详细内容可以点击导航栏进入不同板块查看</h2>
                    <p className="mt-8">
                        欢迎下次光临！
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
