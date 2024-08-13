// src/scene/CreateScene.js
import * as THREE from 'three';
import { createGeometry } from './GeometryCreator';

export const createScene = (mountElement, navigate) => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
        55,
        mountElement.clientWidth / mountElement.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
    mountElement.appendChild(renderer.domElement);

    const meshes = createGeometry();
    meshes.forEach(mesh => scene.add(mesh));

    return {
        scene,
        camera,
        renderer,
        meshes
    };
};
