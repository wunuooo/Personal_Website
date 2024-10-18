// src/scene/CameraController.js
// import * as THREE from 'three';

const MAX_VERTICAL_MOVE = 0.2; // 降低最大垂直移动距离
const MAX_HORIZONTAL_MOVE = 0.2; // 降低最大水平移动距离
const INITIAL_CAMERA_HEIGHT = 0; // 摄像机初始高度
const ZOOM_SPEED = 0.001; // 控制滚轮缩放速度
// const ZOOM_LERP_FACTOR = 0.1; // 控制缩放的平滑过渡速度

export const updateCameraPosition = (camera, mouseX, mouseY, width, height) => {
    // 计算鼠标位置的相对比例
    const xRatio = (mouseX / width) * 2 - 1;
    const yRatio = (mouseY / height) * 2 - 1;

    // 计算垂直和水平移动距离
    const verticalMove = -yRatio * MAX_VERTICAL_MOVE;
    const horizontalMove = xRatio * MAX_HORIZONTAL_MOVE;

    // 更新摄像机的位置
    camera.position.y = Math.max(-5, Math.min(5, INITIAL_CAMERA_HEIGHT + verticalMove));
    camera.position.x = Math.max(-2, Math.min(2, horizontalMove));

    // 让相机朝向场景中心
    camera.lookAt(0, 0, 5);
};

export const updateCameraZoom = (camera, deltaY) => {
    // 根据滚轮滚动来调整摄像机的距离
    camera.position.z += deltaY * ZOOM_SPEED;
    camera.position.z = Math.max(1, camera.position.z); // 防止摄像机进入负值

};
