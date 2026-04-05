import { Link } from 'react-router';
import { PlayCircle, Eye, ThumbsUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link to={`/videos/${video.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden group">
        <CardContent className="p-0">
          <div className="relative h-48 bg-gray-200 overflow-hidden">
            <ImageWithFallback
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <PlayCircle className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <Badge className="absolute bottom-3 right-3 bg-black/70 text-white border-none">
              {video.duration}
            </Badge>
            <Badge className="absolute top-3 left-3 bg-purple-600">
              Free
            </Badge>
          </div>

          <div className="p-4">
            <Badge variant="outline" className="mb-2 text-xs">
              {video.category}
            </Badge>
            <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{video.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{video.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{video.likes}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {video.language}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}