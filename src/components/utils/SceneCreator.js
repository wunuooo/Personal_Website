// src/components/utils/CreateScene.js
import * as THREE from 'three';
import { createRoundedRectangle, createPotato } from './GeometryCreator';
import { CAMERAHEIGHT } from './CameraControler';
import { modelStore } from './ModelStore';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

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

    // const gridHelper = new THREE.GridHelper(200.50);
    // scene.add(gridHelper);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
    mountElement.appendChild(renderer.domElement);

    const faceMeshes = createRoundedRectangle();
    faceMeshes.forEach(mesh => scene.add(mesh));

    // Array(20).fill().forEach(() => {
    //     const initializeScene = async () => {
    //         const potatoes = await createPotato(false);
    //         scene.add(potatoes);
    //         modelStore.setPotatoes(potatoes);
    //     };
    //     initializeScene();
    // })

    // const initializeScene = async () => {
    //     const potato = await createPotato(true);
    //     scene.add(potato);
    //     modelStore.setPotato(potato);
    // };
    // initializeScene();

    const initializeScene = async () => {
        try {
            const potatoes = await Promise.all(
                Array(40).fill().map(() => createPotato(false))
            );
            potatoes.forEach(potato => {
                scene.add(potato);
                modelStore.setPotatoes(potato);
            });

            const centerPotato = await createPotato(true);
            scene.add(centerPotato);
            modelStore.setPotato(centerPotato);
        } catch (error) {
            console.error('模型加载失败:', error);
        }
    };
    initializeScene();

    // 环境光源
    // const ambientLight = new THREE.AmbientLight(0xffffff, 20)
    // scene.add(ambientLight)
    // 点光源
    const pointLight = new THREE.PointLight(0xffffff, 20);
    pointLight.position.set(10, -20, 20);
    scene.add(pointLight);
    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    // const pmremGenerator = new THREE.PMREMGenerator(renderer);
    // scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 1).texture;

    return {
        scene,
        camera,
        renderer,
        faceMeshes,
    };
};
