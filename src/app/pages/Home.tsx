import { useMemo } from 'react';
import { PostCard } from '../components/PostCard';
import { FeedAdCard } from '../components/FeedAdCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { mockPosts } from '../data/mockData';
import { Post } from '../types';

interface FeedAd {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  ctaLabel: string;
  ctaUrl: string;
}

type FeedItem = Post | FeedAd;

const adTemplates: FeedAd[] = [
  {
    id: 'ad-1',
    title: 'Learn more about menstrual wellness',
    description:
      'Check out our free guide to period care, tracking, and self-care tips tailored for young people in Rwanda.',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Wellness Partner',
    ctaLabel: 'Explore Guide',
    ctaUrl: '#',
  },
  {
    id: 'ad-2',
    title: 'Confidential health support',
    description:
      'Connect with verified professionals and confidential services through the Nsobanuza marketplace.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Sponsored',
    ctaLabel: 'Book a Consultation',
    ctaUrl: '#',
  },
];

const isAdItem = (item: FeedItem): item is FeedAd => 'ctaLabel' in item;

export function Home() {
  const feedItems = useMemo<FeedItem[]>(() => {
    const result: FeedItem[] = [];
    const adIntervals = [4, 6, 5];
    let nextAdIndex = 0;
    let postsUntilAd = adIntervals[nextAdIndex];
    let currentAdTemplate = 0;

    mockPosts.forEach((post, index) => {
      result.push(post);
      if (index + 1 === postsUntilAd && index !== mockPosts.length - 1) {
        result.push(adTemplates[currentAdTemplate]);
        currentAdTemplate = (currentAdTemplate + 1) % adTemplates.length;
        nextAdIndex = (nextAdIndex + 1) % adIntervals.length;
        postsUntilAd += adIntervals[nextAdIndex];
      }
    });

    return result;
  }, []);

  return (
    <div className="max-w-md mx-auto pb-20">
      {/* Stories/Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-16 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Nsobanuza Feed</h1>
          <Badge variant="secondary" className="text-xs">
            Beta
          </Badge>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">+</span>
          </div>
          <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-bold text-sm">HIV</span>
          </div>
          <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-bold text-sm">SRH</span>
          </div>
          <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-bold text-sm">Mental</span>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-0">
        {feedItems.map((item) =>
          isAdItem(item) ? (
            <FeedAdCard key={item.id} ad={item} />
          ) : (
            <PostCard key={item.id} post={item} />
          )
        )}
      </div>

      {/* Load More */}
      <div className="p-4">
        <Button variant="outline" className="w-full">
          Load More Posts
        </Button>
      </div>
    </div>
  );
}
