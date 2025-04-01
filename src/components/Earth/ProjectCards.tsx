import { useState, useEffect } from "react";
import { FaTimes, FaHammer } from "react-icons/fa";

interface ProjectCardsProps {
  onClose: () => void;
}

const ProjectCards = ({ onClose }: ProjectCardsProps) => {
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

  const projects = [
    { 
      name: "AI powered Vancouver Information Map", 
      description: "Personalized Information Site",
      tech: "Laravel, Vue.js, AWS, OpenAI",
      status: "In Progress"
    },
    { 
      name: "AI Agent Type Todo List", 
      description: "Users can manage their ToDo List through by AI Agent ",
      tech: "Laravel, Vue.js, AWS, OpenAI",
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

export default ProjectCards; 