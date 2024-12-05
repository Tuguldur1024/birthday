"use client";

import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

// Animation for background gradient
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Floating hearts animation
const floatUp = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-200px) scale(0.5); opacity: 0; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #fbc2eb, #a6c1ee, #d4fc79, #96e6a1);
  background-size: 300% 300%;
  animation: ${backgroundAnimation} 10s ease infinite;
  font-family: "Cursive", sans-serif;
  color: #ff6f61;
  padding: 20px;
  overflow: hidden;
  position: relative;
`;

const FloatingHearts = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const Heart = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  color: rgba(255, 105, 135, 0.8);
  animation: ${floatUp} 4s ease-out infinite;
`;

const DateContainer = styled(motion.div)`
  font-size: 4rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  text-align: center;
`;

const StoryBox = styled(motion.div)`
  width: 220px;
  height: 220px;
  background: linear-gradient(135deg, #6a82fb, #fc5c7d);
  border-radius: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const GlowingEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  border-radius: 15px;
  pointer-events: none;
  animation: pulse 2s infinite ease-in-out;

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.7;
    }
  }
`;

const StoryMessage = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
`;

const heartPulse = keyframes`
  0% {
    transform: scale(1);
    color: #ff6f61;
  }
  50% {
    transform: scale(1.3);
    color: #ff3b2f;
  }
  100% {
    transform: scale(1);
    color: #ff6f61;
  }
`;

const HeartIcon = styled(motion.div)`
  font-size: 4rem;
  animation: ${heartPulse} 2s infinite ease-in-out;
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const TypingText = styled(motion.div)<{ textLength: number }>`
  font-size: 2.2rem;
  font-weight: bold;
  color: #2f3640;
  white-space: normal; /* Allow text to wrap */
  word-wrap: break-word; /* Break the word if necessary */
  overflow: hidden;
  border-right: 3px solid #2f3640;
  width: auto; /* Allow width to grow based on content */
  min-width: 100%; /* To maintain the container size at least for one line */
  animation: ${typing} ${({ textLength }) => textLength * 0.1}s
      steps(${({ textLength }) => textLength}, end),
    blink 0.5s step-end infinite;

  @keyframes blink {
    from {
      border-right-color: #2f3640;
    }
    to {
      border-right-color: transparent;
    }
  }
`;

const ImageContainer = styled(motion.div)`
  margin-top: 30px;
  text-align: center;
  max-width: 80%;
`;

const HomeThird = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleClick = () => {
    setIsRevealed(true);
  };

  const message = "She asked me out, and I said YES!";

  return (
    <Container>
      <FloatingHearts>
        {[...Array(10)].map((_, i) => (
          <Heart
            key={i}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [1, 0], y: [-200, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            ❤️
          </Heart>
        ))}
      </FloatingHearts>

      <DateContainer
        initial={{ scale: 0, opacity: 0, y: -50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        2024-02-25
      </DateContainer>

      {!isRevealed ? (
        <StoryBox
          onClick={handleClick}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <GlowingEffect />
          <HeartIcon>❤️</HeartIcon>
        </StoryBox>
      ) : (
        <>
          <StoryMessage
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <TypingText textLength={message.length}>{message}</TypingText>
          </StoryMessage>

          <ImageContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          >
            <motion.img
              src="/zurag3.jpg" // Replace with your image path
              alt="Special Moment"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          </ImageContainer>
        </>
      )}
    </Container>
  );
};

export default HomeThird;
