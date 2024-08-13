import React from 'react';
import { useParams } from 'react-router-dom';

const workDetails = {
    work1: '这里是工作 1 的详细描述。',
    work2: '这里是工作 2 的详细描述。',
    work3: '这里是工作 3 的详细描述。',
    // 添加更多工作描述...
};

const WorkDetail = () => {
    const { id } = useParams();
    const detail = workDetails[id] || '未找到该工作的描述。';

    return (
        <div className="container mx-auto my-8 p-4">
            <h1 className="text-3xl font-bold mb-4">{`Work ${id.replace('work', '')}`}</h1>
            <p>{detail}</p>
        </div>
    );
};

export default WorkDetail;
