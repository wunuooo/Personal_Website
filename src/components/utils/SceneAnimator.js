// src/components/utils/SceneAnimator.js
import * as THREE from 'three';
import { RADIUS } from './GeometryCreator';
import { CAMERAHEIGHT } from './CameraControler'
import { modelStore } from './ModelStore';

export const animateScene = (renderer, scene, camera, faceMeshes) => {
    let angleOffset = 0;
    let rotationSpeed = 0;
    let radius = RADIUS;
    let centerPotato;
    let othersPotato;
    const ROTATION_DAMPING_FACTOR = 0.85;
    const ROTATION_SPEED_FACTOR = 0.02;
    const HEIGHT_LERP_FACTOR = 0.2; // 控制高度平滑过渡的速度
    const SCALE_LERP_FACTOR = 0.2;  // 控制缩放平滑过渡的速度

    // 初始化订阅
    modelStore.subscribe('potato', (potato) => {
        centerPotato = potato;
    });
    modelStore.subscribe('potatoes', (potatoes) => {
        othersPotato = potatoes;
    });

    // 初始化每个物体的 userData 属性
    faceMeshes.forEach(mesh => {
        if (!mesh.userData.originalScale) {
            mesh.userData.originalScale = mesh.scale.clone();
        }
        if (!mesh.userData.originalY) {
            mesh.userData.originalY = mesh.position.y;
        }
        if (mesh.userData.currentY === undefined) {
            mesh.userData.currentY = mesh.position.y; // 默认当前高度
        }
        if (!mesh.userData.originalScale) {
            mesh.userData.originalScale = mesh.scale.clone();
        }
        if (!mesh.userData.currentScale) {
            mesh.userData.currentScale = mesh.scale.clone();
        }
    });

    const updateMeshes = () => {
        faceMeshes.forEach((mesh, index) => {
            const offset = (index / faceMeshes.length) * Math.PI * 2;
            const currentAngle = angleOffset + offset;
            const x = radius * Math.cos(currentAngle);
            const z = radius * Math.sin(currentAngle);

            mesh.position.x = x;
            mesh.position.z = z;

            // 平滑过渡高度
            mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, mesh.userData.currentY || mesh.userData.originalY, HEIGHT_LERP_FACTOR);

            // 平滑过渡缩放
            mesh.scale.lerp(mesh.userData.currentScale || mesh.userData.originalScale, SCALE_LERP_FACTOR);

            // 在旋转过程中实时改变物件位置
            mesh.rotation.y = -(currentAngle - Math.PI / 2);

        });
    };

    const updateRotationSpeed = (newSpeed) => {
        rotationSpeed = newSpeed;
    };

    // 滚动函数
    const objScrollTransform = () => {

        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = -document.body.getBoundingClientRect().top;
        const scrollProgress = scrollTop / totalHeight;
        const t = Math.max(0, Math.min(1, scrollProgress));

        radius = RADIUS - 10 * t;
        camera.position.y = CAMERAHEIGHT - 10 * t;

        centerPotato.rotation.y = Math.PI * 2 * t;
        othersPotato.forEach(potato => {
            potato.rotation.x += Math.PI * 0.01 * t;
            potato.rotation.y += Math.PI * 0.01 * t;
            potato.rotation.z += Math.PI * 0.01 * t;
        });
    }

    // 绑定滚动
    document.body.onscroll = objScrollTransform;

    const animate = () => {
        requestAnimationFrame(animate);

        angleOffset += rotationSpeed * ROTATION_SPEED_FACTOR;
        rotationSpeed *= ROTATION_DAMPING_FACTOR;
        if (Math.abs(rotationSpeed) < 0.001) {
            rotationSpeed = 0;
        }
        updateMeshes();

        renderer.render(scene, camera);
    };

    animate();

    return updateRotationSpeed;

};