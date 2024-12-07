// src/components/utils/GeometryCreator.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import { RoundedRectangle } from './RoundedRecCreator';

const RADIUS = 10;

export const createRoundedRectangle = () => {
    const loader = new TextureLoader();
    THREE.ColorManagement.enabled = true;  // 使用 color management

    const images = [
        { path: '/images/pics/others.jpg', route: '/works/others' },
        { path: '/images/pics/architecture.jpg', route: '/works/architecture' },
        { path: '/images/pics/craft.jpg', route: '/works/craft' },
        { path: '/images/pics/gamedev.jpg', route: '/works/gamedev' },
        { path: '/images/pics/photo.jpg', route: '/works/photo' },
        { path: '/images/pics/tool.jpg', route: '/works/tool' },

    ];

    const objects = images.map(img => {
        const texture = loader.load(img.path);
        texture.colorSpace = THREE.SRGBColorSpace;

        return {
            map: texture,

            route: img.route,
            side: THREE.DoubleSide,
        };
    });

    return objects.map((obj) => {
        const geometry = RoundedRectangle(2, 3, 0.2, 10);
        const material = new THREE.MeshBasicMaterial({ map: obj.map, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData.route = obj.route;
        mesh.userData.originalY = 2 - (1 / (1 + Math.exp(10 * (0 + 0.8)))) * (1000000);
        mesh.position.y = 2 - (1 / (1 + Math.exp(10 * (0 + 0.8)))) * (1000000);

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

                    const angle = Math.random() * 2 * Math.PI;
                    const radius = Math.sqrt(Math.random()) * 30; // 使用平方根调整分布
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    const z = (Math.random() * 2 - 1.8) * 20; // 随机生成z轴位置

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
                    model.position.set(0, -5, 0);

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