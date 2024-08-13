import React from 'react';
import { Link } from 'react-router-dom';

const works = ['work1', 'work2', 'work3']; // 可以根据需要添加更多工作

const Works = () => {
    return (
        <div className="container mx-auto my-8 p-4">
            <h1 className="text-3xl font-bold mb-4">作品展示</h1>
            {works.map(work => (
                <p key={work}>
                    <Link to={`/works/${work}`} className="text-blue-500 hover:underline">{work}</Link>
                </p>
            ))}
        </div>
    );
};

export default Works;
