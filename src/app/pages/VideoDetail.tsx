import { useParams, Link } from 'react-router';
import { PlayCircle, Eye, ThumbsUp, ArrowLeft } from 'lucide-react';
import { mockVideos } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export function VideoDetail() {
  const { id } = useParams();
  const video = mockVideos.find((item) => item.id === id);

  if (!video) {
    return (
      <div className="md:ml-64 min-h-screen bg-gray-50 py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700">Video not found.</p>
              <Link to="/videos">
                <Button className="mt-4">Back to Videos</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link to="/videos">
          <Button variant="outline" className="mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Videos
          </Button>
        </Link>

        <Card className="overflow-hidden">
          <div className="relative bg-black">
            <video
              src={video.videoUrl}
              controls
              className="w-full h-full max-h-[500px] object-cover"
              poster={video.thumbnail}
            />
            <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-gray-800">
              {video.source}
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{video.title}</h1>
                <p className="text-sm text-gray-500">{video.category} • {video.language}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{video.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{video.likes}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">{video.description}</p>
            <Badge className="bg-purple-600 text-white">Free</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}