import { useState } from "react";
import { Search, Filter, Award } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { mockProviders } from "../data/mockData";
import { ProfessionalCard } from "../components/ProfessionalCard";

export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");

  const filteredProviders = mockProviders.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      specialtyFilter === "all" || provider.specialty.toLowerCase().includes(specialtyFilter.toLowerCase());

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Health Professionals</h1>
          <p className="text-gray-600">
            Connect with verified, certified health providers for confidential consultations
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-full sm:w-[250px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="Sexual">Sexual & Reproductive Health</SelectItem>
                <SelectItem value="Mental">Mental Health</SelectItem>
                <SelectItem value="Family Planning">Family Planning</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">All Providers Are Verified</h3>
                <p className="text-sm text-gray-700">
                  Every health professional on Nsobanuza is certified by relevant Rwandan
                  professional councils. Your consultations are encrypted and confidential.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <ProfessionalCard key={provider.id} provider={provider} />
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-600">No providers found matching your criteria.</p>
          </Card>
        )}

        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Sponsored Partnership</p>
                <p className="text-sm text-gray-600">
                  Need contraception or health products? Visit our partner pharmacy for
                  confidential service and delivery.
                </p>
              </div>
              <Button variant="outline">Visit Pharmacy</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
