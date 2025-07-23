import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { DraggableSectionProps } from '../types/portfolio';
import { useDrag } from '../hooks/useDrag';
import { DRAG_CONFIG, ANIMATION_CONFIG } from '../config/portfolio';

const DraggableSection: React.FC<DraggableSectionProps> = ({ 
    id, 
    children, 
    onPositionChange, 
    onDragStart,
    initialPosition = { x: 0, y: 0 },
    className = '',
    zIndex = 1
}) => {
    const handlePositionChange = useCallback((position: typeof initialPosition) => {
        onPositionChange(id, position);
    }, [id, onPositionChange]);

    const { position, isDragging, handlers } = useDrag({
        initialPosition,
        onPositionChange: handlePositionChange,
        onDragStart: () => onDragStart?.(id),
        boundaries: {
            minX: 0,
            minY: 0,
            maxX: typeof window !== 'undefined' ? window.innerWidth - 320 : 1000,
            maxY: typeof window !== 'undefined' ? window.innerHeight - 200 : 1000
        }
    });

    return (
        <motion.div
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                cursor: isDragging ? 'grabbing' : 'grab',
                zIndex: isDragging ? DRAG_CONFIG.DRAG_Z_INDEX : zIndex,
            }}
            className={`w-full md:w-[600px] ${className}`}
            {...handlers}
            animate={{
                scale: isDragging ? 1.05 : 1,
                rotate: isDragging ? 3 : Math.random() * 4 - 2,
            }}
            transition={ANIMATION_CONFIG.SPRING}
            whileHover={{ scale: 1.02, rotate: 0 }}
        >
            {children}
        </motion.div>
    );
};

export default DraggableSection;