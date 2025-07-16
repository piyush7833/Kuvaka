'use client';

import { redirect } from 'next/navigation';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { ChatInput } from '@/components/chat/ChatInput';
import { ROUTES } from '@/lib/constants';
import { useChatStore } from '@/store/useChatStore';
import { generateId } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const addMessage = useChatStore((state) => state.addMessage);
  const setIsTyping = useChatStore((state) => state.setIsTyping);
  const setCurrentChatroom = useChatStore((state) => state.setCurrentChatroom);
  const chatrooms = useChatStore((state) => state.chatrooms);
  const messages = useChatStore((state) => state.messages);
  const initialized = useRef<{[key: string]: boolean}>({});

  // Check if chatroom exists
  const chatroom = chatrooms.find((room) => room.id === params.id);
  if (!chatroom) {
    redirect(ROUTES.DASHBOARD);
  }

  // Set current chatroom and initialize messages if needed
  useEffect(() => {
    console.log('Setting up chat:', params.id);
    
    if (!initialized.current[params.id]) {
      console.log('Initializing chatroom:', params.id);
      setCurrentChatroom(params.id);
      
      // Initialize messages if they don't exist
      if (!messages[params.id] || !Array.isArray(messages[params.id]) || messages[params.id].length === 0) {
        console.log('Adding welcome message');
        addMessage({
          id: generateId(),
          content: "Welcome to your new chat! Send a message to get started.",
          sender: 'ai',
          chatroomId: params.id,
          timestamp: new Date().toISOString(),
        });
      }
      
      initialized.current[params.id] = true;
    }
  }, [params.id, setCurrentChatroom, addMessage, messages]);

  const handleSubmit = async (content: string, image?: string) => {
    console.log('Submitting message:', { content, image });
    
    // Add user message
    const userMessage = {
      id: generateId(),
      content,
      sender: 'user' as const,
      chatroomId: params.id,
      timestamp: new Date().toISOString(),
      image,
    };
    addMessage(userMessage);

    // Simulate AI response
    setIsTyping(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const aiMessage = {
        id: generateId(),
        content: "This is a simulated AI response. In a real application, this would be replaced with actual AI-generated content.",
        sender: 'ai' as const,
        chatroomId: params.id,
        timestamp: new Date().toISOString(),
      };
      addMessage(aiMessage);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader chatroomId={params.id} />
      <div className="flex-1 min-h-0">
        <ChatMessages chatroomId={params.id} />
      </div>
      <ChatInput handleSubmitMessage={handleSubmit} />
    </div>
  );
} 