import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : '/placeholder.svg';

  const authors = book.author_name?.slice(0, 3).join(', ') || 'Unknown Author';
  const year = book.first_publish_year || '';
  const subjects = book.subject?.slice(0, 3) || [];

  return (
    <Card className="group h-full transition-all duration-300 hover:shadow-card-hover cursor-pointer border-0 shadow-card">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {year && (
            <Badge variant="secondary" className="absolute top-2 right-2 shadow-sm">
              {year}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-card-foreground line-clamp-2 mb-2 group-hover:text-accent transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {authors}
        </p>
        <div className="mt-auto">
          {subjects.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {subjects.map((subject, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs px-2 py-0.5"
                >
                  {subject}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}