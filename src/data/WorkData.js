// src/data/workData.js
// const workContext = require.context('./works', false, /\.js$/);

// const workData = workContext.keys().reduce((acc, path) => {
//     // 从文件名中提取工作名称，例如 './work1.js' 提取为 'work1'
//     const workName = path.replace('./', '').replace('.js', '');

//     // 动态加载该模块并提取其中的工作对象
//     const workModule = workContext(path);

//     // 将工作对象加入到结果集中，使用正确的导出名称
//     acc[workName] = workModule[workName];  // 从模块中获取导出的对象
//     return acc;
// }, {});

// export { workData };

const workContext = require.context('./works', false, /\.js$/);

const workData = workContext.keys().reduce((acc, path) => {
    const category = path.replace('./', '').replace('.js', '');
    const workModule = workContext(path);

    // 假设每个模块导出一个数组，每个项目有 id, title, thumbnail, shortDescription
    acc[category] = workModule[category];
    return acc;
}, {});

export { workData };
