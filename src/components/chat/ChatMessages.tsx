'use client';
import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { ChatMessage } from './ChatMessage';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { MESSAGES_PER_PAGE } from '@/lib/constants';

interface ChatMessagesProps {
  chatroomId: string;
}

export function ChatMessages({ chatroomId }: ChatMessagesProps) {
  const messages = useChatStore((state) => state.messages[chatroomId] || []);
  const isTyping = useChatStore((state) => state.isTyping);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const lastMessageLengthRef  =useRef<number>(messages.length);

  // Initial scroll to bottom
  useEffect(() => {
    if (isInitialLoad && messages.length > 0) {
      bottomRef.current?.scrollIntoView();
      setIsInitialLoad(false);
    }
  }, [messages.length, isInitialLoad]);

  // Handle scroll to load more messages
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop === 0 && !isLoading && hasMore) {
        prevScrollHeightRef.current = container.scrollHeight;
        setIsLoading(true);
        // Simulate loading delay
        setTimeout(() => {
          setPage((prev) => {
            const nextPage = prev + 1;
            // Check if we have more messages to load
            if (nextPage * MESSAGES_PER_PAGE >= messages.length) {
              setHasMore(false);
            }
            return nextPage;
          });
          setIsLoading(false);
        }, 500);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, messages.length]);

  // Maintain scroll position when loading more messages
  useEffect(() => {
    const container = containerRef.current;
    if (container && prevScrollHeightRef.current) {
      const newScrollHeight = container.scrollHeight;
      const scrollDiff = newScrollHeight - prevScrollHeightRef.current;
      container.scrollTop = scrollDiff;
      prevScrollHeightRef.current = 0;
    }
  }, [page]);

  // Only scroll to bottom for new messages if we're already at the bottom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    const isNewMessage = messages.length > lastMessageLengthRef.current;
    lastMessageLengthRef.current = messages.length;

    if ((isNewMessage && isAtBottom) || isTyping) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, isTyping]);

  const visibleMessages = messages.slice(-page * MESSAGES_PER_PAGE);

  if (!Array.isArray(messages)) {
    console.error('Messages is not an array:', messages);
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <div
        ref={containerRef}
        className={cn(
          "flex-1 overflow-y-auto min-h-0",
          "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600",
          "scrollbar-track-transparent pb-[100px]"
        )}
      >
        <div className="flex flex-col space-y-4 px-4">
          {isLoading && (
            <div className="py-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full mt-4" />
              <Skeleton className="h-16 w-full mt-4" />
            </div>
          )}

          {!hasMore && messages.length > 0 && (
            <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
              No more messages to load
            </div>
          )}

          {visibleMessages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              sender={message.sender}
              timestamp={message.timestamp}
              image={message.image}
            />
          ))}

          {isTyping && (
            <ChatMessage
              content=""
              sender="ai"
              isLoading={true}
            />
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
} 