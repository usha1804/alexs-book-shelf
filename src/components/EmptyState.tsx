import { BookOpen, Search } from 'lucide-react';

interface EmptyStateProps {
  type: 'initial' | 'no-results';
  searchQuery?: string;
}

export function EmptyState({ type, searchQuery }: EmptyStateProps) {
  if (type === 'initial') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BookOpen className="w-16 h-16 text-muted-foreground mb-4 animate-float" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Discover Your Next Great Read
        </h3>
        <p className="text-muted-foreground max-w-md">
          Search through millions of books by title or author. Start your literary journey above!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Search className="w-16 h-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No Books Found
      </h3>
      <p className="text-muted-foreground max-w-md">
        We couldn't find any books matching "{searchQuery}". Try adjusting your search terms or searching by a different field.
      </p>
    </div>
  );
}