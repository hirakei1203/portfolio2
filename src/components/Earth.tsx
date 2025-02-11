import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

const Earth = () => {
  const earthTexture = useLoader(THREE.TextureLoader, "./textures/earth.png");

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
      {/* ✅ ライトを正しく記述 */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* ✅ 地球の球体 */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial map={earthTexture} />
      </Sphere>

      <OrbitControls />
    </Canvas>
  );
};

export default Earth;
