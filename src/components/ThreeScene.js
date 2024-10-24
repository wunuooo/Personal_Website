// src/components/ThreeScene.js
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createScene } from './utils/SceneCreator';
import { createEventHandlers } from './utils/EventHandlers';
import { animateScene } from './utils/SceneAnimator';
import { updateCameraPosition } from './utils/CameraControler';

const ThreeScene = () => {
    const mountRef = useRef(null);
    const navigate = useNavigate();
    const [height, setHeight] = useState('100vh');
    const [initComplete, setInitComplete] = useState(false);

    const updateHeight = () => {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const footerHeight = document.querySelector('.footer')?.offsetHeight || 0;
        const newHeight = `calc(100vh - ${navbarHeight + footerHeight}px)`;
        setHeight(newHeight);
    };

    useEffect(() => {
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    useEffect(() => {
        if (height !== '100vh') {
            setInitComplete(true);
        }
    }, [height]);

    useEffect(() => {
        if (initComplete) {
            const mountElement = mountRef.current;

            const { scene, camera, renderer, meshes } = createScene(mountElement, navigate);
            const updateRotationSpeed = animateScene(renderer, scene, camera, meshes);
            const { onMouseClick, onMouseMove, onMouseDown, onMouseUp } = createEventHandlers(mountElement, camera, meshes, navigate, updateRotationSpeed);

            window.addEventListener('mousemove', (event) => {
                onMouseMove(event);
                updateCameraPosition(camera, event.clientX, event.clientY, mountElement.clientWidth, mountElement.clientHeight);
            });
            window.addEventListener('mousedown', onMouseDown);
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('click', onMouseClick);

            const handleResize = () => {
                const width = mountElement.clientWidth;
                const height = mountElement.clientHeight;
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                mountElement.removeChild(renderer.domElement);
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mousedown', onMouseDown);
                window.removeEventListener('mouseup', onMouseUp);
                window.removeEventListener('click', onMouseClick);
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [initComplete, navigate]);

    return (
        <div
            ref={mountRef}
            style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: height }}
        />
    );
};

export default ThreeScene;
