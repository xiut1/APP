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
                zIndex: isDragging ? DRAG_CONFIG.DRAG_Z_INDEX : (isGravityActive ? zIndex + 1 : zIndex),
                // 중력 효과 활성화 시 필터는 animate에서 처리
                transformOrigin: 'center bottom', // 회전 중심점 설정
                willChange: 'transform', // 성능 최적화
                perspective: '1000px', // 3D 효과를 위한 원근감 추가
            }}
            className={`w-full md:w-[600px] ${className} ${isFixed ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}
            {...handlers}
            animate={{
                scale: isDragging ? 1.05 : (isFixed ? 1.02 : 1),
                rotate: isDragging ? 3 : (isFixed ? 0 : Math.random() * 4 - 2),
                boxShadow: isFixed 
                    ? '0 0 20px rgba(255, 255, 0, 0.3), 3px 3px 8px rgba(0, 0, 0, 0.3)'
                    : isGravityActive 
                        ? '0 8px 20px rgba(0, 0, 0, 0.15)' // 중력 활성화 시 더 부드러운 그림자
                        : '3px 3px 8px rgba(0, 0, 0, 0.3)',
                // 필터 효과 - 배열 형태 제거하여 에러 해결
                filter: isGravityActive 
                    ? 'blur(0.3px)'
                    : (isFixed ? 'brightness(1.2) saturate(1.3)' : 'none'),
            }}
            transition={isGravityActive ? ANIMATION_CONFIG.CUBRIX : ANIMATION_CONFIG.SPRING}
            whileHover={!isFixed ? { 
                scale: 1.03, 
                rotate: 0,
                translateY: -5, // 문자열 대신 숫자 값 사용
                transition: {
                    translateY: { type: 'spring', stiffness: 300, damping: 15 }
                }
            } : {}}
        >
            {children}
        </motion.div>
    );
};

export default DraggableSection;