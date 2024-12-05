// src/components/WorkDetail.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { workData } from '../data/workData';

const WorkDetail = () => {
    const { category, id } = useParams();
    const work = workData[category].find(item => item.id === id);

    if (!work) {
        return <div>未找到该项目</div>;
    }

    const details = work.fullDetails;

    return (
        <div className="container mx-auto my-8 p-4 main_content">
            <h1 className="text-3xl font-bold mb-4">{work.title}</h1>
            <img src={work.thumbnail} alt={work.title} className="w-full h-auto mb-4" />
            <p className="mb-4">{details.description}</p>
            <p><strong>日期:</strong> {details.date}</p>
            <p><strong>项目类型:</strong> {details.projectType}</p>
            <p><strong>参与人员:</strong> {details.participants.join(', ')}</p>
        </div>
    );
};

export default WorkDetail;