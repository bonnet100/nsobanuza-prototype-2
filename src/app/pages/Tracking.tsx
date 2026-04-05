import { useState } from "react";
import { Calendar as CalendarIcon, TrendingUp, Activity, Heart, Droplet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";

export function Tracking() {
  const [currentCycleDay, setCurrentCycleDay] = useState(15);
  const cycleLength = 28;
  const periodLength = 5;

  // Calculate cycle phase
  const getCyclePhase = () => {
    if (currentCycleDay <= periodLength) return "Menstrual";
    if (currentCycleDay <= 13) return "Follicular";
    if (currentCycleDay >= 14 && currentCycleDay <= 16) return "Ovulation";
    return "Luteal";
  };

  const phase = getCyclePhase();

  const insights = [
    {
      icon: Droplet,
      title: "Next Period",
      value: `${cycleLength - currentCycleDay} days`,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      icon: Heart,
      title: "Fertile Window",
      value: currentCycleDay >= 11 && currentCycleDay <= 16 ? "Active" : "Not active",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: TrendingUp,
      title: "Cycle Day",
      value: `Day ${currentCycleDay}/${cycleLength}`,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Activity,
      title: "Current Phase",
      value: phase,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  const symptoms = [
    { name: "Cramps", active: currentCycleDay <= 3 },
    { name: "Fatigue", active: currentCycleDay <= 2 },
    { name: "Mood swings", active: currentCycleDay > 20 },
    { name: "Bloating", active: currentCycleDay <= 4 || currentCycleDay > 22 },
    { name: "Headache", active: false },
    { name: "Back pain", active: currentCycleDay <= 2 },
  ];

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Menstrual Cycle Tracking</h1>
          <p className="text-gray-600">
            Track your menstrual cycle, symptoms, and get personalized insights
          </p>
        </div>

        <div className="space-y-6">
          {/* Insights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className={`w-10 h-10 rounded-lg ${insight.bgColor} flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${insight.color}`} />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{insight.title}</p>
                    <p className="font-semibold">{insight.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Cycle Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Cycle Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cycle Progress</span>
                  <span className="text-sm font-medium">
                    {Math.round((currentCycleDay / cycleLength) * 100)}%
                  </span>
                </div>
                <Progress value={(currentCycleDay / cycleLength) * 100} className="h-3" />
                
                <div className="grid grid-cols-7 gap-2 mt-6">
                  {Array.from({ length: cycleLength }).map((_, index) => {
                    const day = index + 1;
                    const isPeriod = day <= periodLength;
                    const isFertile = day >= 11 && day <= 16;
                    const isToday = day === currentCycleDay;
                    const isOvulation = day === 14;

                    return (
                      <div
                        key={day}
                        className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                          isToday
                            ? "bg-purple-600 text-white ring-2 ring-purple-600 ring-offset-2"
                            : isPeriod
                            ? "bg-pink-200 text-pink-800"
                            : isOvulation
                            ? "bg-purple-200 text-purple-800"
                            : isFertile
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-pink-200 rounded"></div>
                    <span className="text-sm text-gray-600">Period</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-100 rounded"></div>
                    <span className="text-sm text-gray-600">Fertile Window</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-200 rounded"></div>
                    <span className="text-sm text-gray-600">Ovulation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-600 rounded"></div>
                    <span className="text-sm text-gray-600">Today</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Symptoms Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Current Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom, index) => (
                  <Badge
                    key={index}
                    variant={symptom.active ? "default" : "outline"}
                    className={symptom.active ? "bg-purple-600" : ""}
                  >
                    {symptom.name}
                  </Badge>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                Log Symptoms
              </Button>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">💡 {phase} Phase Tips</h3>
              <p className="text-sm text-gray-700">
                {phase === "Menstrual" && "Stay hydrated, use heat for cramps, and rest when needed."}
                {phase === "Follicular" && "Great time for new projects! Energy levels are rising."}
                {phase === "Ovulation" && "You're in your fertile window. Peak energy and confidence!"}
                {phase === "Luteal" && "Focus on self-care. You may feel more tired as your period approaches."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ad Banner */}
        <Card className="mt-6 bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">📢 Sponsored</p>
                <p className="text-sm text-gray-600">
                  Track better with premium insights. Upgrade to unlock detailed analytics and predictions.
                </p>
              </div>
              <Button variant="outline" size="sm" className="ml-4">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}