import React from 'react';

const AboutMe = () => {
    return (
        <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-4">
                <p className="text-gray-700">
                    안녕하세요! 저는 열정적인 웹 개발자입니다. 사용자 경험을 개선하고
                    혁신적인 솔루션을 만드는 것을 좋아합니다.
                </p>
                <div className="flex space-x-4">
                    <a href="mailto:your.email@example.com" className="text-blue-600 hover:text-blue-800">
                        이메일
                    </a>
                    <a href="https://github.com/yourusername" className="text-blue-600 hover:text-blue-800">
                        GitHub
                    </a>
                    <a href="https://linkedin.com/in/yourusername" className="text-blue-600 hover:text-blue-800">
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutMe; 