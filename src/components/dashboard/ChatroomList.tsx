'use client';
import Link from 'next/link';
import { MessageSquare, Trash2 } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/Dialog';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export function ChatroomList() {
  const chatrooms = useChatStore((state) => state.chatrooms);
  const filteredChatrooms = useChatStore((state) => state.filteredChatrooms);
  const deleteChatroom = useChatStore((state) => state.deleteChatroom);
  const displayedChatrooms = filteredChatrooms.length > 0 ? filteredChatrooms : chatrooms;
  const [chatroomToDelete, setChatroomToDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    deleteChatroom(id);
    setChatroomToDelete(null);
    toast.success('Chat deleted');
  };

  if (chatrooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--secondary))]/50 px-8 py-16">
        <div className="rounded-full bg-[hsl(var(--secondary))] p-4">
          <MessageSquare className="h-12 w-12 text-[hsl(var(--muted-foreground))]" />
        </div>
        <h2 className="mt-6 text-xl font-semibold tracking-tight">No chats yet</h2>
        <p className="mt-2 text-center text-sm text-[hsl(var(--muted-foreground))]">
          Start a new chat to begin your conversation
        </p>
      </div>
    );
  }

  if (filteredChatrooms.length === 0 && chatrooms.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--secondary))]/50 px-8 py-16">
        <div className="rounded-full bg-[hsl(var(--secondary))] p-4">
          <MessageSquare className="h-12 w-12 text-[hsl(var(--muted-foreground))]" />
        </div>
        <h2 className="mt-6 text-xl font-semibold tracking-tight">No matches found</h2>
        <p className="mt-2 text-center text-sm text-[hsl(var(--muted-foreground))]">
          Try adjusting your search terms
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {displayedChatrooms.map((chatroom) => (
        <div key={chatroom.id} className="group relative">
          <Link
            href={`${ROUTES.CHAT}/${chatroom.id}`}
            className={cn(
              'flex items-start gap-4 px-6 py-4',
              'rounded-2xl border bg-[hsl(var(--card))]',
              'transition-all duration-200 ease-in-out',
              'hover:bg-[hsl(var(--secondary))]/50'
            )}
          >
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <h3 className="truncate text-sm font-semibold text-[hsl(var(--primary))]">
                  {chatroom.title}
                </h3>
              </div>
              <p className="mt-1 truncate text-sm text-[hsl(var(--muted-foreground))]">
                {typeof chatroom.lastMessage === 'object' && chatroom.lastMessage !== null
                  ? chatroom.lastMessage.content
                  : typeof chatroom.lastMessage === 'string'
                  ? chatroom.lastMessage
                  : 'No messages yet'}
              </p>
            </div>
            <Dialog open={chatroomToDelete === chatroom.id} onOpenChange={(open) => !open && setChatroomToDelete(null)}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-7 w-7 rounded-full p-0"
                  onClick={(e) => {
                    e.preventDefault();
                    setChatroomToDelete(chatroom.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-[hsl(var(--muted-foreground))] transition-colors hover:text-destructive" />
                  <span className="sr-only">Delete chat</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Chat</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete this chat? This action cannot be undone.</p>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setChatroomToDelete(null)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(chatroom.id)}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Link>
        </div>
      ))}
    </div>
  );
} 