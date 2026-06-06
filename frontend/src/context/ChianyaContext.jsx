import { createContext, useContext, useState } from "react";

const ChianyaContext = createContext();

export function ChianyaProvider({ children }) {
  const [feelings, setFeelings]           = useState([]);
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [avatarLine, setAvatarLine]       = useState("Chianya welcomes you. The forest of consciousness is listening.");
  const [showAvatar, setShowAvatar]       = useState(false);
  const [soundEnabled, setSoundEnabled]   = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);
const [todayReflection, setTodayReflection] = useState("");
const [currentMode, setCurrentMode] = useState("default");
const [userStreak, setUserStreak] = useState(0);

  return (
    <ChianyaContext.Provider value={{
      feelings, setFeelings,
      currentScreen, setCurrentScreen,
      avatarLine, setAvatarLine,
      showAvatar, setShowAvatar,
      soundEnabled, setSoundEnabled,
      journalEntries, setJournalEntries,
      todayReflection, setTodayReflection,
      currentMode, setCurrentMode,
      userStreak, setUserStreak,
    }}>
      {children}
    </ChianyaContext.Provider>
  );
}

export const useChianya = () => useContext(ChianyaContext);