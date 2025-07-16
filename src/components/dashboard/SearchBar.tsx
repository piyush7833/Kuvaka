'use client';
import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useChatStore } from '@/store/useChatStore';
import { useSearch } from '@/hooks/useSearch';

export function SearchBar() {
  const chatrooms = useChatStore((state) => state.chatrooms);
  const setFilteredChatrooms = useChatStore((state) => state.setFilteredChatrooms);

  const { searchQuery, filteredItems, handleSearch } = useSearch(
    chatrooms,
    (chatroom, query) => chatroom.title.toLowerCase().includes(query.toLowerCase())
  );

  React.useEffect(() => {
    setFilteredChatrooms(filteredItems);
  }, [filteredItems, setFilteredChatrooms]);

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
        <Search className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
      </div>
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search chats..."
        className="pl-10"
      />
    </div>
  );
} 