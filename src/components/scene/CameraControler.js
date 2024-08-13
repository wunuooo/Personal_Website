// src/scene/CameraControler.js
// import * as THREE from 'three';

const MAX_VERTICAL_MOVE = 0.2; // 降低最大垂直移动距离
const MAX_HORIZONTAL_MOVE = 0.2; // 降低最大水平移动距离
const INITIAL_CAMERA_HEIGHT = 2; // 摄像机初始高度

export const updateCameraPosition = (camera, mouseX, mouseY, width, height) => {
    // 计算鼠标位置的相对比例
    const xRatio = (mouseX / width) * 2 - 1;
    const yRatio = (mouseY / height) * 2 - 1;

    // 计算垂直和水平移动距离
    const verticalMove = -yRatio * MAX_VERTICAL_MOVE;
    const horizontalMove = xRatio * MAX_HORIZONTAL_MOVE;

    // 更新摄像机的位置
    camera.position.y = Math.max(1, Math.min(5, INITIAL_CAMERA_HEIGHT + verticalMove)); // 限制在 [1, 5] 范围内
    camera.position.x = Math.max(-2, Math.min(2, horizontalMove)); // 限制在 [-2, 2] 范围内

    camera.lookAt(0, 0, 0); // 让相机朝向场景中心
};
