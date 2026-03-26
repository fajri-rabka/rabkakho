export interface Project {
  id: string | number;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface ProjectsProps {
  projects?: Project[];
  label?: string;
  title?: string;
}
