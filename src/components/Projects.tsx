import React from 'react';
import Card from './common/Card';
import { DEFAULT_PORTFOLIO_DATA } from '../config/portfolio';

const Projects = () => {
    const { projects } = DEFAULT_PORTFOLIO_DATA;

    return (
        <Card title="Projects">
            <div className="space-y-6">
                {projects.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        아직 프로젝트가 없습니다.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.title}</h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
                                        >
                                            🔗 프로젝트 보기
                                        </a>
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center"
                                            >
                                                🐙 GitHub
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:text-green-800 transition-colors duration-200 flex items-center"
                                            >
                                                🚀 Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default Projects; 