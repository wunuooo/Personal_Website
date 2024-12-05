// src/components/CustomModal.js

import React, { useState } from 'react';

const CustomModal = ({ triggerText, title, content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="p-4">
            <button
                onClick={openModal}
                className="text-black hover:text-gray-600"
            >
                {triggerText}
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{title}</h2>
                            <button
                                onClick={closeModal}
                                className="text-grey hover:text-black"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-4">
                            <p>{content}</p>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className="bg-black text-white px-4 py-2 rounded"
                            >
                                知道了
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomModal;