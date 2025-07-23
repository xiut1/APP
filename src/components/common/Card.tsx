import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from '../../config/portfolio';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    isHoverable?: boolean;
    isDragging?: boolean;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    title,
    isHoverable = true,
    isDragging = false,
    onClick
}) => {
    const baseClasses = 'bg-gray-900 border border-gray-800 rounded-lg p-6 md:p-8';
    const hoverClasses = isHoverable ? 'hover:border-gray-700 hover:bg-gray-800 transition-all duration-300' : '';
    const draggingClasses = isDragging ? 'border-gray-600' : '';
    
    return (
        <motion.div
            className={`${baseClasses} ${hoverClasses} ${draggingClasses} ${className} relative`}
            onClick={onClick}
            style={{
                boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transform: 'rotate(0deg)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={ANIMATION_CONFIG.SPRING}
            whileHover={isHoverable ? {
                y: -4,
                boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15)',
                transition: { duration: 0.2 }
            } : {}}
            whileTap={isHoverable ? { scale: 0.98 } : {}}
        >
            {/* 포스트잇 스타일 코너 */}
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-gray-800 opacity-50" />
            
            {title && (
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">
                    {title}
                </h2>
            )}
            {children}
        </motion.div>
    );
};

export default Card;