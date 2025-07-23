import React from 'react';
import Card from './common/Card';

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
        <Card title="Tech Stack">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {technologies.map((tech) => (
                    <div
                        key={tech.id}
                        className="p-4 border border-gray-700 bg-gray-800 rounded-lg hover:border-gray-600 transition-all duration-300"
                    >
                        <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{tech.icon}</span>
                            <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                            <div
                                className="bg-blue-400 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${tech.proficiency}%` }}
                            />
                        </div>
                        <span className="text-sm text-gray-400">
                            숙련도: {tech.proficiency}%
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default TechStack;