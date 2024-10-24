// src/scene/EventHandlers.js
import * as THREE from 'three';

export const createEventHandlers = (mountElement, camera, meshes, navigate, updateRotationSpeed) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let isDragged = false;
    let mouseMoveCount = 0;
    let lastMouseX = 0;
    let lastTime = 0;
    let currentSpeed = 0;
    let hoveredObject = null;

    const onObjNum = (event) => {
        const rect = mountElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        return raycaster.intersectObjects(meshes);
    };

    const onMouseMove = (event) => {
        const intersects = onObjNum(event);
        mountElement.style.cursor = intersects.length > 0 ? 'pointer' : 'auto';

        // 恢复之前悬浮物体的高度和缩放
        if (hoveredObject) {
            hoveredObject.userData.currentY = hoveredObject.userData.originalY;
            hoveredObject.userData.currentScale = hoveredObject.userData.originalScale;
            hoveredObject = null;
        }

        if (!isDragging) {
            if (intersects.length > 0) {
                const currentHoveredObject = intersects[0].object;
                if (currentHoveredObject !== hoveredObject) {
                    currentHoveredObject.userData.currentY = currentHoveredObject.userData.originalY + 0.3; // Increase height
                    currentHoveredObject.userData.currentScale = new THREE.Vector3(1.1, 1.1, 1.1); // Increase scale
                    hoveredObject = currentHoveredObject;
                }
            }
        }

        if (isDragging) {
            const deltaX = event.clientX - lastMouseX;
            const deltaTime = event.timeStamp - lastTime;
            currentSpeed = deltaX / deltaTime;

            updateRotationSpeed(-currentSpeed);

            lastMouseX = event.clientX;
            lastTime = event.timeStamp;

            mouseMoveCount += 1;
        }

        if (mouseMoveCount >= 2) {
            isDragged = true;
        }
    };

    const onMouseDown = (event) => {
        const intersects = onObjNum(event);
        isDragging = intersects.length > 0;
        isDragged = false;
        lastMouseX = event.clientX;
        lastTime = event.timeStamp;
    };

    const onMouseUp = () => {
        isDragging = false;
        mouseMoveCount = 0;
    };

    const onMouseClick = (event) => {
        if (!isDragged) {
            const intersects = onObjNum(event);
            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;
                setTimeout(() => {
                    navigate(clickedObject.userData.route);
                }, 100);
            }
        } else {
            isDragged = false;
        }
    };

    return {
        onMouseClick,
        onMouseMove,
        onMouseDown,
        onMouseUp
    };
};
