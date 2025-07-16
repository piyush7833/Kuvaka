'use client';

import React from 'react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IconCopy, IconCheck } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  content: string;
  sender: 'user' | 'ai';
  timestamp?: string;
  isLoading?: boolean;
  image?: string;
}

export function ChatMessage({ content, sender, timestamp, isLoading, image }: ChatMessageProps) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = React.useCallback(() => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      toast.success('Message copied to clipboard');
      setTimeout(() => setCopied(false), 1500);
    });
  }, [content]);

  const formattedTime = timestamp ? format(new Date(timestamp), 'h:mm a') : '';
  const isAI = sender === 'ai';

  return (
    <div className={cn(
      'group relative flex w-full items-start gap-4 px-4 py-6 transition-all duration-200 sm:px-8',
      !isAI && 'justify-end',
      isAI && 'justify-start'
    )}>
      {isAI && (
        <Avatar
          sender={sender}
          className="mt-1 h-9 w-9 shrink-0"
        />
      )}
      
      <div className={cn(
        "flex min-w-0 flex-col gap-2",
        "max-w-[85%] sm:max-w-[75%]"
      )}>
        <div className={cn(
          "flex items-center gap-3",
          !isAI && "justify-end"
        )}>
          <span className={cn(
            "text-sm font-semibold",
            isAI ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--secondary-foreground))]"
          )}>
            {isAI ? 'AI Assistant' : 'You'}
          </span>
          {timestamp && (
            <span className="text-[11px] font-medium text-[hsl(var(--muted-foreground))]">
              {formattedTime}
            </span>
          )}
        </div>
        
        <div className={cn(
          "prose prose-neutral dark:prose-invert prose-sm max-w-none break-words rounded-2xl p-4",
          "prose-p:leading-relaxed",
          "prose-pre:bg-[hsl(var(--muted))]",
          "prose-code:text-[hsl(var(--primary))] prose-code:bg-[hsl(var(--primary))]/10",
          "prose-a:text-[hsl(var(--primary))] hover:prose-a:text-[hsl(var(--primary))]/80",
          !isAI && "bg-[hsl(var(--primary))]/10"
        )}>
          {image && (
            <div className="mb-2">
              <img 
                src={image} 
                alt="Message attachment" 
                className="max-h-[300px] w-auto rounded-lg object-contain"
              />
            </div>
          )}
          {content}
        </div>
        
        <div className={cn(
          "flex items-center gap-2 transition-all duration-200",
          copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          !isAI && "justify-end"
        )}>
          <Button
            variant={copied ? "default" : "outline"}
            className={cn(
              "h-7 px-3 rounded-full",
              copied && "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
            )}
            onClick={onCopy}
          >
            {copied ? (
              <>
                <IconCheck className="h-3.5 w-3.5" />
                <span className="ml-1.5 text-xs font-medium">Copied!</span>
              </>
            ) : (
              <>
                <IconCopy className="h-3.5 w-3.5" />
                <span className="ml-1.5 text-xs font-medium">Copy</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      {!isAI && (
        <Avatar
          sender={sender}
          className="mt-1 h-9 w-9 shrink-0"
        />
      )}
      
      {isLoading && isAI && (
        <div className="flex gap-1.5 px-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-[hsl(var(--primary))]/40 ring-1 ring-[hsl(var(--primary))]/30" style={{ animationDelay: '0s' }} />
          <div className="h-2 w-2 animate-bounce rounded-full bg-[hsl(var(--primary))]/40 ring-1 ring-[hsl(var(--primary))]/30" style={{ animationDelay: '0.2s' }} />
          <div className="h-2 w-2 animate-bounce rounded-full bg-[hsl(var(--primary))]/40 ring-1 ring-[hsl(var(--primary))]/30" style={{ animationDelay: '0.4s' }} />
        </div>
      )}
    </div>
  );
} 