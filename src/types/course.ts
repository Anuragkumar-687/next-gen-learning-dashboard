export interface Course {
  id: string;
  title: string;
  progress: number; // Percentage from 0 to 100
  icon_name: string; // Dynamic Lucide icon name, e.g., 'BookOpen', 'Code', etc.
  created_at: string;
}
