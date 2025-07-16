'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/Textarea';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

const chatInputSchema = z.object({
  message: z.string().optional(),
});

type ChatInputValues = z.infer<typeof chatInputSchema>;

interface ChatInputProps extends React.HTMLAttributes<HTMLDivElement> {
  handleSubmitMessage: (message: string, image?: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ handleSubmitMessage, isLoading, className, ...props }: ChatInputProps) {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const resetRef = React.useRef<((values?: Partial<ChatInputValues>) => void) | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (values: ChatInputValues) => {
    if (values.message?.trim() || selectedImage) {
      handleSubmitMessage(values.message || '', selectedImage || undefined);
      setSelectedImage(null);
      resetRef.current?.({ message: '' });
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit({ message: e.currentTarget.value });
    }
    
    // Image upload on Ctrl/Cmd + I
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        textareaRef.current?.focus();
      };
      reader.readAsDataURL(file);
    }
  };

  // Focus textarea on mount
  React.useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 bg-gradient-to-t from-white dark:from-[hsl(var(--background))] from-50% to-transparent pb-4 pt-10',
        className
      )}
      {...props}
    >
      <Form
        schema={chatInputSchema}
        onSubmit={handleSubmit}
        className="px-4 sm:px-8"
      >
        {({ register, watch, reset }) => {
          resetRef.current = reset;
          const { ref, ...rest } = register('message');
          
          return (
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                {selectedImage && (
                  <div className="absolute bottom-full mb-2 flex items-center gap-2 rounded-lg bg-[hsl(var(--muted))] p-2">
                    <img src={selectedImage} alt="Selected" className="h-16 w-16 rounded object-cover" />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setSelectedImage(null);
                        textareaRef.current?.focus();
                      }}
                      className="text-sm"
                      aria-label="Remove image"
                    >
                      Remove
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center gap-2 rounded-lg border bg-background p-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-9 w-9 shrink-0 p-0"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Upload image (Ctrl + I)"
                  >
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    aria-label="Image upload"
                  />
                  <div className="flex-1 min-w-0">
                    <Textarea
                      {...rest}
                      ref={(e) => {
                        ref(e);
                        textareaRef.current = e;
                      }}
                      rows={1}
                      onKeyDown={handleKeyDown}
                      placeholder="Message... (Enter to send, Shift + Enter for new line)"
                      spellCheck={false}
                      className="min-h-[2.5rem] border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      aria-label="Message input"
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading || (!watch('message')?.trim() && !selectedImage)}
                aria-label={isLoading ? 'Sending message...' : 'Send message'}
              >
                Send
              </Button>
            </div>
          );
        }}
      </Form>
    </div>
  );
}