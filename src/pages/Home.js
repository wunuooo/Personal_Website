// src/pages/Home.js
import React, { useEffect, useState, useRef } from 'react';
import ThreeScene from '../components/ThreeScene';
import { useLenis } from 'lenis/react';

// const Home = () => {
//     return (
//         <div className="absolute w-full h-full">
//             {/* 第一部分内容 */}
//             <div className="container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
//                 <h1 className="text-5xl font-bold mb-4">你好，我是 Nuo！</h1>
//                 <h2 className="text-2xl font-bold mb-3">欢迎来到我的个人主页</h2>
//                 <h3 className="text-xl font-bold mb-2">我是一名建筑设计从业者，游戏和软件开发者</h3>
//                 <p className="mt-4">
//                     这里有我做过的各类项目，目前尚在补充和完善信息中
//                 </p>
//                 <p>
//                     这是更多的正文内容。你可以根据需要添加更多的段落和内容。
//                 </p>
//             </div>

//             {/* 第二部分内容 */}
//             <div className="relative w-full h-full">
//                 <ThreeScene />
//             </div>

//             {/* 第三部分内容 */}
//             <div className="next-page container mx-auto flex flex-col justify-center items-center text-center w-full h-full">
//                 <h1 className="text-3xl font-bold mb-4">下一页内容标题</h1>
//                 <h2 className="text-2xl font-bold mb-3">继续浏览更多内容</h2>
//                 <p className="mb-4">
//                     这是一些有关下一页的描述。
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Home;

const Home = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [scrollAccumulator, setScrollAccumulator] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollRef = useRef(null);
    const lenis = useLenis();

    const SCROLL_THRESHOLD = 500; // 调整这个值来改变需要累积的滚动量
    const TOTAL_SECTIONS = 3; // 总部分数

    useEffect(() => {
        if (!lenis) return;

        // 禁用默认的 Lenis 滚动行为
        lenis.stop();

        const handleWheel = (e) => {
            e.preventDefault();

            if (isScrolling) return;

            // 累积滚动量
            setScrollAccumulator(prev => {
                const newValue = prev + e.deltaY;

                // 向下滚动
                if (newValue > SCROLL_THRESHOLD && currentSection < TOTAL_SECTIONS - 1) {
                    setIsScrolling(true);
                    setCurrentSection(prev => prev + 1);
                    setTimeout(() => {
                        setIsScrolling(false);
                        return 0;
                    }, 1000); // 动画完成后重置状态
                    return 0;
                }

                // 向上滚动
                if (newValue < -SCROLL_THRESHOLD && currentSection > 0) {
                    setIsScrolling(true);
                    setCurrentSection(prev => prev - 1);
                    setTimeout(() => {
                        setIsScrolling(false);
                        return 0;
                    }, 1000);
                    return 0;
                }

                return newValue;
            });
        };

        // 添加滚轮事件监听
        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [lenis, currentSection, isScrolling]);

    useEffect(() => {
        // 使用 Lenis 进行平滑滚动
        if (lenis) {
            lenis.scrollTo(window.innerHeight * currentSection, {
                duration: 1.0,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    }, [currentSection, lenis]);

    return (
        <div
            ref={scrollRef}
            className="relative overflow-hidden"
            style={{ height: `${TOTAL_SECTIONS * 100}vh` }}
        >
            {/* 第一部分内容 */}
            <section
                className={`h-screen fixed top-0 left-0 w-full transition-opacity duration-500
                    ${currentSection === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="container mx-auto flex flex-col justify-center items-center text-center h-full">
                    <h1 className="text-5xl font-bold mb-4">你好，我是 Nuo</h1>
                    <h2 className="text-2xl font-bold mb-3">欢迎来到我的个人主页</h2>
                    <h3 className="text-xl font-bold mb-2">我是一名建筑设计从业者，游戏和软件开发者</h3>
                    <p className="mt-4">
                        这里有我做过的各类项目，目前尚在补充和完善信息中
                    </p>
                    <p>
                        这是更多的正文内容。你可以根据需要添加更多的段落和内容。
                    </p>
                </div>
            </section>

            {/* 第二部分内容 */}
            <section
                className={`h-screen fixed top-0 left-0 w-full transition-opacity duration-500
                    ${currentSection === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <ThreeScene />
            </section>

            {/* 第三部分内容 */}
            <section
                className={`h-screen fixed top-0 left-0 w-full transition-opacity duration-500
                    ${currentSection === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="container mx-auto flex flex-col justify-center items-center text-center h-full">
                    <h1 className="text-3xl font-bold mb-4">下一页内容标题</h1>
                    <h2 className="text-2xl font-bold mb-3">继续浏览更多内容</h2>
                    <p className="mb-4">
                        这是一些有关下一页的描述。
                    </p>
                </div>
            </section>

            {/* 添加滚动指示器 */}
            <div className="fixed right-4 top-1/2 transform -translate-y-1/2">
                {Array.from({ length: TOTAL_SECTIONS }).map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full my-2 transition-all duration-300 cursor-pointer
                            ${currentSection === index ? 'bg-black scale-150' : 'bg-gray-400'}`}
                        onClick={() => {
                            if (!isScrolling) {
                                setCurrentSection(index);
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
