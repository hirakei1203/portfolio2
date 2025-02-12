import { useState } from "react";
import Earth from "./components/Earth";  // ✅ 地球コンポーネントを読み込む

const App = () => {
  const [isJapanese, setIsJapanese] = useState(false);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black", // ✅ 背景を黒にして宇宙っぽく
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: "5vw",
        position: "relative",
      }}
    >
      {/* 言語スイッチ */}
      <div
        style={{
          position: "absolute",
          right: "5vw",
          top: "5vh",
          fontSize: "18px",
        }}
      >
        English
        <label style={{ margin: "0 10px" }}>
          <input
            type="checkbox"
            checked={isJapanese}
            onChange={() => setIsJapanese(!isJapanese)}
            style={{ display: "none" }}
          />
          <span
            style={{
              display: "inline-block",
              width: "50px",
              height: "25px",
              background: isJapanese ? "black" : "white",
              borderRadius: "25px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          />
        </label>
        Japanese
      </div>

      {/* ナビゲーション */}
      <div
        style={{
          fontSize: "24px",
          lineHeight: "2",
        }}
      >
        <div>Skill Set</div>
        <div>Projects</div>
        <div>Career</div>
      </div>

      {/* 右下に地球を表示 */}
      <Earth />
    </div>
  );
};

export default App;
