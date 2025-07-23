import React from 'react';
import Card from './common/Card';
import { DEFAULT_PORTFOLIO_DATA } from '../config/portfolio';

const AboutMe = () => {
    const { personalInfo } = DEFAULT_PORTFOLIO_DATA;
    
    return (
        <Card title="About Me">
            <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                    {personalInfo.avatar && (
                        <img 
                            src={personalInfo.avatar} 
                            alt={personalInfo.name}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                    )}
                    <div>
                        <h3 className="text-xl font-semibold text-white">{personalInfo.name}</h3>
                        <p className="text-lg text-blue-400">{personalInfo.title}</p>
                    </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                    {personalInfo.description}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                    <a 
                        href={`mailto:${personalInfo.email}`} 
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center"
                    >
                        📧 이메일
                    </a>
                    <a 
                        href={personalInfo.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center"
                    >
                        🐙 GitHub
                    </a>
                    <a 
                        href={personalInfo.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center"
                    >
                        💼 LinkedIn
                    </a>
                    {personalInfo.website && (
                        <a 
                            href={personalInfo.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center"
                        >
                            🌐 Website
                        </a>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default AboutMe;