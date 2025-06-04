import React, { useState, useEffect } from 'react';

interface Position {
    x: number;
    y: number;
}

interface Props {
    id: string;
    children: React.ReactNode;
    onPositionChange: (id: string, position: Position) => void;
    initialPosition?: Position;
}

const DraggableSection: React.FC<Props> = ({ id, children, onPositionChange, initialPosition = { x: 0, y: 0 } }) => {
    const [position, setPosition] = useState<Position>(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
    const [elementOffset, setElementOffset] = useState<Position>({ x: 0, y: 0 });

    useEffect(() => {
        setPosition(initialPosition);
    }, [initialPosition]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setElementOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const newPosition = {
            x: e.clientX - elementOffset.x,
            y: e.clientY - elementOffset.y
        };

        setPosition(newPosition);
        onPositionChange(id, newPosition);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, elementOffset]);

    return (
        <div
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
                zIndex: isDragging ? 1000 : 1,
            }}
            onMouseDown={handleMouseDown}
            className="w-full md:w-[600px]"
        >
            {children}
        </div>
    );
};

export default DraggableSection; 