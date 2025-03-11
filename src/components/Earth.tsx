import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";
import ShootingStars from "./ShootingStars";
import { FaGithub, FaLinkedin, FaTimes } from "react-icons/fa";

// ✅ 地球 & 雲のコンポーネント
const EarthMesh = ({ onProjectClick, onCareerClick }: { 
  onProjectClick: () => void;
  onCareerClick: () => void;
}) => {
  const earthTexture = useLoader(THREE.TextureLoader, "./textures/earth.png");
  const cloudsTexture = useLoader(THREE.TextureLoader, "./textures/cloud3.jpg");

  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.0002;
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0003;
  });

  return (
    <>
      {/* 🌍 地球レイヤー */}
      <Sphere ref={earthRef} args={[4, 128, 128]} position={[2, -2, 0]}>
        <meshStandardMaterial map={earthTexture} />
      </Sphere>

      {/* ☁️ 雲レイヤー */}
      <Sphere ref={cloudsRef} args={[4.02, 128, 128]} position={[2, -2, 0]}>
        <meshStandardMaterial map={cloudsTexture} transparent opacity={0.35} />
      </Sphere>

      {/* Career */}
      <Html position={[-4.85, 0, 0]} center>
        <div style={{ 
          color: "white", 
          fontSize: "20px", 
          fontWeight: "bold",
          width: "100px",
          textAlign: "left"
        }}>
          <a href="#" style={{ color: "white", textDecoration: "none" }} onClick={onCareerClick}>
            Career
          </a>
        </div>
      </Html>

      <Html position={[-5.1, 2, 0]} center>
        <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }} onClick={onProjectClick}>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Projects
          </a>
        </div>
      </Html>

      <Html position={[-5.15, 1, 0]} center>
        <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Skills
          </a>
        </div>
      </Html>
      
      {/* 言語切り替えボタン */}

<Html position={[-4.7, -3, 0]} center>
  <div style={{ display: "flex", gap: "10px" }}>
    <a
      href="https://github.com/hirakei1203"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "white", fontSize: "24px" }}
    >
      <FaGithub />
    </a>
    <a
      href="https://www.linkedin.com/in/keitaro-hirano-340164191/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "white", fontSize: "24px" }}
    >
      <FaLinkedin />
    </a>
  </div>
</Html>

    </>
  );
};

const ProjectCards = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "10%",
        right: "5%",
        width: "40%",
        height: "70%",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          cursor: "pointer",
        }}
      >
        <FaTimes size={14}></FaTimes>
      </button>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr", // 🔥 2列にする
            gap: "20px",
            width: "90%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "150px",
              background: "lightblue",
              borderRadius: "15px",
            }}
          >
            test1{/* ここにプロジェクトの画像を追加予定 */}
          </div>
          <div
            style={{
              width: "100%",
              height: "150px",
              background: "lightblue",
              borderRadius: "15px",
            }}
          >
          test2{/* ここにプロジェクトの画像を追加予定 */}
        </div>
      </div>
    </div>
  );
};

const CareerCards = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "10%",
        right: "5%",
        width: "40%",
        height: "70%",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          cursor: "pointer",
        }}
      >
        <FaTimes size={14} />
      </button>
      <div style={{ color: "white" }}>Career Content Here</div>
    </div>
  );
};

const Earth = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [showCareer, setShowCareer] = useState(false);

  const toggleProjects = () => {
    setShowProjects(prev => !prev);
  };

  const toggleCareer = () => {
    setShowCareer(prev => !prev);
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "0vh",
      right: "0vw",
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      backgroundColor: "black",
    }}>
      <Canvas camera={{ position: [0, -1, 7], fov: 55 }}>
        <ambientLight intensity={1.0} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Stars />
        <ShootingStars />
        <EarthMesh 
          onProjectClick={toggleProjects}
          onCareerClick={toggleCareer}
        />
        <OrbitControls target={[0, 0, 0]} />
      </Canvas>

      {showProjects && <ProjectCards onClose={toggleProjects} />}
      {showCareer && <CareerCards onClose={toggleCareer} />}
    </div>
  );
};

export default Earth;
