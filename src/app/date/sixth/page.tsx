"use client";

import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Animations
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const heartFloat = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-150px) scale(0.5); opacity: 0; }
`;

const glowEffect = keyframes`
  0% { box-shadow: 0 0 10px rgba(255, 105, 180, 0.5); }
  50% { box-shadow: 0 0 30px rgba(255, 105, 180, 1); }
  100% { box-shadow: 0 0 10px rgba(255, 105, 180, 0.5); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;

const squeezeText = keyframes`
  0% { transform: scaleX(0.3); opacity: 0; }
  50% { transform: scaleX(1.2); opacity: 1; }
  100% { transform: scaleX(1); opacity: 1; }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(45deg, #ff9a9e, #fbc2eb, #fad0c4);
  background-size: 300% 300%;
  animation: ${backgroundAnimation} 10s ease infinite;
  overflow: hidden;
  padding: 20px;
`;

const DateContainer = styled(motion.div)`
  font-size: 2rem;
  color: white;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 2s ease-out;
`;

const MessageContainer = styled(motion.div)`
  font-size: 3rem;
  color: #ff6f61;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 2s ease-out;
`;

const MilestoneText = styled.div`
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
  animation: ${squeezeText} 3s ease-out forwards;
  margin: 20px 0;
`;

const FloatingHeart = styled.div`
  position: absolute;
  animation: ${heartFloat} 4s ease-out infinite;
  font-size: 2.5rem;
  color: #ff6f61;
`;

const StarParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/stars.png") repeat;
  animation: ${glowEffect} 2s infinite ease-in-out;
  z-index: 0;
`;

const NextButton = styled(motion.button)`
  margin-top: 30px;
  padding: 12px 24px;
  background: #ff6f61;
  color: white;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    background: #ff3b2f;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
`;

const Home = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    setTimeout(() => {
      router.push("/step");
    }, 1000);
  };

  const date = "2024-08-03"; // The day you asked her to be your girlfriend

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <StarParticles />

      {/* Date section styled similarly to previous pages */}
      <DateContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {date}
      </DateContainer>

      <MessageContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div>100th Day</div>
      </MessageContainer>

      {isRevealed && (
        <>
          <MilestoneText>
            A hundred days of love, laughter, and memories. ❤️
          </MilestoneText>

          <FloatingHeart
            style={{
              top: "20%",
              left: "30%",
              animationDelay: "0s",
            }}
          >
            💖
          </FloatingHeart>

          <FloatingHeart
            style={{
              top: "50%",
              left: "60%",
              animationDelay: "2s",
            }}
          >
            💘
          </FloatingHeart>

          <FloatingHeart
            style={{
              top: "70%",
              left: "20%",
              animationDelay: "3s",
            }}
          >
            💓
          </FloatingHeart>

          <NextButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            onClick={handleNext}
          >
            Continue to Next Step
          </NextButton>
        </>
      )}
    </Container>
  );
};

export default Home;
