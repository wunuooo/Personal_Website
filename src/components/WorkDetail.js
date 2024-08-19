// src/components/WorkDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { workDetails } from '../data/WorkData';

const WorkDetail = () => {
    const { id } = useParams();
    const work = workDetails[id] || null;

    if (!work) {
        return (
            <div className="container mx-auto my-8 p-4">
                <h1 className="text-3xl font-bold mb-4">未找到该工作的描述。</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-8 p-4">
            <h1 className="text-3xl font-bold mb-4">{work.title}</h1>
            <img src={work.imageUrl} alt={work.title} className="w-full h-auto mb-4" />
            <p className="mb-4">{work.description}</p>
            <p className="mb-4"><strong>日期:</strong> {work.date}</p>
            <p className="mb-4"><strong>项目类型:</strong> {work.projectType}</p>
            <p className="mb-4"><strong>参与人员:</strong> {work.participants.join(', ')}</p>
        </div>
    );
};

export default WorkDetail;
