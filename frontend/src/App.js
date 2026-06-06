import { BrowserRouter, Routes, Route, Suspense, lazy } from "react-router-dom";
import { ChianyaProvider } from "./context/ChianyaContext";
import ForestScene from "./scenes/ForestScene";
import Avatar from "./avatar/Avatar";
import ProfileBadge from "./components/ProfileBadge";
import StarButton from "./components/StarButton";
import CursorTrail from "./components/CursorTrail";
import InstallButton from "./components/InstallButton";

// Lazy load all screens
const Welcome = lazy(() => import("./screens/Welcome"));
const Entry = lazy(() => import("./screens/Entry"));
const ModeSelect = lazy(() => import("./screens/ModeSelect"));
const Wisdom = lazy(() => import("./screens/Wisdom"));
const Breathe = lazy(() => import("./screens/Breathe"));
const Release = lazy(() => import("./screens/Release"));
const Ground = lazy(() => import("./screens/Ground"));
const JustSit = lazy(() => import("./screens/JustSit"));
const Companion = lazy(() => import("./screens/Companion"));
const Auth = lazy(() => import("./screens/Auth"));
const Dashboard = lazy(() => import("./screens/Dashboard"));
const FeedbackWall = lazy(() => import("./screens/FeedbackWall"));
const Resources = lazy(() => import("./screens/Resources"));
const Onboarding = lazy(() => import("./screens/Onboarding"));
const About = lazy(() => import("./screens/About"));
const FutureLetter = lazy(() => import("./screens/FutureLetter"));
const Admin = lazy(() => import("./screens/Admin"));
const Creator = lazy(() => import("./screens/Creator"));

export default function App() {
  return (
    <ChianyaProvider>
      <BrowserRouter>
        <div style={{
          width: "100vw", height: "100vh",
          position: "relative", overflow: "hidden",
        }}>
          <ForestScene />
          <Avatar />
          <ProfileBadge />
          <StarButton />
          <CursorTrail />
          <InstallButton />

          <Suspense fallback={null}>
            <Routes>
              <Route path="/"           element={<Welcome />} />
              <Route path="/auth"       element={<Auth />} />
              <Route path="/entry"      element={<Entry />} />
              <Route path="/modes"      element={<ModeSelect />} />
              <Route path="/wisdom"     element={<Wisdom />} />
              <Route path="/breathe"    element={<Breathe />} />
              <Route path="/release"    element={<Release />} />
              <Route path="/ground"     element={<Ground />} />
              <Route path="/sit"        element={<JustSit />} />
              <Route path="/companion"  element={<Companion />} />
              <Route path="/dashboard"  element={<Dashboard />} />
              <Route path="/feedback"   element={<FeedbackWall />} />
              <Route path="/resources"  element={<Resources />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/future-letter" element={<FutureLetter />} />
              <Route path="/about"      element={<About />} />
              <Route path="/admin"      element={<Admin />} />
              <Route path="/creator"    element={<Creator />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </ChianyaProvider>
  );
}