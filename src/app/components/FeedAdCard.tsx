import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeedAdCardProps {
  ad: {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    ctaLabel: string;
    ctaUrl: string;
  };
}

export function FeedAdCard({ ad }: FeedAdCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto mb-6 border-0 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-56 bg-gray-100">
          <ImageWithFallback
            src={ad.image}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute left-4 bottom-4 text-white">
            <Badge variant="secondary" className="text-xs mb-2">
              Sponsored
            </Badge>
            <h2 className="text-xl font-semibold">{ad.title}</h2>
            <p className="text-sm max-w-xs text-white/80 mt-2">{ad.description}</p>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                {ad.category}
              </p>
            </div>
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <a href={ad.ctaUrl}>{ad.ctaLabel}</a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
