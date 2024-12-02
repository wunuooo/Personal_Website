// src/geometry/GeometryCreator.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { TextureLoader } from 'three';
import { workDetails } from '../../data/WorkData'; // 导入共享的工作数据
import { RoundedRectangle } from './RoundedRecCreator';

const RADIUS = 10;

export const createRoundedRectangle = () => {
    const loader = new TextureLoader();
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
    // const colors = [0xff5733, 0x33ff57, 0x3357ff, 0xff33a6, 0xffff33, 0x33fff3];
    // const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // const geometry = new THREE.SphereGeometry(0.25, 25, 24);
    // const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    // const star = new THREE.Mesh(geometry, material);

    // const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    // star.position.set(x, y, z);
    // console.log('create star with color:', randomColor);

    // return star;

    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        // 设置纹理加载器
        const textureLoader = new THREE.TextureLoader();
        const textureCube = new THREE.CubeTextureLoader()

        // 设置纹理加载的基础路径
        textureLoader.setPath('/textures/');
        textureCube.setPath('/textures/Standard-Cube-Map/')

        const diffuseTexture = textureLoader.load('vg_whitePotato_albedo.png');
        const normalTexture = textureLoader.load('vg_whitePotato_nrm.png');
        const roughnessTexture = textureLoader.load('vg_whitePotato_rough.png');
        const cubeTexture = textureCube.load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

        loader.load(
            '/WhitePotato.gltf',
            (gltf) => {
                const model = gltf.scene;

                // 随机旋转
                model.rotation.x = Math.random() * Math.PI * 2;
                model.rotation.y = Math.random() * Math.PI * 2;
                model.rotation.z = Math.random() * Math.PI * 2;

                // 设置模型大小（可选）
                model.scale.set(30, 30, 30);

                const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50));
                model.position.set(x, y, z);

                // 添加材质
                // 遍历模型中的所有网格，给每个网格应用材质和纹理
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: diffuseTexture, // 颜色纹理
                            normalMap: normalTexture, // 法线纹理
                            roughnessMap: roughnessTexture, // 粗糙度纹理
                            envMap: cubeTexture,
                            envMapIntensity: 1,
                            roughness: 0, // 可选：粗糙度
                            metalness: 1, // 可选：金属度
                        });
                    }
                });

                resolve(model);
            },
            (progress) => {
                console.log('Loading model...',
                    (progress.loaded / progress.total * 100) + '%'
                );
            },
            (error) => {
                console.error('An error occurred while loading the model', error);
                reject(error);
            }
        );
    });
}

export { RADIUS };