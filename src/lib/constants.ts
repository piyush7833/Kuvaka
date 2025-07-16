export const APP_NAME = 'Gemini Chat';

export const MESSAGES_PER_PAGE = 20;
export const TYPING_DELAY_MS = 1000;
export const AI_RESPONSE_DELAY_MS = 2000;
export const DEBOUNCE_DELAY_MS = 300;

export const LOCAL_STORAGE_KEYS = {
  AUTH: 'gemini-chat-auth',
  THEME: 'gemini-chat-theme',
  CHATROOMS: 'gemini-chat-rooms',
  MESSAGES: 'gemini-chat-messages',
} as const;

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  CHAT: '/chat',
} as const;

export const AI_RESPONSES = [
  "That's an interesting perspective. Let me think about that for a moment...",
  "I understand what you're saying. Here's what I think...",
  "Based on my analysis, I would suggest...",
  "Let me process that information and provide a thoughtful response...",
  "I see your point. Allow me to elaborate...",
] as const; 