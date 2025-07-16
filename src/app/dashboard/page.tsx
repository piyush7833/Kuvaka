import { ChatroomList } from '@/components/dashboard/ChatroomList';
import { CreateChatroomButton } from '@/components/dashboard/CreateChatroomButton';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { ThemeToggle } from '@/components/dashboard/ThemeToggle';
import { UserMenu } from '@/components/dashboard/UserMenu';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--background))]">
      <header className="sticky top-0 z-10 border-b bg-[hsl(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background))]/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-6">
            <SearchBar />
            <CreateChatroomButton />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 py-8 sm:px-8">
        <ChatroomList />
      </main>
    </div>
  );
} 