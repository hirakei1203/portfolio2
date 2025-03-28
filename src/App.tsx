import { useState } from "react";
import Earth from "./components/Earth"; 

const App = () => {
  const [isJapanese, setIsJapanese] = useState(false);

  return (
    <div>
      
      <Earth />
    </div>
  );
};

export default App;
