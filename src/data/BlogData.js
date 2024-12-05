// src/data/BlogData.js

const blogContext = require.context('./blogs', false, /\.js$/);

const BlogData = blogContext.keys().flatMap((path) => {
    const blogModule = blogContext(path);

    // 使用默认导出或具名导出
    const blogPosts = blogModule.default || blogModule.blog || [];

    // 确保每个博客都有以日期为标识的id
    return blogPosts.map(post => ({
        ...post,
        id: post.date.toString() // 确保id是字符串
    }));
}).sort((a, b) => {
    // 根据日期降序排序
    return new Date(b.date) - new Date(a.date);
});

export { BlogData };