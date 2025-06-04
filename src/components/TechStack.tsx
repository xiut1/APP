import React from 'react';
import { motion } from 'framer-motion';

interface TechItem {
    id: string;
    name: string;
    icon: string;
    proficiency: number;
}

const TechStack = () => {
    const technologies: TechItem[] = [
        {
            id: '1',
            name: 'React',
            icon: '⚛️',
            proficiency: 90,
        },
        {
            id: '2',
            name: 'TypeScript',
            icon: '📘',
            proficiency: 85,
        },
        {
            id: '3',
            name: 'Node.js',
            icon: '🟢',
            proficiency: 80,
        },
        // 추가 기술 스택을 여기에 넣을 수 있습니다
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
            <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {technologies.map((tech) => (
                    <motion.div
                        key={tech.id}
                        whileHover={{ scale: 1.05 }}
                        className="p-4 border rounded-lg shadow-sm"
                    >
                        <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2">{tech.icon}</span>
                            <h3 className="text-xl font-semibold">{tech.name}</h3>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${tech.proficiency}%` }}
                            />
                        </div>
                        <span className="text-sm text-gray-600 mt-1">
                            숙련도: {tech.proficiency}%
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default TechStack; 