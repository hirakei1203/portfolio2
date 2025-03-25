import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useEffect, Fragment, cloneElement, ReactElement } from "react";
import ShootingStars from "./ShootingStars";
import { FaGithub, FaLinkedin, FaTimes, FaAws, FaCalculator, FaChartLine, FaLanguage, FaCertificate, FaGraduationCap, FaMobileAlt, FaCalendarAlt, FaBullhorn, FaExternalLinkAlt, FaCode, FaSync, FaMicrochip, FaEnvelope, FaCube, FaSpinner, FaHammer, FaTools, FaHardHat, FaUserAlt, FaMapMarkerAlt, FaLaptopCode } from "react-icons/fa";
import { SiPhp, SiLaravel, SiVuedotjs, SiJquery, SiFlutter } from "react-icons/si";

const EarthMesh = ({ 
  onProjectClick, 
  onCareerClick, 
  onSkillsClick,
  onIntroductionClick,
  isAnyModalOpen
}: { 
  onProjectClick: () => void;
  onCareerClick: () => void;
  onSkillsClick: () => void;
  onIntroductionClick: () => void;
  isAnyModalOpen: boolean;
}) => {
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
      // モバイルとタブレットサイズの場合は中央に配置
      return [0, 2 - index, 0];
    } else {
      // PCサイズの場合
      return [xPosition !== undefined ? xPosition : -2, 2 - index, 0];
    }
  };

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

      {/* Introduction */}
      {(!isAnyModalOpen || (!isMobile && !isTablet)) && (
        <Html position={getHtmlPosition(3, -4.2)} center>
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
      )}

      {/* Career */}
      {(!isAnyModalOpen || (!isMobile && !isTablet)) && (
        <Html position={getHtmlPosition(2, -4.25)} center>
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
      )}

      {/* Project */}
      {(!isAnyModalOpen || (!isMobile && !isTablet)) && (
        <Html position={getHtmlPosition(1, -4.34)} center>
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
      )}

      {/* Skills */}
      {(!isAnyModalOpen || (!isMobile && !isTablet)) && (
        <Html position={getHtmlPosition(0, -4.4)} center>
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
      )}
      
      {/* Social Links */}
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

