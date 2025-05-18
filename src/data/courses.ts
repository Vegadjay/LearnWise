export interface Course {
  id: string;
  title: string;
  description: string;
  topic: string;
  subtopics: string[];
  duration: number; // minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  imageUrl: string;
  popularity: number; 
  youtubeVideoId: string;
}


export const SAMPLE_COURSES: Course[] = [
  {
    id: '1',
    title: 'Introduction to Mathematics',
    description: 'A beginner-friendly introduction to basic mathematical concepts and principles.',
    topic: 'Mathematics',
    subtopics: ['Algebra', 'Geometry'],
    duration: 120,
    difficulty: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    popularity: 4,
    youtubeVideoId: 'OmJ-4B-mS-Y', // Khan Academy: Intro to Math
  },
  {
    id: '2',
    title: 'Advanced Physics Concepts',
    description: 'Dive deep into advanced physics theories and their practical applications.',
    topic: 'Physics',
    subtopics: ['Quantum Mechanics', 'Thermodynamics'],
    duration: 180,
    difficulty: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa',
    popularity: 3,
    youtubeVideoId: 'ZAqIoDhornk', // PBS Space Time: Quantum Physics
  },
  {
    id: '3',
    title: 'Organic Chemistry Principles',
    description: 'Learn the fundamental principles of organic chemistry and molecular structures.',
    topic: 'Chemistry',
    subtopics: ['Organic Chemistry', 'Biochemistry'],
    duration: 90,
    difficulty: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6',
    popularity: 5,
    youtubeVideoId: 'nP0gDV0xDLY', // Organic Chemistry basics
  },
  {
    id: '4',
    title: 'Introduction to Biology',
    description: 'Explore the basics of biology, from cell structure to ecosystems.',
    topic: 'Biology',
    subtopics: ['Cell Biology', 'Ecology'],
    duration: 60,
    difficulty: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe',
    popularity: 4,
    youtubeVideoId: 'QnQe0xW_JY4', // Crash Course: Biology
  },
  {
    id: '5',
    title: 'World History Overview',
    description: 'A comprehensive overview of major historical events and their impact on our world.',
    topic: 'History',
    subtopics: ['Ancient Civilizations', 'Modern History'],
    duration: 150,
    difficulty: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e',
    popularity: 3,
    youtubeVideoId: 'Yocja_N5s1I', // Crash Course: World History
  },
  {
    id: '6',
    title: 'English Literature Classics',
    description: 'Analyze and understand famous works of classic English literature.',
    topic: 'Literature',
    subtopics: ['Poetry', 'Novels'],
    duration: 75,
    difficulty: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8',
    popularity: 4,
    youtubeVideoId: 'MSYw502dJNY', // Literature crash course
  },
];