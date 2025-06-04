import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
    id: string;
    children: React.ReactNode;
}

export function SortableItem({ id, children }: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="relative">
                <div className="absolute -left-8 top-4 cursor-move">
                    ⋮⋮
                </div>
                {children}
            </div>
        </div>
    );
} 