const ProjectCards = ({ onClose }: { onClose: () => void }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects = [
    { 
      name: "AI powered Vancouver Information Map", 
      description: "Personalized Information Site",
      tech: "Laravel, Vue.js AWS",
      status: "In Progress"
    }
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: isMobile ? "0" : "5%",
        left: isMobile ? "0" : "auto",
        right: isMobile ? "0" : "5%",
        width: isMobile ? "100%" : "40%",
        height: isMobile ? "100%" : "85%",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: isMobile ? "0" : "15px",
        padding: isMobile ? "20px 10px" : "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "flex-start",
        alignItems: "center",
        overflowY: "auto",
        zIndex: 1000
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
              display: "inline-flex",
              alignItems: "center",
              color: "rgba(255, 255, 255, 0.9)"
            }}>
              <FaHammer 
                style={{ 
                  marginRight: "8px",
                  animation: "hammer 1.5s ease-in-out infinite"
                }} 
              />
              <style>{`
                @keyframes hammer {
                  0% { transform: rotate(0deg); }
                  30% { transform: rotate(-30deg); }
                  60% { transform: rotate(0deg); }
                  100% { transform: rotate(0deg); }
                }
              `}</style>
              {project.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CareerCards = ({ onClose }: { onClose: () => void }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const jobs = [
    { name: "Marketing Automation Tool (Japanese)", icon: <FaBullhorn size={32} />, url: "https://www.kairosmarketing.net/kairos3" },
    { name: "Scheduling Tool (Japanese)", icon: <FaCalendarAlt size={32} />, url: "https://www.kairosmarketing.net/timing" },
    { name: "Sales Force Automation Mobile App (Japanese)", icon: <FaMobileAlt size={32} />, url: "https://www.kairosmarketing.net/sales/features/sfa-app" }
  ];

  const universities = [
    { name: "Kyoto University", major: "Master of Biochemistry" },
    { name: "University Canada West", major: "Master of Business Administration" }
  ];

  const certifications = [
    { name: "AWS Certified Developer Associate", status: "In Progress", icon: <FaAws size={32} />, color: "#FF9900" },
    { name: "MBA", status: "In Progress", icon: <FaGraduationCap size={32} />, color: "#9C27B0" }
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: isMobile ? "0" : "5%",
        left: isMobile ? "0" : "auto",
        right: isMobile ? "0" : "5%",
        width: isMobile ? "100%" : "40%",
        height: isMobile ? "100%" : "85%",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: isMobile ? "0" : "15px",
        padding: isMobile ? "20px 10px" : "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "flex-start",
        alignItems: "center",
        overflowY: "auto",
        zIndex: 1000
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
                href={job.url || "#"} 
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

      <h2 style={{ 
        color: "white", 
        marginBottom: "10px", 
        marginTop: "20px",
        width: "90%",
        textAlign: "left"
      }}>Certification</h2>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(2, 1fr)", 
        gap: "20px",
        width: "90%"
      }}>
        {certifications.map((cert) => {
          const [isHovered, setIsHovered] = useState(false);
          
          return (
            <div 
              key={cert.name}
              style={{
                background: isHovered ? cert.color : "rgba(255, 255, 255, 0.15)", 
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                transition: "background-color 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {cloneElement(cert.icon as ReactElement, { 
                style: { color: "white" } 
              })}
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
          );
        })}
      </div>

      <h2 style={{ 
        color: "white", 
        marginBottom: "10px", 
        marginTop: "20px",
        width: "90%",
        textAlign: "left"
      }}>Education</h2>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr", 
        gap: "20px",
        width: "90%"
      }}>
        {universities.map((university) => (
          <div 
            key={university.name}
            style={{
              background: "rgba(255, 255, 255, 0.15)", 
              padding: "15px",
              borderRadius: "10px",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              gap: "5px"
            }}
          >
            <div>{university.name}</div>
            <div style={{ 
              fontSize: "16px", 
              fontWeight: "normal",
              opacity: 0.8 
            }}>
              {university.major}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsCards = ({ onClose }: { onClose: () => void }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skillsWithIcons = [
    { name: "PHP", icon: <SiPhp size={32} />, color: "#8892BF" },
    { name: "Laravel", icon: <SiLaravel size={32} />, color: "#FF2D20" },
    { name: "Vue.js", icon: <SiVuedotjs size={32} />, color: "#42B883" },
    { name: "jQuery", icon: <SiJquery size={32} />, color: "#0769AD" },
    { name: "Flutter", icon: <SiFlutter size={32} />, color: "#02569B" },
    { name: "AWS", icon: <FaAws size={32} />, color: "#FF9900" },
    { name: "DDD", icon: <FaCube size={32} />, color: "#5C85D6" },
    { name: "AI Coding", icon: <FaMicrochip size={32} />, color: "#00AEEF" },
    { name: "Restful API", icon: <FaCode size={32} />, color: "#61DAFB" }
  ];

  const crossDomainSkills = [
    { name: "Web Marketing", icon: <FaChartLine size={32} />, color: "#4CAF50" },
    { name: "Accounting", icon: <FaCalculator size={32} />, color: "#2196F3" },
    { name: "Japanese", icon: <FaLanguage size={32} />, color: "#E91E63" }
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: isMobile ? "0" : "5%",
        left: isMobile ? "0" : "auto",
        right: isMobile ? "0" : "5%",
        width: isMobile ? "100%" : "40%",
        height: isMobile ? "100%" : "85%",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: isMobile ? "0" : "15px",
        padding: isMobile ? "20px 10px" : "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "flex-start",
        alignItems: "center",
        overflowY: "auto",
        zIndex: 1000
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
        {skillsWithIcons.map((skill, index) => {
          const [isHovered, setIsHovered] = useState(false);
          
          return (
            <Fragment key={skill.name}>
              <div 
                style={{
                  background: isHovered ? skill.color : "rgba(255, 255, 255, 0.15)", 
                  padding: "15px",
                  borderRadius: "10px",
                  textAlign: "center",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  transition: "background-color 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {cloneElement(skill.icon as ReactElement, { 
                  style: { color: "white" } 
                })}
                {skill.name}
              </div>
              {(index + 1) % 6 === 0 && index !== skillsWithIcons.length - 1 && (
                <div style={{ 
                  gridColumn: "1 / -1", 
                  height: "1px", 
                  background: "rgba(255, 255, 255, 0.2)",
                  margin: "10px 0"
                }} />
              )}
            </Fragment>
          );
        })}
      </div>
      
      <h2 style={{ color: "white", marginBottom: "10px", marginTop: "20px" }}>Cross-Domain Knowledge</h2>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3, 1fr)", 
        gap: "20px",
        width: "90%"
      }}>
        {crossDomainSkills.map((skill) => {
          const [isHovered, setIsHovered] = useState(false);
          
          return (
            <div 
              key={skill.name}
              style={{
                background: isHovered ? skill.color : "rgba(255, 255, 255, 0.15)", 
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                transition: "background-color 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {cloneElement(skill.icon as ReactElement, { 
                style: { color: "white" } 
              })}
              {skill.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const IntroductionCards = ({ onClose }: { onClose: () => void }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: isMobile ? "0" : "5%",
        left: isMobile ? "0" : "auto",
        right: isMobile ? "0" : "5%",
        width: isMobile ? "100%" : "40%",
        height: isMobile ? "100%" : "85%",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: isMobile ? "0" : "15px",
        padding: isMobile ? "20px 10px" : "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "flex-start",
        alignItems: "center",
        overflowY: "auto",
        zIndex: 1000
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
      }}>自己紹介 / About Me</h2>
      
      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        gap: "20px",
        width: "90%"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.15)", 
          padding: "20px",
          borderRadius: "10px",
          color: "white",
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "15px",
            gap: "15px"
          }}>
            <div style={{ 
              background: "#4285F4", 
              borderRadius: "50%", 
              padding: "10px" 
            }}>
              <FaUserAlt size={24} color="white" />
            </div>
            <h3 style={{ margin: 0 }}>Keitaro Hirano / 平野 桂太郎</h3>
          </div>
          <p style={{ lineHeight: "1.6", margin: "0 0 15px 0" }}>
            Web developer based in Vancouver. Passionate about coraporating each other and building readable and structured web applications.
          </p>
        </div>

        <div style={{
          background: "rgba(255, 255, 255, 0.15)", 
          padding: "20px",
          borderRadius: "10px",
          color: "white",
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "15px",
            gap: "15px"
          }}>
            <div style={{ 
              background: "#0F9D58", 
              borderRadius: "50%", 
              padding: "10px" 
            }}>
              <FaMapMarkerAlt size={24} color="white" />
            </div>
            <h3 style={{ margin: 0 }}>ロケーション / Location</h3>
          </div>
          <p style={{ lineHeight: "1.6", margin: "0" }}>
            カナダ・バンクーバー / Vancouver, Canada
          </p>
        </div>

        <div style={{
          background: "rgba(255, 255, 255, 0.15)", 
          padding: "20px",
          borderRadius: "10px",
          color: "white",
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "15px",
            gap: "15px"
          }}>
            <div style={{ 
              background: "#DB4437", 
              borderRadius: "50%", 
              padding: "10px" 
            }}>
              <FaLaptopCode size={24} color="white" />
            </div>
            <h3 style={{ margin: 0 }}>専門分野 / Specialization</h3>
          </div>
          <p style={{ lineHeight: "1.6", margin: "0" }}>
            バックエンド開発、クラウドアーキテクチャ、AIツール活用、ドメイン駆動設計
          </p>
          <p style={{ lineHeight: "1.6", margin: "0" }}>
            Backend development, Cloud architecture, AI tool utilization, Domain-Driven Design
          </p>
        </div>
      </div>
    </div>
  );
};

