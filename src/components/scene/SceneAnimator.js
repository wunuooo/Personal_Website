// src/scene/SceneAnimator.js
import * as THREE from 'three';
import { RADIUS } from './GeometryCreator';

export const animateScene = (renderer, scene, camera, meshes) => {
    let angleOffset = 0;
    let rotationSpeed = 0;
    const ROTATION_DAMPING_FACTOR = 0.85;
    const ROTATION_SPEED_FACTOR = 0.02;
    const HEIGHT_LERP_FACTOR = 0.2; // 控制高度平滑过渡的速度
    const SCALE_LERP_FACTOR = 0.2;  // 控制缩放平滑过渡的速度

    // 初始化每个物体的 userData 属性
    meshes.forEach(mesh => {
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
        meshes.forEach((mesh, index) => {
            const offset = (index / meshes.length) * Math.PI * 2;
            const currentAngle = angleOffset + offset;
            const x = RADIUS * Math.cos(currentAngle);
            const z = RADIUS * Math.sin(currentAngle);

            mesh.position.x = x;
            mesh.position.z = z;

            // 平滑过渡高度
            mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, mesh.userData.currentY || mesh.userData.originalY, HEIGHT_LERP_FACTOR);

            // 平滑过渡缩放
            mesh.scale.lerp(mesh.userData.currentScale || mesh.userData.originalScale, SCALE_LERP_FACTOR);

            mesh.rotation.y = -currentAngle;
            // mesh.rotation.y = -(currentAngle + Math.PI / 2);
        });
    };

    const updateRotationSpeed = (newSpeed) => {
        rotationSpeed = newSpeed;
    };

    const animate = () => {
        requestAnimationFrame(animate);

        angleOffset += rotationSpeed * ROTATION_SPEED_FACTOR;
        updateMeshes();

        rotationSpeed *= ROTATION_DAMPING_FACTOR;
        if (Math.abs(rotationSpeed) < 0.001) {
            rotationSpeed = 0;
        }

        renderer.render(scene, camera);
    };

    animate();

    return updateRotationSpeed;
};
