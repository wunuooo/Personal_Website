import React from 'react';

const MainContent = () => {
    return (
        <div className="container mx-auto my-8 p-4">
            <h1 className="text-3xl font-bold mb-4">一级标题</h1>
            <h2 className="text-2xl font-bold mb-3">二级标题</h2>
            <h3 className="text-xl font-bold mb-2">三级标题</h3>
            <p className="mb-4">
                这是一些正文内容。你可以根据需要添加更多的段落和内容。
            </p>
            <p>
                这是更多的正文内容。你可以根据需要添加更多的段落和内容。
            </p>
        </div>
    );
};

export default MainContent;
