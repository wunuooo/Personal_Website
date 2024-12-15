// src/utils/LottieAnimator.js

import Lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
// import animationData from '../../assets/svg/nuo.json';

const LottieAnimator = ({
    loop = false, // 动画是否循环
    autoplay = false, // 动画是否自动播放
}) => {
    const animationContainer = useRef(null);
    const animationInstance = useRef(null);
    const animationData = '/assets/svg/nuo.json';
    useEffect(() => {
        // 初始化 Lottie 动画
        if (animationContainer.current) {
            animationInstance.current = Lottie.loadAnimation({
                container: animationContainer.current,
                renderer: 'svg',
                loop,
                autoplay,
                path: animationData,
            });

            const aniScroll = () => {
                if (!animationInstance.current) return;

                const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollTop = window.scrollY;
                const scrollProgress = scrollTop / totalHeight; // 滚动进度百分比
                const clampedProgress = Math.max(0, Math.min(0.99, (scrollProgress / 0.2))); // 限制范围 [0, 1]
                const maxFrame = animationInstance.current.totalFrames || 50;
                animationInstance.current.goToAndStop(clampedProgress * maxFrame, true);
            };

            // 使用 `requestAnimationFrame` 优化滚动事件
            let ticking = false;
            const optimizedScrollHandler = () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        aniScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            // 绑定滚动事件
            window.addEventListener('scroll', optimizedScrollHandler);

            // 在组件卸载时清理资源
            return () => {
                window.removeEventListener('scroll', optimizedScrollHandler);
                animationInstance.current?.destroy(); // 销毁 Lottie 动画实例
                animationInstance.current = null;
            };
        }
    }, [animationData, loop, autoplay]); // 依赖项使动画路径和配置变化时重新初始化

    return <div id="animation_box" ref={animationContainer} style={{ width: '100%', height: '100%' }} />;
};

export default LottieAnimator;
