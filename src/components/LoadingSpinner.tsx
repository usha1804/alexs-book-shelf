import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Searching books...</p>
    </div>
  );
}