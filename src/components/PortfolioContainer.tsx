import React, { useState, useEffect } from 'react';
import DraggableSection from './DraggableSection';
import AboutMe from './AboutMe';
import Projects from './Projects';
import TechStack from './TechStack';
import Experience from './Experience';

interface Position {
    x: number;
    y: number;
}

interface SectionPosition {
    [key: string]: Position;
}

const defaultPositions: SectionPosition = {
    about: { x: 20, y: 20 },
    projects: { x: 20, y: 300 },
    techStack: { x: 20, y: 580 },
    experience: { x: 20, y: 860 }
};

const PortfolioContainer = () => {
    const [positions, setPositions] = useState<SectionPosition>(defaultPositions);
    const [showSaveButton, setShowSaveButton] = useState(false);

    useEffect(() => {
        // localStorage에서 저장된 위치 불러오기
        const savedPositions = localStorage.getItem('sectionPositions');
        if (savedPositions) {
            setPositions(JSON.parse(savedPositions));
        }
    }, []);

    const handlePositionChange = (id: string, newPosition: Position) => {
        setPositions(prev => ({
            ...prev,
            [id]: newPosition
        }));
        setShowSaveButton(true);
    };

    const handleSavePositions = () => {
        localStorage.setItem('sectionPositions', JSON.stringify(positions));
        setShowSaveButton(false);
    };

    const handleResetPositions = () => {
        setPositions(defaultPositions);
        localStorage.removeItem('sectionPositions');
        setShowSaveButton(false);
    };

    return (
        <div className="relative min-h-screen w-full bg-gray-100 overflow-hidden p-4">
            <div className="fixed top-4 right-4 space-x-4 z-50">
                {showSaveButton && (
                    <button
                        onClick={handleSavePositions}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        위치 저장
                    </button>
                )}
                <button
                    onClick={handleResetPositions}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                    위치 초기화
                </button>
            </div>

            <DraggableSection
                id="about"
                onPositionChange={handlePositionChange}
                initialPosition={positions.about}
            >
                <AboutMe />
            </DraggableSection>

            <DraggableSection
                id="projects"
                onPositionChange={handlePositionChange}
                initialPosition={positions.projects}
            >
                <Projects />
            </DraggableSection>

            <DraggableSection
                id="techStack"
                onPositionChange={handlePositionChange}
                initialPosition={positions.techStack}
            >
                <TechStack />
            </DraggableSection>

            <DraggableSection
                id="experience"
                onPositionChange={handlePositionChange}
                initialPosition={positions.experience}
            >
                <Experience />
            </DraggableSection>
        </div>
    );
};

export default PortfolioContainer; 