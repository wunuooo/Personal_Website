// src/components/Works.js
import React from 'react';
import { Link } from 'react-router-dom';
import { workDetails } from '../data/WorkData'; // 导入共享的工作数据

const Works = () => {
    const works = Object.keys(workDetails); // 从工作数据中获取工作列表

    return (
        <div className="container mx-auto my-8 p-4 main_content">
            <h1 className="text-3xl font-bold mb-4">作品展示</h1>
            {works.map(work => (
                <p key={work}>
                    <Link to={`/works/${work}`} className="text-blue-500 hover:underline">
                        {work}
                    </Link>
                </p>
            ))}
        </div>
    );
};

export default Works;
