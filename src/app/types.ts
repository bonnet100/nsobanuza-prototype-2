export interface Post {
  id: string;
  type: 'image' | 'video';
  title: string;
  caption: string;
  image?: string;
  video?: string;
  category: string;
  tag: 'verified' | 'sponsored';
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  likes: number;
  shares: number;
  saves: number;
  timestamp: Date;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: number;
  category: string;
  description: string;
  language: string;
  source: string;
  videoUrl?: string;
}

export interface Provider {
  id: string;
  name: string;
  image: string;
  specialty: string;
  rating: number;
  reviews: number;
  languages: string[];
  chatPrice: number;
  videoPrice: number;
  available: boolean;
  verified: boolean;
  experience: string;
  bio?: string;
  education?: string[];
  certifications?: string[];
  availability?: { day: string; hours: string }[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string; // In real app, this would be hashed
  type: 'user' | 'professional';
  fullName?: string;
  licenseNumber?: string;
  specialty?: string;
  bio?: string;
  avatar?: string;
  verified?: boolean;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  providerId: string;
  type: 'chat' | 'video';
  amount: number;
  commission: number;
  timestamp: Date;
}