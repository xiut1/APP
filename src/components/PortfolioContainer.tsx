import React, { useState, useEffect } from 'react';
import DraggableSection from './DraggableSection';
import AboutMe from './AboutMe';
import Projects from './Projects';
import TechStack from './TechStack';
import Experience from './Experience';
import { Position, SectionPosition } from '../types/portfolio';
import { DEFAULT_POSITIONS, STORAGE_KEYS } from '../config/portfolio';

const PortfolioContainer = () => {
    const [positions, setPositions] = useState<SectionPosition>(DEFAULT_POSITIONS);
    const [showSaveButton, setShowSaveButton] = useState(false);

    useEffect(() => {
        // localStorage에서 저장된 위치 불러오기
        const savedPositions = localStorage.getItem(STORAGE_KEYS.SECTION_POSITIONS);
        if (savedPositions) {
            try {
                const parsedPositions = JSON.parse(savedPositions);
                setPositions(parsedPositions);
            } catch (error) {
                console.error('Failed to parse saved positions:', error);
                setPositions(DEFAULT_POSITIONS);
            }
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
        try {
            localStorage.setItem(STORAGE_KEYS.SECTION_POSITIONS, JSON.stringify(positions));
            setShowSaveButton(false);
        } catch (error) {
            console.error('Failed to save positions:', error);
        }
    };

    const handleResetPositions = () => {
        setPositions(DEFAULT_POSITIONS);
        localStorage.removeItem(STORAGE_KEYS.SECTION_POSITIONS);
        setShowSaveButton(false);
    };

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden p-4">
            <div className="fixed top-4 right-4 space-x-2 z-50">
                {showSaveButton && (
                    <button
                        onClick={handleSavePositions}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        💾 위치 저장
                    </button>
                )}
                <button
                    onClick={handleResetPositions}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    🔄 위치 초기화
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