'use client';
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MoreVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/Dialog';
import { useChatStore } from '@/store/useChatStore';
import { ROUTES } from '@/lib/constants';
import { toast } from 'react-hot-toast';
import { ThemeToggle } from '@/components/dashboard/ThemeToggle';

interface ChatHeaderProps {
  chatroomId: string;
}

export function ChatHeader({ chatroomId }: ChatHeaderProps) {
  const router = useRouter();
  const chatroom = useChatStore((state) =>
    state.chatrooms.find((room) => room.id === chatroomId)
  );
  const deleteChatroom = useChatStore((state) => state.deleteChatroom);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const handleDelete = () => {
    deleteChatroom(chatroomId);
    setIsDeleteDialogOpen(false);
    router.push(ROUTES.DASHBOARD);
    toast.success('Chat deleted');
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-[hsl(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background))]/60">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-8">
        <Link href={ROUTES.DASHBOARD} className="mr-2">
          <Button
            variant="ghost"
            className="h-9 w-9 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to dashboard</span>
          </Button>
        </Link>

        <div className="flex flex-1 items-center gap-4">
          <h1 className="text-lg font-medium">
            {chatroom?.title || 'Chat'}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 w-9 p-0"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
                <span className="sr-only">Delete chat</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Chat</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this chat? This action cannot be undone.</p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
} 