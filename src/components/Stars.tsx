import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Stars = () => {
  const starPositions = new Float32Array(3000); // 星の数を増やせる

  for (let i = 0; i < starPositions.length; i++) {
    starPositions[i] = (Math.random() - 0.5) * 200; // 広範囲に星を配置
  }

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color("white") },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = gl_PointCoord;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 3.0; // 星のサイズを調整
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 color;
      void main() {
        float dist = length(vUv - vec2(0.5)); // 中心からの距離
        if (dist > 0.5) discard; // 四角の外側をカット
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: true,
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={starPositions}
          count={starPositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <primitive attach="material" object={shaderMaterial} />
    </points>
  );
};

export default Stars;
