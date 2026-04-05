import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Chatbot } from "./pages/Chatbot";
import { Tracking } from "./pages/Tracking";
import { Marketplace } from "./pages/Marketplace";
import { Videos } from "./pages/Videos";
import { Profile } from "./pages/Profile";
import { ProviderProfile } from "./pages/ProviderProfile";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { MainLayout } from "./components/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "chatbot", Component: Chatbot },
      { path: "tracking", Component: Tracking },
      { path: "marketplace", Component: Marketplace },
      { path: "videos", Component: Videos },
      { path: "profile", Component: Profile },
      { path: "provider/:id", Component: ProviderProfile },
    ],
  },
]);
