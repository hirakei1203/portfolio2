import { useState, useEffect, cloneElement, ReactElement } from "react";
import { FaTimes, FaBullhorn, FaCalendarAlt, FaMobileAlt, FaAws, FaGraduationCap, FaExternalLinkAlt } from "react-icons/fa";

interface CareerCardsProps {
  onClose: () => void;
}

const CareerCards = ({ onClose }: CareerCardsProps) => {
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

export default CareerCards; 