// src/geometry/GeometryCreator.js
import * as THREE from 'three';
import { workDetails } from '../../data/WorkData'; // 导入共享的工作数据

const RADIUS = 2;

export const createGeometry = () => {
    const loader = new THREE.TextureLoader();
    THREE.ColorManagement.enabled = true;  // 使用 color management

    // 创建几何体对象数组，根据 workDetails 中的工作数目
    const objects = Object.keys(workDetails).map(key => {
        const work = workDetails[key];
        // 使用 require 加载图片
        const texture = loader.load(require(`../../${work.imageUrl}`));
        texture.colorSpace = THREE.SRGBColorSpace;  // 设置正确的颜色空间
        return {
            map: texture,
            route: `/works/${key}`,
            side: THREE.DoubleSide, // 双面材质，确保两面都可见
        };
    });
    return objects.map((obj, index) => {
        const geometry = new THREE.PlaneGeometry(3, 5);
        const material = new THREE.MeshBasicMaterial({ map: obj.map, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData.route = obj.route;
        mesh.userData.originalY = 0;  // Initial height

        // const angle = (index / objects.length) * Math.PI * 2;
        // const x = RADIUS * Math.cos(angle);
        // const z = RADIUS * Math.sin(angle);
        // mesh.position.set(x, mesh.userData.originalY, z);
        // mesh.rotation.y = -(Math.PI / 4);

        return mesh;
    });
};

export { RADIUS };