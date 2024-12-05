// src/data/workData.js

const workContext = require.context('./works', false, /\.js$/);

const workData = workContext.keys().reduce((acc, path) => {
    const category = path.replace('./', '').replace('.js', '');
    const workModule = workContext(path);

    // 假设每个模块导出一个数组，每个项目有 id, title, thumbnail, shortDescription
    acc[category] = workModule[category];
    return acc;
}, {});

export { workData };
