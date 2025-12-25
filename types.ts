
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ProgressState {
  percentage: number;
  label: string;
}

export interface SocialLink {
  icon: string;
  name: string;
  url: string;
  isSvg?: boolean;
}
