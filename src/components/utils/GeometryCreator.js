// src/components/utils/GeometryCreator.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
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

export const createPotato = (isCenter) => {

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

    if (!isCenter) {
        return new Promise((resolve, reject) => {

            const loader = new GLTFLoader();
            loader.load(
                '/WhitePotato.gltf',
                (gltf) => {
                    const model = gltf.scene;

                    // 随机旋转
                    model.rotation.x = Math.random() * Math.PI * 2;
                    model.rotation.y = Math.random() * Math.PI * 2;
                    model.rotation.z = Math.random() * Math.PI * 2;

                    // 设置模型大小（可选）
                    model.scale.set(20, 20, 20);

                    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50));
                    model.position.set(x, y, z);

                    // 添加材质
                    // 遍历模型中的所有网格，给每个网格应用材质和纹理
                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.material = new THREE.MeshStandardMaterial({
                                // map: diffuseTexture, // 颜色纹理
                                // normalMap: normalTexture, // 法线纹理
                                // normalScale: new THREE.Vector2(2, 2),
                                // roughnessMap: roughnessTexture, // 粗糙度纹理
                                envMap: cubeTexture,
                                envMapIntensity: 2,
                                roughness: 0, // 粗糙度
                                metalness: 1, // 金属度
                                color: 0xE0E0E0,
                            });
                        }
                    });

                    resolve(model);
                },
            );
        });
    }
    else {
        return new Promise((resolve, reject) => {

            const loader = new GLTFLoader();
            loader.load(
                '/WhitePotatoGerminated.gltf',
                (gltf) => {
                    const model = gltf.scene;

                    // 设置模型大小
                    model.scale.set(50, 50, 50);
                    model.position.set(0, 0, 0);

                    // 添加材质
                    // 遍历模型中的所有网格，给每个网格应用材质和纹理
                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.material = new THREE.MeshStandardMaterial({
                                // map: diffuseTexture, // 颜色纹理
                                // normalMap: normalTexture, // 法线纹理
                                // roughnessMap: roughnessTexture, // 粗糙度纹理
                                envMap: cubeTexture,
                                envMapIntensity: 2,
                                roughness: 0, // 粗糙度
                                metalness: 1, // 金属度
                                color: 0xE0E0E0,
                            });
                        }
                    });

                    resolve(model);
                },
            );
        });
    }
}

export { RADIUS };