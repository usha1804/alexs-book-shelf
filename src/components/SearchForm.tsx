import { useState } from 'react';
import { Search, Book, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchFormProps {
  onSearch: (query: string, type: 'title' | 'author') => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'title' | 'author'>('title');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card border-0">
      <CardContent className="p-6">
        <Tabs value={searchType} onValueChange={(value) => setSearchType(value as 'title' | 'author')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="title" className="flex items-center gap-2">
              <Book className="w-4 h-4" />
              Search by Title
            </TabsTrigger>
            <TabsTrigger value="author" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Search by Author
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={searchType} className="mt-0">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder={searchType === 'title' ? "Enter book title..." : "Enter author name..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                disabled={!query.trim() || isLoading}
                className="px-8"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}