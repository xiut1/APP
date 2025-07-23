// 포트폴리오 관련 타입 정의
export interface Position {
    x: number;
    y: number;
}

export interface SectionPosition {
    [key: string]: Position;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    link: string;
    githubLink?: string;
    liveLink?: string;
}

export interface TechCategory {
    id: string;
    name: string;
    technologies: Technology[];
}

export interface Technology {
    id: string;
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
    icon?: string;
    color?: string;
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    period: string;
    description: string;
    achievements: string[];
    technologies: string[];
}

export interface PersonalInfo {
    name: string;
    title: string;
    description: string;
    email: string;
    github: string;
    linkedin: string;
    website?: string;
    avatar?: string;
}

export interface PortfolioData {
    personalInfo: PersonalInfo;
    projects: Project[];
    techCategories: TechCategory[];
    experiences: Experience[];
}

// 드래그 관련 타입
export interface DragState {
    isDragging: boolean;
    dragStart: Position;
    elementOffset: Position;
}

export interface DraggableSectionProps {
    id: string;
    children: React.ReactNode;
    onPositionChange: (id: string, position: Position) => void;
    onDragStart?: (id: string) => void;
    onFixed?: (id: string, isFixed: boolean) => void;
    initialPosition?: Position;
    className?: string;
    zIndex?: number;
}

// 섹션 관련 타입
export type SectionType = 'about' | 'projects' | 'techStack' | 'experience';

export interface SectionConfig {
    id: SectionType;
    title: string;
    component: React.ComponentType;
    defaultPosition: Position;
    minWidth?: number;
    maxWidth?: number;
}