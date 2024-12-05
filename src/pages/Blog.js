// src/pages/Blog.js

import React from 'react';
import { Link } from 'react-router-dom';
import { BlogData } from '../data/BlogData';

const Blog = () => {
    return (
        <div className="container mx-auto my-8 p-4 main_content max-w-4xl">

            <div className="space-y-6">
                {BlogData.map((post) => (
                    <Link
                        to={`/blog/${post.id}`}
                        key={post.id}
                        className="block"
                    >
                        <div className="bg-white border p-6 mb-6 rounded-lg transition-all duration-300 hover:shadow-xl">
                            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                            <div className="text-gray-500 mb-4">
                                <span className="mr-4">发布日期：{post.date}</span>
                                <div className="inline-flex space-x-2">
                                    {post.tags.map((tag, index) => (
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
                                {typeof post.content === 'function' ? post.content() : post.content}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Blog;
