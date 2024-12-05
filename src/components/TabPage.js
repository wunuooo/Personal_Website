import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const TabPage = ({ category, data, activeCategory }) => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(activeCategory);

    useEffect(() => {
        setSelectedTab(activeCategory);
    }, [activeCategory]);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        navigate(`/${category}/${tab}`);
    };

    // 如果没有数据，返回空
    if (!data[selectedTab]) return null;

    return (
        <div className="container mx-auto my-8 p-4 main_content">
            <div className="flex border-b mb-4">
                {Object.keys(data).map(tab => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`px-4 py-2 ${selectedTab === tab
                            ? 'border-b-2 border-black-500 text-black-500'
                            : 'text-gray-600'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data[selectedTab].map(item => (
                    <Link
                        to={`/${category}/${selectedTab}/${item.id}`}
                        key={item.id}
                        className="block border rounded-lg p-4 hover:shadow-lg transition-shadow"
                    >
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-2">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.shortDescription}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TabPage;