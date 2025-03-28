import { useState, useEffect } from "react";
import { FaTimes, FaUserAlt, FaMapMarkerAlt, FaLaptopCode } from "react-icons/fa";

interface IntroductionCardsProps {
  onClose: () => void;
}

const IntroductionCards = ({ onClose }: IntroductionCardsProps) => {
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

export default IntroductionCards; 