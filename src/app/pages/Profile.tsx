import { User, Settings, Bell, Shield, Languages, LogOut, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { useUser } from "../UserContext";
import { Link } from "react-router";

export function Profile() {
  const { currentUser } = useUser();

  if (!currentUser) {
    return (
      <div className="md:ml-64 min-h-screen bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-8">
            <CardContent>
              <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold mb-2">Please Log In</h2>
              <p className="text-gray-600 mb-6">You need to be logged in to view your profile.</p>
              <div className="flex gap-4 justify-center">
                <Link to="/login">
                  <Button>Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline">Sign Up</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        {/* Profile Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-1">@{currentUser.username}</h2>
                <p className="text-gray-600 text-sm">
                  Member since {currentUser.createdAt.toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge className={currentUser.type === 'professional' ? 'bg-blue-600' : 'bg-green-600'}>
                    {currentUser.type === 'professional' ? 'Professional' : 'Free Account'}
                  </Badge>
                  {currentUser.verified && (
                    <Badge className="bg-green-600">Verified</Badge>
                  )}
                </div>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Professional Info */}
        {currentUser.type === 'professional' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Full Name</p>
                  <p className="text-sm text-gray-600">{currentUser.fullName || 'Not provided'}</p>
                </div>
                <div>
                  <p className="font-medium">License Number</p>
                  <p className="text-sm text-gray-600">{currentUser.licenseNumber || 'Not provided'}</p>
                </div>
                <div>
                  <p className="font-medium">Specialty</p>
                  <p className="text-sm text-gray-600">{currentUser.specialty || 'Not provided'}</p>
                </div>
                <div>
                  <p className="font-medium">Verification Status</p>
                  <Badge className={currentUser.verified ? 'bg-green-600' : 'bg-yellow-600'}>
                    {currentUser.verified ? 'Verified' : 'Pending Verification'}
                  </Badge>
                </div>
              </div>
              {currentUser.bio && (
                <div>
                  <p className="font-medium mb-2">Bio</p>
                  <p className="text-sm text-gray-600">{currentUser.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Account Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Username</p>
                <p className="text-sm text-gray-600">@{currentUser.username}</p>
              </div>
              <Button variant="ghost" size="sm">Change</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-600">user@example.com</p>
              </div>
              <Button variant="ghost" size="sm">Change</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-gray-600">••••••••</p>
              </div>
              <Button variant="ghost" size="sm">Change</Button>
            </div>
          </CardContent>
        </Card>

        {/* Language Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5" />
              Language & Region
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Preferred Language</p>
                <p className="text-sm text-gray-600">English</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Region</p>
                <p className="text-sm text-gray-600">Rwanda</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Period Reminders</p>
                <p className="text-sm text-gray-600">Get notified before your period</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Health Tips</p>
                <p className="text-sm text-gray-600">Daily wellness reminders</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Content</p>
                <p className="text-sm text-gray-600">Updates about new videos and resources</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Appointment Reminders</p>
                <p className="text-sm text-gray-600">Reminders for consultations</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Anonymous Mode</p>
                <p className="text-sm text-gray-600">Hide your profile from search</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Encryption</p>
                <p className="text-sm text-gray-600">All consultations are encrypted</p>
              </div>
              <Badge className="bg-green-600">Active</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete My Data</p>
                <p className="text-sm text-gray-600">Permanently remove all your data</p>
              </div>
              <Button variant="outline" size="sm" className="text-red-600">Delete</Button>
            </div>
          </CardContent>
        </Card>

        {/* Activity */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              My Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">24</p>
                <p className="text-sm text-gray-600">Videos Watched</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">3</p>
                <p className="text-sm text-gray-600">Consultations</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">47</p>
                <p className="text-sm text-gray-600">Chat Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 mb-6">
          <CardHeader>
            <CardTitle className="text-red-600">Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full" size="lg">
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
            <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50" size="lg">
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Contact our support team or visit our help center for assistance.
            </p>
            <Button variant="outline">Get Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
