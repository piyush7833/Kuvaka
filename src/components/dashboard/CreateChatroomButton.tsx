'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/Dialog';
import { useChatStore } from '@/store/useChatStore';
import { generateId } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

export function CreateChatroomButton() {
  const router = useRouter();
  const createChatroom = useChatStore((state) => state.createChatroom);
  const [isCreating, setIsCreating] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCreate = async () => {
    if (isCreating || !title.trim()) return;
    
    setIsCreating(true);
    try {
      const id = generateId();
      
      const chatroom = {
        id,
        title: title.trim(),
        createdAt: new Date().toISOString(),
      };
      
      createChatroom(chatroom);
      
      const chatPath = `${ROUTES.CHAT}/${id}`;
      
      setIsOpen(false);
      setTitle('');
      
      // Use Next.js router for navigation
      router.push(chatPath);
      toast.success('Created new chat');
    } catch (error) {
      console.error('Failed to create chat:', error);
      toast.error('Failed to create chat');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm w-fit"
        >
          <Plus className="h-4 w-4" />
          <p className="font-medium w-max">New Chat</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Chat</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Enter chat title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleCreate();
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleCreate}
            disabled={isCreating || !title.trim()}
          >
            {isCreating ? 'Creating...' : 'Create Chat'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 