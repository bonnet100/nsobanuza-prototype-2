import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { useUser } from '../UserContext';

export function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    type: 'user' as 'user' | 'professional',
    fullName: '',
    licenseNumber: '',
    specialty: '',
    bio: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTypeChange = (value: 'user' | 'professional') => {
    setFormData(prev => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const success = await signup(formData);
    setIsLoading(false);

    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-2 border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-200">
          <CardTitle className="text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Join Nsobanuza</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="type" className="font-semibold text-gray-700">Account Type</Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger className="border-2 border-gray-300 hover:border-purple-400 focus:border-purple-500 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Regular User</SelectItem>
                  <SelectItem value="professional">Health Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="username" className="font-semibold text-gray-700">Username *</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a unique username"
                className="border-2 border-gray-300 hover:border-purple-400 focus:border-purple-500 focus:ring-purple-200 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="email" className="font-semibold text-gray-700">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="border-2 border-gray-300 hover:border-purple-400 focus:border-purple-500 focus:ring-purple-200 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="font-semibold text-gray-700">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+250 XXX XXX XXX"
                className="border-2 border-gray-300 hover:border-purple-400 focus:border-purple-500 focus:ring-purple-200 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="password" className="font-semibold text-gray-700">Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="border-2 border-gray-300 hover:border-purple-400 focus:border-purple-500 focus:ring-purple-200 rounded-lg"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="font-semibold text-gray-700">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="border-2 border-gray-300 hover:border-purple-400 focus:border-purple-500 focus:ring-purple-200 rounded-lg"
              />
            </div>

            {formData.type === 'professional' && (
              <>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-gray-700 mb-3 text-purple-700">Professional Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName" className="font-semibold text-gray-700">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Dr. John Doe"
                        className="border-2 border-gray-300 hover:border-purple-400 focus:border-purple-500 focus:ring-purple-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="licenseNumber" className="font-semibold text-gray-700">License Number *</Label>
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        type="text"
                        required
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        placeholder="Government license number"
                        className="border-2 border-gray-300 hover:border-purple-400 focus:border-purple-500 focus:ring-purple-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="specialty" className="font-semibold text-gray-700">Specialty *</Label>
                      <Input
                        id="specialty"
                        name="specialty"
                        type="text"
                        required
                        value={formData.specialty}
                        onChange={handleChange}
                        placeholder="e.g., Sexual & Reproductive Health"
                        className="border-2 border-gray-300 hover:border-purple-400 focus:border-purple-500 focus:ring-purple-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio" className="font-semibold text-gray-700">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us about your experience and qualifications"
                        rows={3}
                        className="border-2 border-gray-300 hover:border-purple-400 focus:border-purple-500 focus:ring-purple-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-2 rounded-lg" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-4 text-center border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}