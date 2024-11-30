// src/components/Loader.js
import Lottie from 'lottie-web';
import React, { useEffect, useState, useRef } from 'react';

// const Loader = () => {

//     useEffect(() => {
//         const ani = Lottie.loadAnimation({
//             container: document.getElementById("logo_box"),
//             renderer: 'svg',
//             loop: true,
//             autoplay: true,
//             path: 'nuo.json'
//         });

//         let readystate = 0;
//         setTimeout(() => { readystate = 1 }, 2000);
//         ani.addEventListener("enterFrame", () => {
//             if (ani.currentFrame >= 50) {
//                 if (readystate != 1) {
//                     ani.goToAndPlay(0);
//                 }
//                 console.log("1");
//             }
//         });
//         console.log("2");
//         ani.addEventListener("complete", () => {
//             document.querySelector(".loader").classList.add("loader_hidden"); console.log("loader");
//             console.log("2.5");
//         })
//         console.log("3");
//         return () => ani.destroy();
//     }, []);


//     return (
//         <div className="loader">
//             <div id="logo_box"></div>
//             <p>Loading...</p>
//         </div>
//     );
// };


// const Loader = ({ onLoadComplete }) => {
//     const [ani, setAni] = useState(null);

//     useEffect(() => {
//         const animation = Lottie.loadAnimation({
//             container: document.getElementById("logo_box"),
//             renderer: 'svg',
//             loop: true,
//             autoplay: true,
//             path: 'nuo.json'
//         });

//         setAni(animation);

//         const handleEnterFrame = () => {
//             if (animation.currentFrame >= 50) {
//                 // 通知父组件加载完成
//                 onLoadComplete && onLoadComplete();
//             }
//         };

//         animation.addEventListener("enterFrame", handleEnterFrame);

//         return () => {
//             animation.removeEventListener("enterFrame", handleEnterFrame);
//             animation.destroy();
//         };
//     }, [onLoadComplete]);

//     return (
//         <div className="loader">
//             <div id="logo_box"></div>
//             <p>Loading...</p>
//         </div>
//     );
// };


// const Loader = ({ onLoadComplete }) => {
//     const [ani, setAni] = useState(null);

//     useEffect(() => {
//         const animation = Lottie.loadAnimation({
//             container: document.getElementById("logo_box"),
//             renderer: 'svg',
//             loop: true,
//             autoplay: true,
//             path: 'nuo.json'
//         });

//         setAni(animation);

//         // 监听动画完成事件
//         animation.addEventListener("complete", () => {
//             // 通知父组件加载完成
//             onLoadComplete && onLoadComplete();
//         });

//         return () => {
//             animation.destroy();
//         };
//     }, [onLoadComplete]);

//     return (
//         <div className="loader">
//             <div id="logo_box"></div>
//             <p>Loading...</p>
//         </div>
//     );
// };

const Loader = ({ onLoadComplete }) => {
    useEffect(() => {
        const animation = Lottie.loadAnimation({
            container: document.getElementById("logo_box"),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: 'nuo.json'
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
        <div className="loader">
            <div id="logo_box"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loader;