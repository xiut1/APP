import React from 'react';
import { motion } from 'framer-motion';

interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    link: string;
}

const Projects = () => {
    const projects: Project[] = [
        {
            id: '1',
            title: '프로젝트 1',
            description: '프로젝트에 대한 상세 설명입니다.',
            technologies: ['React', 'TypeScript', 'Node.js'],
            imageUrl: '/project1.jpg',
            link: 'https://github.com/yourusername/project1'
        },
        // 추가 프로젝트를 여기에 넣을 수 있습니다
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
            <h2 className="text-3xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        whileHover={{ scale: 1.02 }}
                        className="border rounded-lg overflow-hidden shadow-md"
                    >
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                프로젝트 보기 →
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default Projects; 