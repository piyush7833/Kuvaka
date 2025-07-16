import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState, Chatroom, Message } from '@/types';
import { LOCAL_STORAGE_KEYS } from '@/lib/constants';
import { generateId } from '@/lib/utils';

const initialState: ChatState = {
  chatrooms: [],
  filteredChatrooms: [],
  messages: {},
  currentChatroom: null,
  isTyping: false,
  lastMessageTime: 0,
};

// Minimum time between AI responses in milliseconds
const MIN_RESPONSE_DELAY = 1000;
const MAX_RESPONSE_DELAY = 3000;

type ChatStore = ChatState & {
  createChatroom: (chatroom: Chatroom) => void;
  deleteChatroom: (id: string) => void;
  setCurrentChatroom: (id: string | null) => void;
  addMessage: (message: Message) => Promise<void>;
  setIsTyping: (isTyping: boolean) => void;
  setFilteredChatrooms: (chatrooms: Chatroom[]) => void;
};

export const useChatStore = create(
  persist<ChatStore>(
    (set, get) => ({
      ...initialState,
      createChatroom: (chatroom) =>
        set((state) => ({
          chatrooms: [chatroom, ...state.chatrooms],
          messages: {
            ...state.messages,
            [chatroom.id]: []
          }
        })),
      deleteChatroom: (id) =>
        set((state) => ({
          chatrooms: state.chatrooms.filter((room) => room.id !== id),
          messages: Object.fromEntries(
            Object.entries(state.messages).filter(([key]) => key !== id)
          ),
          currentChatroom: state.currentChatroom === id ? null : state.currentChatroom,
        })),
      setCurrentChatroom: (id) =>
        set((state) => ({
          currentChatroom: id,
          messages: {
            ...state.messages,
            ...(id ? { [id]: state.messages[id] || [] } : {})
          }
        })),
      addMessage: async (message) => {
        const state = get();
        const existingMessages = state.messages[message.chatroomId] || [];
        
        // Check for duplicate message
        if (existingMessages.some(m => m.id === message.id)) {
          return;
        }

        // If it's an AI message, apply throttling
        if (message.sender === 'ai') {
          const timeSinceLastMessage = Date.now() - state.lastMessageTime;
          const minDelay = Math.max(MIN_RESPONSE_DELAY - timeSinceLastMessage, 0);
          const randomDelay = Math.random() * (MAX_RESPONSE_DELAY - MIN_RESPONSE_DELAY) + minDelay;
          
          set({ isTyping: true });
          await new Promise(resolve => setTimeout(resolve, randomDelay));
        }

        set((state) => ({
          messages: {
            ...state.messages,
            [message.chatroomId]: [...existingMessages, message],
          },
          chatrooms: state.chatrooms.map((room) =>
            room.id === message.chatroomId
              ? { ...room, lastMessage: message }
              : room
          ),
          lastMessageTime: Date.now(),
          isTyping: false,
        }));
      },
      setIsTyping: (isTyping) =>
        set({
          isTyping,
        }),
      setFilteredChatrooms: (chatrooms) =>
        set({
          filteredChatrooms: chatrooms,
        }),
    }),
    {
      name: LOCAL_STORAGE_KEYS.CHATROOMS,
      version: 1,
      merge: (persistedState: any, currentState: ChatStore) => {
        return {
          ...currentState,
          ...persistedState,
          messages: {
            ...currentState.messages,
            ...persistedState.messages
          }
        };
      }
    }
  )
); 