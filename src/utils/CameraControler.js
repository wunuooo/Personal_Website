// src/utils/CameraController.js

const MAX_HORIZONTAL_MOVE = 0.3; // 降低最大水平移动距离
const CAMERAHEIGHT = 7; // 摄像机初始高度

export const updateCameraPosition = (camera, mouseX, mouseY, width, height) => {

    // 计算鼠标位置的相对比例
    const xRatio = (mouseX / width) * 2 - 1;
    // const yRatio = (mouseY / height) * 2 - 1;

    // 限制垂直移动范围
    const horizontalMove = Math.max(-MAX_HORIZONTAL_MOVE, Math.min(MAX_HORIZONTAL_MOVE, xRatio * MAX_HORIZONTAL_MOVE));

    // 平滑过渡
    camera.position.x = horizontalMove;
};

export { CAMERAHEIGHT };