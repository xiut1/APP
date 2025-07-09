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
    const baseClasses = 'bg-white rounded-lg shadow-lg p-6 md:p-8';
    const hoverClasses = isHoverable ? 'hover:shadow-xl transition-shadow duration-300' : '';
    const draggingClasses = isDragging ? 'shadow-2xl' : '';
    
    return (
        <motion.div
            className={`${baseClasses} ${hoverClasses} ${draggingClasses} ${className}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={ANIMATION_CONFIG.SPRING}
            whileHover={isHoverable ? { scale: 1.02 } : {}}
            whileTap={isHoverable ? { scale: 0.98 } : {}}
        >
            {title && (
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
                    {title}
                </h2>
            )}
            {children}
        </motion.div>
    );
};

export default Card;