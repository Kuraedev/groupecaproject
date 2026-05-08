// Types for the digital twin application

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
  metadata?: {
    intent?: 'schedule' | 'lead' | 'general';
    source?: string;
  };
}

export interface Conversation {
  id: string;
  userId?: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    initiator?: string;
    source?: string;
  };
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  conversationId: string;
  createdAt: Date;
}

export interface PersonProfile {
  name: string;
  role: string;
  tagline: string;
  location?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  status?: string;
  bio?: string;
}

export interface SectionLink {
  id: string;
  label: string;
  icon: string;
  action: string;
}
