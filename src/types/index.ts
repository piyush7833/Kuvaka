export type Theme = 'light' | 'dark';

export interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

export interface User {
  id: string;
  phoneNumber: string;
  countryCode: string;
}

export interface Chatroom {
  id: string;
  title: string;
  createdAt: string;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  chatroomId: string;
  image?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ChatState {
  chatrooms: Chatroom[];
  filteredChatrooms: Chatroom[];
  messages: Record<string, Message[]>;
  currentChatroom: string | null;
  isTyping: boolean;
  lastMessageTime: number;
}

export interface ThemeState {
  theme: 'light' | 'dark';
  mounted: boolean;
  resolvedTheme: 'light' | 'dark';
  toggleTheme: () => void;
} 