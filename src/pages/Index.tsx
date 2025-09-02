import { useState, useCallback } from 'react';
import { BookCard } from '@/components/BookCard';
import { SearchForm } from '@/components/SearchForm';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { EmptyState } from '@/components/EmptyState';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-books.jpg';

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
  publisher?: string[];
  subject?: string[];
}

interface SearchResponse {
  docs: Book[];
  numFound: number;
}

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState('');
  const { toast } = useToast();

  const searchBooks = useCallback(async (query: string, searchType: 'title' | 'author') => {
    setIsLoading(true);
    setLastSearchQuery(query);
    
    try {
      const searchParam = searchType === 'title' ? 'title' : 'author';
      const response = await fetch(
        `https://openlibrary.org/search.json?${searchParam}=${encodeURIComponent(query)}&limit=24`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data: SearchResponse = await response.json();
      setBooks(data.docs || []);
      setHasSearched(true);
      
      if (data.docs?.length === 0) {
        toast({
          title: "No results found",
          description: `No books found for "${query}". Try a different search term.`,
        });
      } else {
        toast({
          title: "Search completed",
          description: `Found ${data.numFound} books for "${query}"`,
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "Unable to search books. Please try again.",
        variant: "destructive",
      });
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center text-white mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Book Finder
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-8">
              Discover your next favorite book from millions of titles worldwide
            </p>
          </div>
          
          <SearchForm onSearch={searchBooks} isLoading={isLoading} />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 py-12">
        {isLoading && <LoadingSpinner />}
        
        {!isLoading && !hasSearched && (
          <EmptyState type="initial" />
        )}
        
        {!isLoading && hasSearched && books.length === 0 && (
          <EmptyState type="no-results" searchQuery={lastSearchQuery} />
        )}
        
        {!isLoading && books.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
