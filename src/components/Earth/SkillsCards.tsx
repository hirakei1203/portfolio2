import { useState, useEffect, Fragment, cloneElement, ReactElement } from "react";
import { FaTimes, FaAws, FaCube, FaMicrochip, FaCode, FaChartLine, FaCalculator, FaLanguage } from "react-icons/fa";
import { SiPhp, SiLaravel, SiVuedotjs, SiJquery, SiFlutter } from "react-icons/si";

interface SkillsCardsProps {
  onClose: () => void;
}

const SkillsCards = ({ onClose }: SkillsCardsProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
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
        zIndex: 1000,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease"
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

export default SkillsCards; 