import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

// ✅ Canvas 内で動作する EarthMesh を作成
const EarthMesh = () => {
  // 🎨 テクスチャをロード（useLoader は Canvas 内でしか使えない）
  const earthTexture = useLoader(THREE.TextureLoader, "./textures/earth.png");
  const nightTexture = useLoader(THREE.TextureLoader, "./textures/earth_night.jpg");

  // 🔄 地球を回転させるための useRef
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;  // ゆっくり回転
    }
  });

  return (
    <Sphere ref={earthRef} args={[2.7, 64, 64]}>
      <meshStandardMaterial 
        map={earthTexture} 
        emissiveMap={nightTexture} // 🌟 夜の部分だけ光る
        emissive={new THREE.Color(0.3, 0.3, 0.3)}
      />
    </Sphere>
  );
};

// ✅ Canvas をラップする Earth コンポーネント
const Earth = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "-20vh",  // さらに下にはみ出させる
        right: "-20vw",   // さらに右にはみ出させる
        width: "100vw",    // もっと大きく
        height: "100vh",
        zIndex: 0,
        backgroundColor: "black",
      }}
    >
      <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
        <ambientLight intensity={1.0} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        {/* ✅ EarthMesh を呼び出す */}
        <EarthMesh />

        {/* ✅ マウス操作を追加 */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Earth;
