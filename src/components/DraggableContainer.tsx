import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import AboutMe from './AboutMe';
import Projects from './Projects';
import TechStack from './TechStack';
import Experience from './Experience';

interface Section {
    id: string;
    component: React.ReactNode;
}

const DraggableContainer = () => {
    const [sections, setSections] = useState<Section[]>([
        { id: 'about', component: <AboutMe /> },
        { id: 'projects', component: <Projects /> },
        { id: 'techstack', component: <TechStack /> },
        { id: 'experience', component: <Experience /> },
    ]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setSections((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="max-w-4xl mx-auto py-8 px-4">
                <SortableContext
                    items={sections.map((section) => section.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {sections.map((section) => (
                        <SortableItem key={section.id} id={section.id}>
                            {section.component}
                        </SortableItem>
                    ))}
                </SortableContext>
            </div>
        </DndContext>
    );
};

export default DraggableContainer; 