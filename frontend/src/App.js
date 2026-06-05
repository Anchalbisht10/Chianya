import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChianyaProvider } from "./context/ChianyaContext";
import ForestScene from "./scenes/ForestScene";
import Avatar from "./avatar/Avatar";
import Welcome from "./screens/Welcome";
import Entry from "./screens/Entry";
import ModeSelect from "./screens/ModeSelect";
import Wisdom from "./screens/Wisdom";
import Breathe from "./screens/Breathe";
import Release from "./screens/Release";
import Ground from "./screens/Ground";
import JustSit from "./screens/JustSit";
import Companion from "./screens/Companion";
import Auth from "./screens/Auth";
import Dashboard from "./screens/Dashboard";
import ProfileBadge from "./components/ProfileBadge";
import FeedbackWall from "./screens/FeedbackWall";
import Resources from "./screens/Resources";
import Onboarding from "./screens/Onboarding";
import About from "./screens/About";
import FutureLetter from "./screens/FutureLetter";
import StarButton from "./components/StarButton";
import Admin from "./screens/Admin";

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
          <Routes>
            <Route path="/"          element={<Welcome />} />
            <Route path="/auth"      element={<Auth />} />
            <Route path="/entry"     element={<Entry />} />
            <Route path="/modes"     element={<ModeSelect />} />
            <Route path="/wisdom"    element={<Wisdom />} />
            <Route path="/breathe"   element={<Breathe />} />
            <Route path="/release"   element={<Release />} />
            <Route path="/ground"    element={<Ground />} />
            <Route path="/sit"       element={<JustSit />} />
            <Route path="/companion" element={<Companion />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/feedback" element={<FeedbackWall />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/future-letter" element={<FutureLetter />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            
          </Routes>
        </div>
      </BrowserRouter>
    </ChianyaProvider>
  );
}