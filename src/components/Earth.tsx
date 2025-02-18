import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

// ✅ シェーダーで大気を表現
const AtmosphereMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Color("#5599ff") },
    intensity: { value: 0.5 }
  },
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    uniform vec3 color;
    uniform float intensity;
    void main() {
      float strength = dot(vNormal, vec3(0, 1, 0));  // 上方向に向かうほど強く
      gl_FragColor = vec4(color * intensity * strength, strength * 0.5);
    }
  `,
  transparent: true,
});

// ✅ 地球 & 雲のコンポーネント
const EarthMesh = () => {
  // 🎨 テクスチャをロード
  const earthTexture = useLoader(THREE.TextureLoader, "./textures/earth.png");
  const nightTexture = useLoader(THREE.TextureLoader, "./textures/earth_night.jpg");
  const cloudsTexture = useLoader(THREE.TextureLoader, "./textures/cloud3.jpg");

  // 🔄 回転用の useRef
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0002; // 地球をゆっくり回転
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0003; // 雲は少し速く回転
    }
  });

  return (
    <>
      {/* 🌍 地球レイヤー */}
      <Sphere ref={earthRef} args={[4, 128, 128]} position={[0, -2, 0]}>
        <meshStandardMaterial 
          map={earthTexture} 
          // emissiveMap={nightTexture} // 🌟 夜の部分を光らせる
          // emissive={new THREE.Color(0.8, 0.8, 0.8)} // 明るさを調整
        />
      </Sphere>

      {/* ☁️ 雲レイヤー */}
      <Sphere ref={cloudsRef} args={[4.02, 128, 128]} position={[0, -2, 0]}>
        <meshStandardMaterial 
          map={cloudsTexture} 
          transparent 
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* 🌌 大気圏レイヤー */}
      <Sphere args={[4.06, 128, 128]} position={[0, -2, 0]}>
        <primitive attach="material" object={AtmosphereMaterial} />
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
        bottom: "-20vh",
        right: "-20vw",
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
        <OrbitControls target={[0, 0, 0]} />

        {/* <Background />  星空テクスチャ */}
        <Stars />       {/* ランダムな星 */}
      </Canvas>
    </div>
  );
};

export default Earth;

