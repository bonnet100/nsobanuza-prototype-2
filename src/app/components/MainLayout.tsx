import { Outlet, Link, useLocation } from "react-router";
import { MessageCircle, Calendar, Users, PlayCircle, User, Home, Globe, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useUser } from "../UserContext";
import { useLanguage } from "../LanguageContext";
import { t } from "../translations";

export function MainLayout() {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const { currentUser, logout } = useUser();

  const navigation = [
    { name: t('home', language as any), href: "/", icon: Home },
    { name: t('aiChat', language as any), href: "/chatbot", icon: MessageCircle },
    { name: t('tracking', language as any), href: "/tracking", icon: Calendar },
    { name: t('providers', language as any), href: "/marketplace", icon: Users },
    { name: t('videos', language as any), href: "/videos", icon: PlayCircle },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b-2 border-purple-200 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Nsobanuza
              </span>
            </Link>

            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-600" />
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[140px] border-2 border-purple-300 hover:border-purple-500 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="rw">Kinyarwanda</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Auth Buttons */}
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">@{currentUser.username}</span>
                  <Link to="/profile">
                    <Button
                      variant={location.pathname === "/profile" ? "default" : "ghost"}
                      size="sm"
                      className="gap-2"
                    >
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('profile', language as any)}</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('logout', language as any)}</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      {t('logIn', language as any)}
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
                      {t('signUp', language as any)}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-4">
        <Outlet />
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-purple-200 md:hidden z-50">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors ${
                  active
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : ""}`} />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-20 left-0 bottom-0 w-64 bg-white border-r border-gray-200 p-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? "text-purple-600 bg-purple-50 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : ""}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Chatbot Button */}
      {location.pathname !== "/chatbot" && (
        <Link
          to="/chatbot"
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50"
        >
          <Button
            size="lg"
            className="rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </Link>
      )}
    </div>
  );
}
