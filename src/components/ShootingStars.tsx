import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ShootingStars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  // ⭐️ 初期の流れ星データを生成
  const stars = useMemo(() => {
    const positions = new Float32Array(2 * 3); // 2 shooting stars
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

  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    if (!context) return null;

    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);

    return new THREE.CanvasTexture(canvas);
  }, []);

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
      <pointsMaterial
        attach="material"
        color="white"
        size={0.2}
        transparent
        opacity={0.8}
        // sizeAttenuation={true}
        map={particleTexture}
      />
    </points>
  );
};

export default ShootingStars;
