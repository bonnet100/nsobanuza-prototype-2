import { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, Play, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-6 border-0 shadow-sm">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{post.author.name}</span>
                {post.author.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={post.tag === 'verified' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {post.tag === 'verified' ? 'Verified' : 'Sponsored'}
                </Badge>
                <span className="text-xs text-gray-500">{formatTimeAgo(post.timestamp)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="relative">
          {post.type === 'image' ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
          ) : (
            <div className="relative">
              <video
                src={post.video}
                className="w-full aspect-square object-cover"
                muted
                loop
                autoPlay
                playsInline
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-3">
                  <Play className="w-6 h-6 text-white" fill="white" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>0:15</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`p-0 ${liked ? 'text-red-500' : 'text-gray-700'}`}
            >
              <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 text-gray-700">
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 text-gray-700">
              <Share className="w-6 h-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={`p-0 ${saved ? 'text-purple-500' : 'text-gray-700'}`}
          >
            <Bookmark className={`w-6 h-6 ${saved ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Stats */}
        <div className="px-4 pb-2">
          <div className="flex items-center gap-4 text-sm">
            <span className="font-semibold">{likes.toLocaleString()} likes</span>
            <span className="text-gray-500">{post.shares} shares</span>
            <span className="text-gray-500">{post.saves} saves</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-4">
          <div className="text-sm">
            <span className="font-semibold mr-2">{post.author.name}</span>
            <span>{post.caption}</span>
          </div>
          <div className="mt-2">
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}