import { useParams, Link } from "react-router";
import { Star, Video, MessageSquare, Clock, Award, Calendar, ArrowLeft, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { mockProviders } from "../data/mockData";

export function ProviderProfile() {
  const { id } = useParams();
  const provider = mockProviders.find((item) => item.id === id);

  const reviews = [
    {
      id: "1",
      author: "Anonymous User",
      rating: 5,
      date: "March 2026",
      comment: "Dr. Uwase was very understanding and answered all my questions without judgment. Highly recommend!",
    },
    {
      id: "2",
      author: "Anonymous User",
      rating: 5,
      date: "February 2026",
      comment: "Professional and kind. Made me feel comfortable discussing sensitive topics.",
    },
    {
      id: "3",
      author: "Anonymous User",
      rating: 4,
      date: "January 2026",
      comment: "Great consultation. Very informative and helpful with contraception options.",
    },
  ];

  if (!provider) {
    return (
      <div className="md:ml-64 min-h-screen bg-gray-50 py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700">Provider not found.</p>
              <Link to="/marketplace">
                <Button className="mt-4">Back to Providers</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const consultationFee = provider.chatPrice.toLocaleString();
  const providerShortName = provider.name.split(" ")[1] || provider.name;

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/marketplace">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Providers
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative">
                    <ImageWithFallback
                      src={provider.image}
                      alt={provider.name}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                    {provider.verified && (
                      <Badge className="absolute -top-2 -right-2 bg-green-600">
                        <Award className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">{provider.name}</h1>
                    <p className="text-gray-600 mb-3">{provider.specialty}</p>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">{provider.rating}</span>
                        <span className="text-gray-600 ml-1">({provider.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{provider.experience} experience</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {provider.languages.map((language) => (
                        <Badge key={language} variant="outline">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="about" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>About Dr. {providerShortName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {provider.bio || `${provider.name} provides youth-friendly, confidential support across key health topics.`}
                    </p>
                  </CardContent>
                </Card>

                {provider.education && provider.education.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Education</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {provider.education.map((educationItem) => (
                        <div key={educationItem} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-700">{educationItem}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {provider.certifications && provider.certifications.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Certifications & Licenses</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {provider.certifications.map((certification) => (
                        <div key={certification} className="flex items-start gap-3">
                          <Award className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-700">{certification}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.author}</span>
                            <div className="flex">
                              {Array.from({ length: review.rating }).map((_, index) => (
                                <Star
                                  key={index}
                                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {(provider.availability || []).map((slot) => (
                      <div
                        key={`${slot.day}-${slot.hours}`}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-purple-600" />
                          <span className="font-medium">{slot.day}</span>
                        </div>
                        <span className="text-gray-600">{slot.hours}</span>
                      </div>
                    ))}
                    <p className="text-sm text-gray-600 mt-4">
                      Consultation times are in Kigali time (CAT/GMT+2).
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600 mb-2">Consultation Fee</p>
                  <p className="text-3xl font-bold text-purple-600">{consultationFee} RWF</p>
                  <p className="text-sm text-gray-500">per session (30-45 min)</p>
                </div>

                <div className="space-y-3">
                  <Link to={`/checkout?provider=${provider.id}&type=video`}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                      <Video className="w-5 h-5 mr-2" />
                      Book Video Call
                    </Button>
                  </Link>
                  <Link to={`/checkout?provider=${provider.id}&type=chat`}>
                    <Button variant="outline" className="w-full" size="lg">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Chat Consultation
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 font-medium mb-1">
                    Encrypted & Confidential
                  </p>
                  <p className="text-xs text-green-700">
                    All consultations are end-to-end encrypted and completely anonymous.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">What to Expect</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Professional, non-judgmental consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Ask any questions about your health</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Receive personalized guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Complete privacy guaranteed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-6 bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Sponsored:</span> Book your first consultation and get a free follow-up session
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
