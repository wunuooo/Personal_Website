// src/geometry/GeometryCreator.js
import * as THREE from 'three';
import { workDetails } from '../../data/WorkData'; // 导入共享的工作数据
import { RoundedRectangle } from './RoundedRecCreator';

const RADIUS = 10;

export const createRoundedRectangle = () => {
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
    return objects.map((obj) => {
        const geometry = RoundedRectangle(2, 3, 0.2, 10);
        const material = new THREE.MeshBasicMaterial({ map: obj.map, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData.route = obj.route;
        mesh.userData.originalY = 0;

        return mesh;
    });
};

export const createStars = () => {
    const colors = [0xff5733, 0x33ff57, 0x3357ff, 0xff33a6, 0xffff33, 0x33fff3];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const geometry = new THREE.SphereGeometry(0.25, 25, 24);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    console.log('create star with color:', randomColor);

    return star;
}

export { RADIUS };