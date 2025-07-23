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
    onFixed,
    initialPosition = { x: 0, y: 0 },
    className = '',
    zIndex = 1
}) => {
    const handlePositionChange = useCallback((position: typeof initialPosition) => {
        onPositionChange(id, position);
    }, [id, onPositionChange]);

    const { position, isDragging, isFixed, isGravityActive, handlers } = useDrag({
        initialPosition,
        onPositionChange: handlePositionChange,
        onDragStart: () => onDragStart?.(id),
        onFixed,
        id,
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
                cursor: isFixed ? 'default' : (isDragging ? 'grabbing' : 'grab'),
                zIndex: isDragging ? DRAG_CONFIG.DRAG_Z_INDEX : zIndex,
                filter: isFixed ? 'brightness(1.2) saturate(1.3)' : 'none',
            }}
            className={`w-full md:w-[600px] ${className} ${isFixed ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}
            {...handlers}
            animate={{
                scale: isDragging ? 1.05 : (isFixed ? 1.02 : 1),
                rotate: isDragging ? 3 : (isFixed ? 0 : Math.random() * 4 - 2),
                boxShadow: isFixed 
                    ? '0 0 20px rgba(255, 255, 0, 0.3), 3px 3px 8px rgba(0, 0, 0, 0.3)'
                    : isGravityActive 
                        ? '2px 2px 6px rgba(0, 0, 0, 0.2)'
                        : '3px 3px 8px rgba(0, 0, 0, 0.3)',
            }}
            transition={ANIMATION_CONFIG.SPRING}
            whileHover={!isFixed ? { scale: 1.02, rotate: 0 } : {}}
        >
            {children}
        </motion.div>
    );
};

export default DraggableSection;