import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

// ✅ Canvas 内で動作する EarthMesh を作成
const EarthMesh = () => {
  // 🎨 テクスチャをロード（useLoader は Canvas 内でしか使えない）
  const earthTexture = useLoader(THREE.TextureLoader, "./textures/earth.png");
  const nightTexture = useLoader(THREE.TextureLoader, "./textures/earth_night.jpg");
  const cloudsTexture = useLoader(THREE.TextureLoader, "./textures/cloud.jpg"); // ☁️雲のテクスチャ追加


  // 🔄 地球を回転させるための useRef
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0002;  // ゆっくり回転
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0003; // ☁️ 雲を地球より少し速く回転させる
    }
  });

  return (
    <>
      <Sphere ref={earthRef} args={[4, 128, 128]} position={[0, -2, 0]}>
        <meshStandardMaterial 
          map={earthTexture} 
          // emissiveMap={nightTexture} // 🌟 夜の部分だけ光る
          // emissive={new THREE.Color(0.3, 0.3, 0.3)}
        />
      </Sphere>
      /* ☁️ 雲のレイヤー（少し大きくして浮かせる） */
      <Sphere ref={cloudsRef} args={[4.02, 128, 128]} position={[0, -2, 0]}>
        <meshStandardMaterial 
          map={cloudsTexture} 
          transparent 
          opacity={0.35} // 雲の透明度
          blending={THREE.AdditiveBlending} // ☁️ 雲が光を受けやすくする
        />
      </Sphere>
    </>
  );
};

// ✅ Canvas をラップする Earth コンポーネント
const Earth = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "-20vh", // もう少し下に
        right: "-20vw",  // 右寄せを減らす
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        backgroundColor: "black",
      }}
    >
      <Canvas camera={{ position: [0, -1, 6], fov: 55 }}>
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