const Earth = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [showCareer, setShowCareer] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(false);

  const isAnyModalOpen = showProjects || showCareer || showSkills || showIntroduction;

  const toggleProjects = () => {
    setShowProjects(prev => !prev);
    if (!showProjects) {
      setShowCareer(false);
      setShowSkills(false);
      setShowIntroduction(false);
    }
  };

  const toggleCareer = () => {
    setShowCareer(prev => !prev);
    if (!showCareer) {
      setShowProjects(false);
      setShowSkills(false);
      setShowIntroduction(false);
    }
  };

  const toggleSkills = () => {
    setShowSkills(prev => !prev);
    if (!showSkills) {
      setShowProjects(false);
      setShowCareer(false);
      setShowIntroduction(false);
    }
  };

  const toggleIntroduction = () => {
    setShowIntroduction(prev => !prev);
    if (!showIntroduction) {
      setShowProjects(false);
      setShowCareer(false);
      setShowSkills(false);
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
          onIntroductionClick={toggleIntroduction}
          isAnyModalOpen={isAnyModalOpen}
        />
        <OrbitControls target={[0, 0, 0]} />
      </Canvas>

      {showProjects && <ProjectCards onClose={toggleProjects} />}
      {showCareer && <CareerCards onClose={toggleCareer} />}
      {showSkills && <SkillsCards onClose={toggleSkills} />}
      {showIntroduction && <IntroductionCards onClose={toggleIntroduction} />}
    </div>
  );
};

export default Earth;
