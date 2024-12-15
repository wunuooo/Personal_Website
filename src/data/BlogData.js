// src/data/BlogData.js

// const blogContext = require.context('./blogs', false, /\.js$/);
// // const blogContext = require.context('/assets/data//blogs', false, /\.js$/);

// const BlogData = blogContext.keys().flatMap((path) => {
//     const blogModule = blogContext(path);

//     // 使用默认导出或具名导出
//     const blogPosts = blogModule.default || blogModule.blog || [];

//     // 确保每个博客都有以日期为标识的id
//     return blogPosts.map(post => ({
//         ...post,
//         id: post.date.toString() // 确保id是字符串
//     }));
// }).sort((a, b) => {
//     // 根据日期降序排序
//     return new Date(b.date) - new Date(a.date);
// });

// export { BlogData };


// const blogsDirectory = '/assets/blogs'; // JSON 文件目录

// /**
//  * 动态加载 JSON 文件，生成博客数据
//  * @returns {Promise<Array>}
//  */
// export const BlogData = async () => {
//     try {
//         const response = await fetch(`${blogsDirectory}/index.json`);
//         if (!response.ok) {
//             console.error('Failed to fetch blog index:', response.statusText);
//             return [];
//         }

//         const blogFiles = await response.json(); // 加载博客文件列表
//         const blogData = await Promise.all(
//             blogFiles.map(async (file) => {
//                 const fileResponse = await fetch(`${blogsDirectory}/${file}`);
//                 if (!fileResponse.ok) {
//                     console.error(`Failed to fetch blog file ${file}:`, fileResponse.statusText);
//                     return null;
//                 }
//                 const blogContent = await fileResponse.json();
//                 return blogContent.blog[0]; // 假设每个 JSON 文件包含一个 `blog` 数组
//             })
//         );

//         return blogData.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date)); // 按日期降序排序
//     } catch (error) {
//         console.error('Error loading blog data:', error);
//         return [];
//     }
// };

const blogsDirectory = '/assets/blogs'; // HTML 文件目录

/**
 * 动态加载 HTML 文件，生成博客数据
 * @returns {Promise<Array>}
 */
export const BlogData = async () => {
    try {
        const response = await fetch(`${blogsDirectory}/index.json`); // 加载博客索引（例如，包含文件名的 JSON）
        if (!response.ok) {
            console.error('Failed to fetch blog index:', response.statusText);
            return [];
        }

        const blogFiles = await response.json(); // 加载博客文件列表
        const blogData = await Promise.all(
            blogFiles.map(async (file) => {
                const fileResponse = await fetch(`${blogsDirectory}/${file}`);
                if (!fileResponse.ok) {
                    console.error(`Failed to fetch blog file ${file}:`, fileResponse.statusText);
                    return null;
                }
                const blogContent = await fileResponse.text(); // 获取 HTML 文件内容
                const parser = new DOMParser();
                const doc = parser.parseFromString(blogContent, 'text/html');

                // 提取元数据
                const title = doc.querySelector('title').textContent;
                const date = doc.querySelector('meta[name="date"]').getAttribute('content');
                const tags = doc.querySelector('meta[name="tags"]').getAttribute('content').split(',');

                // 提取文章内容
                const content = doc.querySelector('article').innerHTML;
                // 返回结构化的博客数据
                return {
                    title,
                    date,
                    tags,
                    content,
                };
            })
        );

        return blogData.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date)); // 按日期降序排序
    } catch (error) {
        console.error('Error loading blog data:', error);
        return [];
    }
};
