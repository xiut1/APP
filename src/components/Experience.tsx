import React from 'react';

interface ExperienceItem {
    id: string;
    company: string;
    position: string;
    period: string;
    description: string[];
}

const Experience = () => {
    const experiences: ExperienceItem[] = [
        {
            id: '1',
            company: '회사 이름',
            position: '직책',
            period: '2022 - 현재',
            description: [
                '주요 프로젝트 A 개발 및 운영',
                '팀 생산성 30% 향상',
                '신규 기능 구현 및 유지보수'
            ]
        },
        // 추가 경력사항을 여기에 넣을 수 있습니다
    ];

    return (
        <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Experience</h2>
            <div className="space-y-8">
                {experiences.map((exp) => (
                    <div
                        key={exp.id}
                        className="border-l-4 border-blue-500 pl-4 hover:border-blue-600 transition-colors"
                    >
                        <h3 className="text-xl font-semibold">{exp.company}</h3>
                        <div className="text-gray-600 mb-2">
                            {exp.position} | {exp.period}
                        </div>
                        <ul className="list-disc list-inside space-y-2">
                            {exp.description.map((item, index) => (
                                <li key={index} className="text-gray-700">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience; 