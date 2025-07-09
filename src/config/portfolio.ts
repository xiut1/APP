import { SectionPosition, PortfolioData } from '../types/portfolio';

// 기본 섹션 위치 설정
export const DEFAULT_POSITIONS: SectionPosition = {
    about: { x: 20, y: 20 },
    projects: { x: 20, y: 300 },
    techStack: { x: 20, y: 580 },
    experience: { x: 20, y: 860 }
};

// 섹션 설정
export const SECTION_CONFIG = {
    about: {
        id: 'about' as const,
        title: 'About Me',
        defaultPosition: DEFAULT_POSITIONS.about,
        minWidth: 320,
        maxWidth: 600
    },
    projects: {
        id: 'projects' as const,
        title: 'Projects',
        defaultPosition: DEFAULT_POSITIONS.projects,
        minWidth: 320,
        maxWidth: 800
    },
    techStack: {
        id: 'techStack' as const,
        title: 'Tech Stack',
        defaultPosition: DEFAULT_POSITIONS.techStack,
        minWidth: 320,
        maxWidth: 600
    },
    experience: {
        id: 'experience' as const,
        title: 'Experience',
        defaultPosition: DEFAULT_POSITIONS.experience,
        minWidth: 320,
        maxWidth: 700
    }
};

// 로컬 스토리지 키
export const STORAGE_KEYS = {
    SECTION_POSITIONS: 'sectionPositions',
    THEME_PREFERENCE: 'themePreference',
    USER_PREFERENCES: 'userPreferences'
};

// 기본 포트폴리오 데이터
export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
    personalInfo: {
        name: '이름',
        title: '웹 개발자',
        description: '안녕하세요! 저는 열정적인 웹 개발자입니다. 사용자 경험을 개선하고 혁신적인 솔루션을 만드는 것을 좋아합니다.',
        email: 'your.email@example.com',
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername'
    },
    projects: [
        {
            id: '1',
            title: '프로젝트 1',
            description: '프로젝트에 대한 상세 설명입니다.',
            technologies: ['React', 'TypeScript', 'Node.js'],
            imageUrl: '/project1.jpg',
            link: 'https://github.com/yourusername/project1'
        }
    ],
    techCategories: [
        {
            id: 'frontend',
            name: '프론트엔드',
            technologies: [
                { id: 'react', name: 'React', level: 4 },
                { id: 'typescript', name: 'TypeScript', level: 4 },
                { id: 'nextjs', name: 'Next.js', level: 3 }
            ]
        },
        {
            id: 'backend',
            name: '백엔드',
            technologies: [
                { id: 'nodejs', name: 'Node.js', level: 3 },
                { id: 'python', name: 'Python', level: 3 }
            ]
        }
    ],
    experiences: [
        {
            id: '1',
            company: '회사명',
            position: '포지션',
            period: '2023.01 - 현재',
            description: '주요 업무 설명',
            achievements: ['성과 1', '성과 2'],
            technologies: ['React', 'TypeScript', 'Node.js']
        }
    ]
};

// 드래그 관련 상수
export const DRAG_CONFIG = {
    DRAG_THRESHOLD: 5, // 드래그 시작 임계값 (px)
    DRAG_Z_INDEX: 1000, // 드래그 중 z-index
    SNAP_THRESHOLD: 10, // 스냅 임계값 (px)
    BOUNDARY_PADDING: 20 // 경계 패딩 (px)
};

// 반응형 브레이크포인트
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280
};

// 애니메이션 설정
export const ANIMATION_CONFIG = {
    SPRING: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 200
    },
    EASE: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const
    }
};