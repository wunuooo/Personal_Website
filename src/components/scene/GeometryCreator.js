// src/geometry/GeometryCreator.js
import * as THREE from 'three';
import { workDetails } from '../../data/WorkData'; // 导入共享的工作数据

const RADIUS = 4;

export const createGeometry = () => {
    // 创建几何体对象数组，根据 workDetails 中的工作数目
    const objects = Object.keys(workDetails).map(key => ({
        color: Math.random() * 0xffffff, // 为每个工作生成一个随机颜色（你可以根据需要自定义颜色）
        route: `/works/${key}`,
    }));

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

export { RADIUS };
