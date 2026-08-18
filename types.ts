export interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  description: string;
  details: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
  iconName: string;
}

export interface NavItem {
  label: string;
  href: string;
}