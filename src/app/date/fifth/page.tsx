"use client";

import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const starsTwinkle = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

const floatHearts = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-100px) scale(0.6); opacity: 0; }
`;

const cloudFloat = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(100vw); }
`;

// Styled Components
const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Ensure full height of screen */
  background: radial-gradient(circle, #ff9a9e, #fad0c4, #fbc2eb);
  overflow: hidden;
  padding: 20px; /* Added padding to the container */
`;

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/stars.png") repeat;
  animation: ${starsTwinkle} 5s infinite ease-in-out;
  z-index: 0;
`;

const MemoryCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px 40px;
  max-width: 700px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 2;
  animation: ${fadeIn} 1s ease-out;
`;

const Polaroid = styled(motion.div)`
  position: relative;
  margin-top: 20px;
  width: 250px; /* Reduced the size of the image */
  height: 350px; /* Adjusted the height to match the new size */
  border: 10px solid #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(1.2);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const DateText = styled.h1`
  font-size: 3rem;
  color: #ff6f61;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

const MessageText = styled.p`
  font-size: 1.8rem;
  color: #333;
  line-height: 1.6;
  margin: 0 auto;
  max-width: 500px;
  font-family: "Courier New", Courier, monospace;
  white-space: normal;
  overflow: hidden;
  display: inline-block;
  border-right: 4px solid #ff6f61;
  animation: typing 5s steps(40) 1s forwards;

  @keyframes typing {
    from {
      max-width: 0;
    }
    to {
      max-width: 100%;
    }
  }
`;

const NextButton = styled(motion.button)`
  margin-top: 40px;
  padding: 12px 24px;
  background: #ff6f61;
  border: none;
  color: white;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #ff3b2f;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
`;

const HeartParticles = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  z-index: 1;
`;

const Heart = styled.div`
  position: absolute;
  animation: ${floatHearts} 5s ease-out infinite;
  font-size: 2rem;
  color: #ff6f61;
  will-change: transform;
`;

const Cloud = styled.div`
  position: absolute;
  top: 50%;
  left: -200px;
  width: 300px;
  height: 100px;
  background: url("/cloud.png") no-repeat;
  background-size: contain;
  animation: ${cloudFloat} 25s linear infinite;
  z-index: 0;
`;

const Glow = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.7), transparent);
  border-radius: 50%;
  z-index: 1;
  filter: blur(60px);
`;

const GlowLeft = styled(Glow)`
  top: -100px;
  left: -100px;
`;

const GlowRight = styled(Glow)`
  bottom: -100px;
  right: -100px;
`;

const Home = () => {
  const date = "2024-04-25";
  const message =
    "On this day, I asked her to be my girlfriend. She smiled, said yes, and my world changed forever.";
  const [isRevealed, setIsRevealed] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setTimeout(() => {
      const visitedSteps = JSON.parse(
        localStorage.getItem("visitedSteps") || "[]"
      );

      if (!visitedSteps.includes("step-0")) {
        visitedSteps.push("step-0");
        localStorage.setItem("visitedSteps", JSON.stringify(visitedSteps));
      }
      router.push("/step");
    }, 1000);
  };

  return (
    <PageContainer>
      <Stars />
      <GlowLeft />
      <GlowRight />

      <Cloud />

      {isRevealed && (
        <>
          <MemoryCard
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <DateText>{date}</DateText>
            <MessageText>{message}</MessageText>
          </MemoryCard>

          <Polaroid
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <img src="/zurag5.jpg" alt="The Memory" />
          </Polaroid>

          <HeartParticles>
            <Heart style={{ top: "10%", left: "10%" }}>❤️</Heart>
            <Heart style={{ top: "30%", left: "60%" }}>💖</Heart>
            <Heart style={{ top: "70%", left: "40%" }}>💘</Heart>
          </HeartParticles>

          <NextButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
          >
            Next Memory ➡️
          </NextButton>
        </>
      )}
    </PageContainer>
  );
};

export default Home;
