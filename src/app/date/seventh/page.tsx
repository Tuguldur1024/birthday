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

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;

const heartBounce = keyframes`
  0% { transform: scale(0.8); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0.6; }
`;

const glowEffect = keyframes`
  0% { box-shadow: 0 0 10px rgba(255, 105, 180, 0.5); }
  50% { box-shadow: 0 0 30px rgba(255, 105, 180, 1); }
  100% { box-shadow: 0 0 10px rgba(255, 105, 180, 0.5); }
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
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 2s ease-out;
  animation-delay: 1s;
`;

const MessageContainer = styled(motion.div)`
  font-size: 2rem;
  color: #ff6f61;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 2s ease-out;
  animation-delay: 1.5s;
`;

const FinalMessage = styled(motion.div)`
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  text-align: center;
  animation: ${squeezeText} 3s ease-out forwards;
  margin: 20px 0;
  animation-delay: 2s;
`;

const FloatingHeart = styled(motion.div)`
  position: absolute;
  font-size: 2.5rem;
  color: #ff6f61;
  animation: ${heartBounce} 3s ease-out infinite;
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
  animation: ${glowEffect} 2s infinite ease-in-out;

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

  const date = "2024-12-06"; // Special date

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
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
        Final Step...
      </MessageContainer>

      {isRevealed && (
        <>
          <FinalMessage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Our journey together has been incredible so far. 💕
            <br />
            But this is just the beginning of something even more beautiful.
            <br />
            Please be at UI Lounge at 7 PM tonight. Lets make another
            unforgettable memory.
          </FinalMessage>

          <FloatingHeart
            style={{
              top: "20%",
              left: "25%",
              animationDelay: "0s",
            }}
          >
            💖
          </FloatingHeart>

          <FloatingHeart
            style={{
              top: "60%",
              left: "50%",
              animationDelay: "2s",
            }}
          >
            💘
          </FloatingHeart>

          <FloatingHeart
            style={{
              top: "80%",
              left: "10%",
              animationDelay: "3s",
            }}
          >
            💓
          </FloatingHeart>

          <FinalMessage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <a
              href="https://www.google.com/maps/place/UI+Lounge+%26+Restaurant/@47.9033317,106.926932,17z/data=!4m14!1m7!3m6!1s0x5d969345025e10fd:0xf0340fd97ca54a44!2sUI+Lounge+%26+Restaurant!8m2!3d47.9033317!4d106.9295069!16s%2Fg%2F11pzjwpp2n!3m5!1s0x5d969345025e10fd:0xf0340fd97ca54a44!8m2!3d47.9033317!4d106.9295069!16s%2Fg%2F11pzjwpp2n?entry=ttu&g_ep=EgoyMDI0MTIwMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ff6f61", textDecoration: "underline" }}
            >
              Here is the location on Google Maps.
            </a>
          </FinalMessage>

          <NextButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            onClick={handleNext}
          >
            End of the Journey
          </NextButton>
        </>
      )}
    </Container>
  );
};

export default Home;
