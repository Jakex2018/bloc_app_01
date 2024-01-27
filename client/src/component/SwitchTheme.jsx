import { useState } from "react";
import { useStoreTheme } from "../store/useStore";
const SwitchTheme = () => {
  const { theme, setTheme } = useStoreTheme();
  const [darkMode, setDarkMode] = useState(theme === "dark");
  const toogleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`switch ${darkMode?'switch-dark':'switch-light'}`} onClick={toogleTheme}>
      <div className={`ball ${darkMode?'ball-dark':'ball-light'}`} onClick={toogleTheme}></div>
    </div>
  );
};

export default SwitchTheme;
