import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

interface EarthMeshProps {
  onProjectClick: () => void;
  onCareerClick: () => void;
  onSkillsClick: () => void;
  onIntroductionClick: () => void;
  isAnyModalOpen: boolean;
}

const EarthMesh = ({ 
  onProjectClick, 
  onCareerClick, 
  onSkillsClick,
  onIntroductionClick,
  isAnyModalOpen
}: EarthMeshProps) => {
  const earthTexture = useLoader(THREE.TextureLoader, "./textures/earth.png");
  const cloudsTexture = useLoader(THREE.TextureLoader, "./textures/cloud3.jpg");

  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDeviceSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);

    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.0002;
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0003;
  });

  const getHtmlPosition = (index: number, xPosition?: number) => {
    if (isMobile || isTablet) {
      return [0, 2 - index, 0];
    } else {
      return [xPosition !== undefined ? xPosition : -2, 2 - index, 0];
    }
  };

  return (
    <>
      <Sphere ref={earthRef} args={[4, 128, 128]} position={[2, -2, 0]}>
        <meshStandardMaterial map={earthTexture} />
      </Sphere>

      <Sphere ref={cloudsRef} args={[4.02, 128, 128]} position={[2, -2, 0]}>
        <meshStandardMaterial map={cloudsTexture} transparent opacity={0.35} />
      </Sphere>

      {(!isAnyModalOpen || (!isMobile && !isTablet)) && (
        <>
          <Html position={getHtmlPosition(0, -4.35)} center>
            <div style={{ 
              color: "white", 
              fontSize: isMobile ? "16px" : isTablet ? "18px" : "20px",
              fontWeight: "bold",
              width: isMobile ? "80px" : isTablet ? "90px" : "100px",
              textAlign: (isMobile || isTablet) ? "center" : "left"
            }}>
              <a href="#" style={{ color: "white", textDecoration: "none" }} onClick={onIntroductionClick}>
                Introduction
              </a>
            </div>
          </Html>

          <Html position={getHtmlPosition(3, -4.1)} center>
            <div style={{ 
              color: "white", 
              fontSize: isMobile ? "16px" : isTablet ? "18px" : "20px",
              fontWeight: "bold",
              width: isMobile ? "80px" : isTablet ? "90px" : "100px",
              textAlign: (isMobile || isTablet) ? "center" : "left"
            }}>
              <a href="#" style={{ color: "white", textDecoration: "none" }} onClick={onCareerClick}>
                Career
              </a>
            </div>
          </Html>

          <Html position={getHtmlPosition(2, -4.19)} center>
            <div style={{ 
              color: "white", 
              fontSize: isMobile ? "16px" : isTablet ? "18px" : "20px",
              fontWeight: "bold",
              width: isMobile ? "80px" : isTablet ? "90px" : "100px",
              textAlign: (isMobile || isTablet) ? "center" : "left"
            }} onClick={onProjectClick}>
              <a href="#" style={{ color: "white", textDecoration: "none" }}>
                Projects
              </a>
            </div>
          </Html>

          <Html position={getHtmlPosition(1, -4.25)} center>
            <div style={{ 
              color: "white", 
              fontSize: isMobile ? "16px" : isTablet ? "18px" : "20px",
              fontWeight: "bold",
              width: isMobile ? "80px" : isTablet ? "90px" : "100px",
              textAlign: (isMobile || isTablet) ? "center" : "left"
            }}>
              <a href="#" style={{ color: "white", textDecoration: "none" }} onClick={onSkillsClick}>
                Skills
              </a>
            </div>
          </Html>
        </>
      )}
      
      {(!isAnyModalOpen || (!isMobile && !isTablet)) && (
        <Html position={isMobile || isTablet ? [0, -3, 0] : [-4, -3, 0]} center>
          <div style={{ 
            display: "flex", 
            gap: isMobile ? "5px" : isTablet ? "8px" : "10px",
            fontSize: isMobile ? "20px" : isTablet ? "22px" : "24px",
            justifyContent: (isMobile || isTablet) ? "center" : "flex-start"
          }}>
            <a
              href="https://github.com/hirakei1203"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", transition: "color 0.3s" }}
              onMouseOver={(e) => e.currentTarget.style.color = "#2ea44f"}
              onMouseOut={(e) => e.currentTarget.style.color = "white"}
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/keitaro-hirano-340164191/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", transition: "color 0.3s" }}
              onMouseOver={(e) => e.currentTarget.style.color = "#0077b5"}
              onMouseOut={(e) => e.currentTarget.style.color = "white"}
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:hirano.keitaro.64x@gmail.com"
              style={{ color: "white", transition: "color 0.3s" }}
              onMouseOver={(e) => e.currentTarget.style.color = "#ff9800"}
              onMouseOut={(e) => e.currentTarget.style.color = "white"}
            >
              <FaEnvelope />
            </a>
          </div>
        </Html>
      )}
    </>
  );
};

export default EarthMesh; 