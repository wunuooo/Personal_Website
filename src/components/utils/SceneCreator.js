// src/scene/CreateScene.js
import * as THREE from 'three';
import { createRoundedRectangle, createStars } from './GeometryCreator';
import { CAMERAHEIGHT } from './CameraControler'

export const createScene = (mountElement, navigate) => {
    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
        55,
        mountElement.clientWidth / mountElement.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, CAMERAHEIGHT, 10);

    const gridHelper = new THREE.GridHelper(200.50);
    scene.add(gridHelper);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
    mountElement.appendChild(renderer.domElement);

    const meshes = createRoundedRectangle();
    meshes.forEach(mesh => scene.add(mesh));

    Array(10).fill().forEach(() => {
        // const star = createStars();
        // scene.add(star);
        const initializeScene = async () => {
            const star = await createStars();
            scene.add(star);
        };
        initializeScene();
    })

    // 环境光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 10)
    scene.add(ambientLight)
    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 20);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    return {
        scene,
        camera,
        renderer,
        meshes
    };
};
