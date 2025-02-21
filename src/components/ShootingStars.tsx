import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ShootingStars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  // ⭐️ 初期の流れ星データを生成
  const stars = useMemo(() => {
    const positions = new Float32Array(50 * 3); // 50個の流れ星
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30; // X 軸（ランダム）
      positions[i * 3 + 1] = Math.random() * 10 + 5; // Y 軸（上から降ってくる）
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // Z 軸（奥行き）
    }
    return positions;
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += 0.02; // X方向に流れる（速度調整可能）
        positions[i + 1] -= 0.05; // Y方向に落ちる

        // 🌠 画面外に行ったらリセット
        if (positions[i + 1] < -5) {
          positions[i] = (Math.random() - 0.5) * 30;
          positions[i + 1] = Math.random() * 10 + 5;
          positions[i + 2] = (Math.random() - 0.5) * 30;
        }
      }
      starsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={stars}
          count={stars.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" color="white" size={0.1} transparent opacity={0.8} />
    </points>
  );
};

export default ShootingStars;
