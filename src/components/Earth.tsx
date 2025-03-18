import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";
import ShootingStars from "./ShootingStars";
import { FaGithub, FaLinkedin, FaTimes, FaAws, FaCalculator, FaChartLine, FaLanguage, FaCertificate, FaGraduationCap, FaMobileAlt, FaCalendarAlt, FaBullhorn, FaExternalLinkAlt } from "react-icons/fa";
import { SiPhp, SiLaravel, SiVuedotjs, SiJquery, SiFlutter } from "react-icons/si";

const EarthMesh = ({ onProjectClick, onCareerClick, onSkillsClick }: { 
  onProjectClick: () => void;
  onCareerClick: () => void;
  onSkillsClick: () => void;
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
      {/* Earth layer */}
      <Sphere ref={earthRef} args={[4, 128, 128]} position={[2, -2, 0]}>
        <meshStandardMaterial map={earthTexture} />
      </Sphere>

      {/* Cloud layer */}
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

      {/* Project */}
      <Html position={[-5.1, 2, 0]} center>
        <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }} onClick={onProjectClick}>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Projects
          </a>
        </div>
      </Html>

      {/* Skills */}
      <Html position={[-5.15, 1, 0]} center>
        <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
          <a href="#" style={{ color: "white", textDecoration: "none" }} onClick={onSkillsClick}>
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
  const projects = [
    { 
      name: "Vancouver Information Map", 
      description: "Personalized Information Site",
      tech: "Laravel, Vue.js AWS",
      status: "In Progress"
    }
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: "5%",
        right: "5%",
        width: "40%",
        height: "85%",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "flex-start",
        alignItems: "center",
        overflowY: "auto"
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
      
      <h2 style={{ 
        color: "white", 
        marginBottom: "10px", 
        marginTop: "10px",
        width: "90%",
        textAlign: "left"
      }}>Projects</h2>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr", 
        gap: "20px",
        width: "90%"
      }}>
        {projects.map((project, index) => (
          <div 
            key={index}
            style={{
              background: "rgba(255, 255, 255, 0.15)", 
              padding: "20px",
              borderRadius: "10px",
              color: "white",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "10px" }}>{project.name}</h3>
            <p style={{ margin: "10px 0", opacity: 0.9 }}>{project.description}</p>
            <div style={{ 
              fontSize: "14px", 
              marginTop: "15px",
              opacity: 0.7,
              display: "flex",
              alignItems: "center"
            }}>
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>Tech Stack:</span>
              {project.tech}
            </div>
            <div style={{
              fontSize: "14px",
              marginTop: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "5px 10px",
              borderRadius: "5px",
              display: "inline-block",
              color: "rgba(255, 255, 255, 0.9)"
            }}>
              {project.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CareerCards = ({ onClose }: { onClose: () => void }) => {
  const jobs = [
    { name: "Marketing Automation Tool", icon: <FaBullhorn size={32} /> },
    { name: "Scheduling Tool", icon: <FaCalendarAlt size={32} /> },
    { name: "Sales Force Automation Application (Mobile)", icon: <FaMobileAlt size={32} /> }
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: "5%",
        right: "5%",
        width: "40%",
        height: "85%",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "flex-start",
        alignItems: "center",
        overflowY: "auto"
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
      
      <h2 style={{ 
        color: "white", 
        marginBottom: "10px", 
        marginTop: "10px",
        width: "90%",
        textAlign: "left"
      }}>Job</h2>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr", 
        gap: "20px",
        width: "90%"
      }}>
        {jobs.map((job) => {
          const [isHovered, setIsHovered] = useState(false);
          
          return (
            <div 
              key={job.name}
              style={{
                background: "rgba(255, 255, 255, 0.15)", 
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "15px"
              }}
            >
              {job.icon}
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ 
                  color: "white", 
                  textDecoration: isHovered ? "underline" : "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "text-decoration 0.2s ease"
                }}
              >
                <span style={{ textDecoration: "inherit" }}>
                  {job.name}
                  <FaExternalLinkAlt size={14} style={{ opacity: 0.7, marginLeft: "8px" }} />
                </span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SkillsCards = ({ onClose }: { onClose: () => void }) => {
  const skillsWithIcons = [
    { name: "PHP", icon: <SiPhp size={32} /> },
    { name: "Laravel", icon: <SiLaravel size={32} /> },
    { name: "Vue.js", icon: <SiVuedotjs size={32} /> },
    { name: "jQuery", icon: <SiJquery size={32} /> },
    { name: "Flutter", icon: <SiFlutter size={32} /> },
    { name: "AWS", icon: <FaAws size={32} /> }
  ];

  const crossDomainSkills = [
    { name: "Web Marketing", icon: <FaChartLine size={32} /> },
    { name: "Accounting", icon: <FaCalculator size={32} /> },
    { name: "Japanese", icon: <FaLanguage size={32} /> }
  ];

  const certifications = [
    { name: "AWS Certified Developer Associate", status: "In Progress", icon: <FaAws size={32} /> },
    { name: "MBA", status: "In Progress", icon: <FaGraduationCap size={32} /> }
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: "5%",
        right: "5%",
        width: "40%",
        height: "85%",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "flex-start",
        alignItems: "center",
        overflowY: "auto"
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
      
      <h2 style={{ color: "white", marginBottom: "10px", marginTop: "10px" }}>Technical Skills</h2>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3, 1fr)", 
        gap: "20px",
        width: "90%"
      }}>
        {skillsWithIcons.map((skill) => (
          <div 
            key={skill.name}
            style={{
              background: "rgba(255, 255, 255, 0.15)", 
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px"
            }}
          >
            {skill.icon}
            {skill.name}
          </div>
        ))}
      </div>
      
      <h2 style={{ color: "white", marginBottom: "10px", marginTop: "20px" }}>Cross-Domain Knowledge</h2>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3, 1fr)", 
        gap: "20px",
        width: "90%"
      }}>
        {crossDomainSkills.map((skill) => (
          <div 
            key={skill.name}
            style={{
              background: "rgba(255, 255, 255, 0.15)", 
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px"
            }}
          >
            {skill.icon}
            {skill.name}
          </div>
        ))}
      </div>

      <h2 style={{ color: "white", marginBottom: "10px", marginTop: "20px" }}>Certification</h2>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(2, 1fr)", 
        gap: "20px",
        width: "90%"
      }}>
        {certifications.map((cert) => (
          <div 
            key={cert.name}
            style={{
              background: "rgba(255, 255, 255, 0.15)", 
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px"
            }}
          >
            {cert.icon}
            <div>
              {cert.name}
              <div style={{ 
                fontSize: "14px", 
                fontWeight: "normal", 
                marginTop: "5px",
                color: "rgba(255, 255, 255, 0.7)" 
              }}>
                {cert.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Earth = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [showCareer, setShowCareer] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  const toggleProjects = () => {
    setShowProjects(prev => !prev);
    if (!showProjects) {
      setShowCareer(false);
      setShowSkills(false);
    }
  };

  const toggleCareer = () => {
    setShowCareer(prev => !prev);
    if (!showCareer) {
      setShowProjects(false);
      setShowSkills(false);
    }
  };

  const toggleSkills = () => {
    setShowSkills(prev => !prev);
    if (!showSkills) {
      setShowProjects(false);
      setShowCareer(false);
    }
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
          onSkillsClick={toggleSkills}
        />
        <OrbitControls target={[0, 0, 0]} />
      </Canvas>

      {showProjects && <ProjectCards onClose={toggleProjects} />}
      {showCareer && <CareerCards onClose={toggleCareer} />}
      {showSkills && <SkillsCards onClose={toggleSkills} />}
    </div>
  );
};

export default Earth;
