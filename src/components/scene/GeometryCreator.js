// src/geometry/createGeometry.js
import * as THREE from 'three';

const RADIUS = 4; // 定义 RADIUS

export const createGeometry = () => {
    const objects = [
        { color: 0x00ff00, route: '/works/work1' },
        { color: 0xff0000, route: '/works/work2' },
        { color: 0x0000ff, route: '/works/work3' },
        { color: 0x0000ff, route: '/works/work3' },
        { color: 0x0000ff, route: '/works/work3' },
        { color: 0x0000ff, route: '/works/work3' },
        { color: 0x0000ff, route: '/works/work3' },
        // ... more objects
    ];

    return objects.map((obj, index) => {
        const geometry = new THREE.PlaneGeometry(1.6, 1);
        const material = new THREE.MeshBasicMaterial({ color: obj.color, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData.route = obj.route;
        mesh.userData.originalY = 0;  // Initial height

        const angle = (index / objects.length) * Math.PI * 2;
        const x = RADIUS * Math.cos(angle);
        const z = RADIUS * Math.sin(angle);
        mesh.position.set(x, mesh.userData.originalY, z);
        mesh.rotation.y = -angle;

        return mesh;
    });
};

export { RADIUS }; // 导出 RADIUS
