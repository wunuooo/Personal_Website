// src/components/Loader.js
import Lottie from 'lottie-web';
import React, { useEffect, useState, useRef } from 'react';

const Loader = ({ onLoadComplete }) => {
    useEffect(() => {
        const animation = Lottie.loadAnimation({
            container: document.getElementById("logo_box"),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: 'loader.json'
        });

        let playCount = 0;

        const handleEnterFrame = () => {
            if (animation.currentFrame >= 55) {
                if (playCount < 1) {
                    // 移除之前的事件监听，防止重复触发
                    animation.removeEventListener('enterFrame', handleEnterFrame);

                    // 重新设置动画从0开始
                    animation.goToAndStop(0, true);
                    animation.play();

                    // 重新添加事件监听
                    animation.addEventListener('enterFrame', handleEnterFrame);
                    playCount++;
                } else {
                    // 移除事件监听，防止重复触发
                    animation.removeEventListener('enterFrame', handleEnterFrame);

                    // 播放55帧之后的动画
                    animation.goToAndStop(55, true);
                    animation.play();
                }
            }
        };

        animation.addEventListener('enterFrame', handleEnterFrame);

        animation.addEventListener('complete', () => {
            // 动画完成后添加退出动画的类
            const loaderElement = document.querySelector('.loader');
            if (loaderElement) {
                loaderElement.classList.add('loader-exit');
            }

            // 稍微延迟调用onLoadComplete，让退出动画有时间执行
            setTimeout(() => {
                onLoadComplete && onLoadComplete();
            }, 500); // 根据CSS动画时长调整
        });

        return () => {
            animation.destroy();
        };
    }, [onLoadComplete]);

    return (
        <div className="loader" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <div
                id="logo_box"
                style={{
                    width: '150px',
                    height: '150px'
                }}
            ></div>
            <p style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginTop: '20px'
            }}>
                Loading...
            </p>
        </div>
    );
};

export default Loader;