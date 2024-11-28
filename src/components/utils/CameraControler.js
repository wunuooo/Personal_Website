// src/scene/CameraController.js
// import * as THREE from 'three';
// import { CAMERAPOSY } from './SceneAnimator';

// const MAX_VERTICAL_MOVE = 0.3; // 降低最大垂直移动距离
const MAX_HORIZONTAL_MOVE = 0.3; // 降低最大水平移动距离
const CAMERAHEIGHT = 7; // 摄像机初始高度

export const updateCameraPosition = (camera, mouseX, mouseY, width, height) => {

    // 计算鼠标位置的相对比例
    const xRatio = (mouseX / width) * 2 - 1;
    // const yRatio = (mouseY / height) * 2 - 1;

    // 限制垂直移动范围
    // const verticalMove = Math.max(-MAX_VERTICAL_MOVE, Math.min(MAX_VERTICAL_MOVE, -yRatio * MAX_VERTICAL_MOVE));
    const horizontalMove = Math.max(-MAX_HORIZONTAL_MOVE, Math.min(MAX_HORIZONTAL_MOVE, xRatio * MAX_HORIZONTAL_MOVE));

    // 平滑过渡
    // camera.position.y = camera.position.y + verticalMove;
    camera.position.x = horizontalMove;

    // 让相机朝向场景中心
    // camera.lookAt(0, 0, 5);
};

export { CAMERAHEIGHT };