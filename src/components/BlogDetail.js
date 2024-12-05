// src/components/BlogDetail.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { BlogData } from '../data/BlogData';

const BlogDetail = () => {
    const { id } = useParams();
    const blog = BlogData.find(item => item.id === id);

    if (!blog) {
        return <div>未找到该博客</div>;
    }

    return (
        <div className="container mx-auto my-8 p-4 main_content max-w-4xl">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <div className="text-gray-500 mb-4">
                <span className="mr-4">发布日期：{blog.date}</span>
                <div className="inline-flex space-x-2">
                    {blog.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-black text-white text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="text-gray-700 leading-relaxed">
                {typeof blog.content === 'function' ? blog.content() : blog.content}
            </div>
        </div>
    );
};

export default BlogDetail;