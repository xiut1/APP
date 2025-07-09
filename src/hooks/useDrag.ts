import { useState, useEffect, useCallback } from 'react';
import { Position, DragState } from '../types/portfolio';

interface UseDragProps {
    initialPosition?: Position;
    onPositionChange?: (position: Position) => void;
    boundaries?: {
        minX?: number;
        maxX?: number;
        minY?: number;
        maxY?: number;
    };
    disabled?: boolean;
}

export const useDrag = ({
    initialPosition = { x: 0, y: 0 },
    onPositionChange,
    boundaries,
    disabled = false
}: UseDragProps) => {
    const [position, setPosition] = useState<Position>(initialPosition);
    const [dragState, setDragState] = useState<DragState>({
        isDragging: false,
        dragStart: { x: 0, y: 0 },
        elementOffset: { x: 0, y: 0 }
    });

    // 위치 업데이트 시 초기 위치도 함께 업데이트
    useEffect(() => {
        setPosition(initialPosition);
    }, [initialPosition]);

    // 경계 확인 함수
    const applyBoundaries = useCallback((pos: Position): Position => {
        if (!boundaries) return pos;
        
        let { x, y } = pos;
        
        if (boundaries.minX !== undefined) x = Math.max(x, boundaries.minX);
        if (boundaries.maxX !== undefined) x = Math.min(x, boundaries.maxX);
        if (boundaries.minY !== undefined) y = Math.max(y, boundaries.minY);
        if (boundaries.maxY !== undefined) y = Math.min(y, boundaries.maxY);
        
        return { x, y };
    }, [boundaries]);

    // 마우스 다운 핸들러
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (disabled) return;
        
        e.preventDefault();
        
        const newDragState: DragState = {
            isDragging: true,
            dragStart: { x: e.clientX, y: e.clientY },
            elementOffset: {
                x: e.clientX - position.x,
                y: e.clientY - position.y
            }
        };
        
        setDragState(newDragState);
    }, [disabled, position]);

    // 마우스 이동 핸들러
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!dragState.isDragging) return;

        const newPosition = applyBoundaries({
            x: e.clientX - dragState.elementOffset.x,
            y: e.clientY - dragState.elementOffset.y
        });

        setPosition(newPosition);
        onPositionChange?.(newPosition);
    }, [dragState, applyBoundaries, onPositionChange]);

    // 마우스 업 핸들러
    const handleMouseUp = useCallback(() => {
        if (!dragState.isDragging) return;
        
        setDragState(prev => ({
            ...prev,
            isDragging: false
        }));
    }, [dragState.isDragging]);

    // 터치 이벤트 핸들러
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (disabled) return;
        
        e.preventDefault();
        const touch = e.touches[0];
        
        const newDragState: DragState = {
            isDragging: true,
            dragStart: { x: touch.clientX, y: touch.clientY },
            elementOffset: {
                x: touch.clientX - position.x,
                y: touch.clientY - position.y
            }
        };
        
        setDragState(newDragState);
    }, [disabled, position]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!dragState.isDragging) return;
        
        e.preventDefault();
        const touch = e.touches[0];
        
        const newPosition = applyBoundaries({
            x: touch.clientX - dragState.elementOffset.x,
            y: touch.clientY - dragState.elementOffset.y
        });

        setPosition(newPosition);
        onPositionChange?.(newPosition);
    }, [dragState, applyBoundaries, onPositionChange]);

    const handleTouchEnd = useCallback(() => {
        if (!dragState.isDragging) return;
        
        setDragState(prev => ({
            ...prev,
            isDragging: false
        }));
    }, [dragState.isDragging]);

    // 이벤트 리스너 등록/해제
    useEffect(() => {
        if (dragState.isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [dragState.isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

    // 위치 재설정 함수
    const resetPosition = useCallback(() => {
        setPosition(initialPosition);
        onPositionChange?.(initialPosition);
    }, [initialPosition, onPositionChange]);

    return {
        position,
        isDragging: dragState.isDragging,
        handlers: {
            onMouseDown: handleMouseDown,
            onTouchStart: handleTouchStart
        },
        resetPosition,
        setPosition: (newPosition: Position) => {
            const boundedPosition = applyBoundaries(newPosition);
            setPosition(boundedPosition);
            onPositionChange?.(boundedPosition);
        }
    };
};