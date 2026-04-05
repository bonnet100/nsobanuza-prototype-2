import { Link } from 'react-router';
import { Star, Video, MessageSquare, Clock, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Provider } from '../types';

interface ProfessionalCardProps {
  provider: Provider;
}

export function ProfessionalCard({ provider }: ProfessionalCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 bg-gray-200">
          <ImageWithFallback
            src={provider.image}
            alt={provider.name}
            className="w-full h-full object-cover"
          />
          {provider.verified && (
            <Badge className="absolute top-3 right-3 bg-green-600">
              <Award className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {provider.available && (
            <Badge className="absolute top-3 left-3 bg-purple-600">
              <Clock className="w-3 h-3 mr-1" />
              Available
            </Badge>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <h3 className="text-lg font-semibold">{provider.name}</h3>
              <p className="text-sm text-gray-600">{provider.specialty}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{provider.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {provider.languages.map((lang, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-700">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs uppercase tracking-wide text-gray-500">Chat</p>
              <p className="font-semibold text-purple-600">{provider.chatPrice.toLocaleString()} RWF</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs uppercase tracking-wide text-gray-500">Video</p>
              <p className="font-semibold text-purple-600">{provider.videoPrice.toLocaleString()} RWF</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link to={`/checkout?provider=${provider.id}&type=chat`} className="flex-1">
              <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" /> Chat
              </Button>
            </Link>
            <Link to={`/checkout?provider=${provider.id}&type=video`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Video className="w-4 h-4 mr-2" /> Video
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}