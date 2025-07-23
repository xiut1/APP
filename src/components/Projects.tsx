import React from 'react';
import Card from './common/Card';
import { DEFAULT_PORTFOLIO_DATA } from '../config/portfolio';

const Projects = () => {
    const { projects } = DEFAULT_PORTFOLIO_DATA;

    return (
        <Card title="Projects">
            <div className="space-y-6">
                {projects.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                        아직 프로젝트가 없습니다.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="border border-gray-700 bg-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
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
                                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center"
                                        >
                                            🔗 프로젝트 보기
                                        </a>
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-gray-300 transition-colors duration-200 flex items-center"
                                            >
                                                🐙 GitHub
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-400 hover:text-green-300 transition-colors duration-200 flex items-center"
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