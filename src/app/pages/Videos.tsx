import { useState } from "react";
import { PlayCircle, Search, Filter } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { VideoCard } from "../components/VideoCard";
import { mockVideos } from "../data/mockData";

export function Videos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredVideos = mockVideos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || video.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { name: "Sexual Health", label: "Heart", count: 24 },
    { name: "Mental Health", label: "Mind", count: 18 },
    { name: "Contraception", label: "Care", count: 15 },
    { name: "HIV", label: "Shield", count: 12 },
    { name: "Relationships", label: "Support", count: 10 },
  ];

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Health Education Videos</h1>
          <p className="text-gray-600">
            Free educational content on sexual, reproductive, and mental health
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[220px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Contraception">Contraception</SelectItem>
                <SelectItem value="Mental Health">Mental Health</SelectItem>
                <SelectItem value="HIV/AIDS">HIV/AIDS</SelectItem>
                <SelectItem value="Pregnancy">Pregnancy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="mb-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-1 p-6 md:p-8">
                <Badge className="mb-3 bg-white/20 backdrop-blur-sm text-white border-white/30">
                  Free Content
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  All Videos Are Free to Watch
                </h2>
                <p className="text-purple-100 mb-4">
                  Access accurate, youth-friendly health education in Kinyarwanda, English, and French. No subscription required.
                </p>
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  Start Watching
                </Button>
              </div>
              <div className="w-full md:w-auto p-6 md:p-0">
                <div className="w-full md:w-64 h-48 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white/80" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-600">No videos found matching your criteria.</p>
          </Card>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="hover:shadow-md transition-shadow cursor-pointer hover:border-purple-300"
              >
                <CardContent className="p-4 text-center">
                  <div className="text-sm uppercase tracking-wide text-purple-600 font-semibold mb-2">
                    {category.label}
                  </div>
                  <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.count} videos</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Sponsored Content</p>
                <p className="text-sm text-gray-600">
                  This video library is supported by our partners to keep content free for all young Rwandans.
                </p>
              </div>
              <Button variant="outline">Support Us</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
