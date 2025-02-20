import { useState } from "react";
import Earth from "./components/Earth";  // ✅ 地球コンポーネントを読み込む

const App = () => {
  const [isJapanese, setIsJapanese] = useState(false);

  return (
    <div>
      
      <Earth />
    </div>
  );
};

export default App;
