// src/data/workData.js

const workContext = require.context('./works', false, /\.js$/);

const workData = workContext.keys().reduce((acc, path) => {
    const category = path.replace('./', '').replace('.js', '');
    const workModule = workContext(path);

    // 检查模块是否有 data 和 order 属性
    if (workModule[category] && workModule[category].data) {
        acc[category] = workModule[category].data;

        // 将 order 属性保存为一个全局属性，用于排序
        acc[category].order = workModule[category].order || Infinity;
    }

    return acc;
}, {});

// 按 order 属性对分类进行排序
const sortedCategories = Object.keys(workData)
    .sort((a, b) => (workData[a].order || Infinity) - (workData[b].order || Infinity));

// 重新构建有序的 workData 对象
const orderedWorkData = sortedCategories.reduce((acc, category) => {
    acc[category] = workData[category];
    return acc;
}, {});

export { orderedWorkData as workData };