import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useState, useEffect } from "react";
import ShootingStars from "./ShootingStars";
import EarthMesh from "./Earth/EarthMesh";
import ProjectCards from "./Earth/ProjectCards";
import CareerCards from "./Earth/CareerCards";
import SkillsCards from "./Earth/SkillsCards";
import IntroductionCards from "./Earth/IntroductionCards";

const Earth = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [showCareer, setShowCareer] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntroduction(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
