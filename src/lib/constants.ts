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
  CHAT: '/chat',
  DASHBOARD: '/dashboard',
} as const;

export const COUNTRIES = [
  {
    value: '+1',
    label: 'United States',
    flag: 'https://flagcdn.com/w40/us.png',
  },
  {
    value: '+44',
    label: 'United Kingdom',
    flag: 'https://flagcdn.com/w40/gb.png',
  },
  {
    value: '+91',
    label: 'India',
    flag: 'https://flagcdn.com/w40/in.png',
  },
  {
    value: '+234',
    label: 'Nigeria',
    flag: 'https://flagcdn.com/w40/ng.png',
  },
  {
    value: '+27',
    label: 'South Africa',
    flag: 'https://flagcdn.com/w40/za.png',
  },
  {
    value: '+254',
    label: 'Kenya',
    flag: 'https://flagcdn.com/w40/ke.png',
  },
  {
    value: '+255',
    label: 'Tanzania',
    flag: 'https://flagcdn.com/w40/tz.png',
  },
  {
    value: '+256',
    label: 'Uganda',
    flag: 'https://flagcdn.com/w40/ug.png',
  },
  {
    value: '+250',
    label: 'Rwanda',
    flag: 'https://flagcdn.com/w40/rw.png',
  },
  {
    value: '+251',
    label: 'Ethiopia',
    flag: 'https://flagcdn.com/w40/et.png',
  },
] as const;

export const AI_RESPONSES = [
  "That's an interesting perspective. Let me think about that for a moment...",
  "I understand what you're saying. Here's what I think...",
  "Based on my analysis, I would suggest...",
  "Let me process that information and provide a thoughtful response...",
  "I see your point. Allow me to elaborate...",
] as const; 