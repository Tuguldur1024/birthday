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

// Animation for the "box opening" effect
const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const glowText = keyframes`
  0% {
    text-shadow: 0 0 10px rgba(255, 105, 180, 0.8), 0 0 20px rgba(255, 105, 180, 0.6);
  }
  50% {
    text-shadow: 0 0 30px rgba(255, 105, 180, 1), 0 0 60px rgba(255, 105, 180, 0.8);
  }
  100% {
    text-shadow: 0 0 10px rgba(255, 105, 180, 0.8), 0 0 20px rgba(255, 105, 180, 0.6);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #8fd3f4);
  background-size: 300% 300%;
  animation: ${backgroundAnimation} 10s ease infinite;
  font-family: "Cursive", sans-serif;
  color: #ff6f61;
  padding: 20px;
  overflow: hidden;
`;

const DateContainer = styled(motion.div)`
  font-size: 4rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  text-align: center;
`;

const PresentWrapper = styled(motion.div)`
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #ff6f61, #ff9a9e);
  border-radius: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease;
  animation: ${bounce} 2s infinite ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:after,
  &:before {
    content: "";
    position: absolute;
    background: white;
    transform: scale(1);
    border-radius: 5px;
  }

  &:before {
    width: 20px;
    height: 100%;
  }

  &:after {
    width: 100%;
    height: 20px;
  }
`;

const RibbonBow = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const MessageBox = styled(motion.div)`
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
`;

const Heart = styled(motion.div)`
  font-size: 4rem;
  color: #ff6f61;
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  animation: pulse 2s infinite ease-in-out;
`;

const GlowingEffect = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  border-radius: 50%;
  animation: pulse 2s infinite ease-in-out;
`;

// Add typing for props in ImageContainer
interface ImageContainerProps {
  show: boolean;
}

const ImageContainer = styled.div<ImageContainerProps>`
  margin-top: 30px;
  text-align: center;
  max-width: 80%;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const YouLookBeautiful = styled(motion.div)`
  font-size: 2rem;
  font-weight: bold;
  color: #ff6f61;
  margin-top: 20px;
  animation: ${glowText} 2s ease-in-out infinite;
`;

const HomeSecond = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showImageAndText, setShowImageAndText] = useState(false); // New state to control image and text visibility

  const handleClick = () => {
    setIsRevealed(true);
    setTimeout(() => setShowImageAndText(true), 1500); // Delay image and text display after the message
  };

  const message =
    "Бид энэ өдөр өөрсдийгөө нэг нэгэндээ анх удаа танилцуулж билээ.";

  return (
    <Container>
      <DateContainer
        initial={{ scale: 0, opacity: 0, y: -50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        2023-04-28
      </DateContainer>

      {/* Add Glowing effect around the box when clicked */}
      {!isRevealed ? (
        <PresentWrapper
          onClick={handleClick}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <RibbonBow
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <Heart></Heart>
          <GlowingEffect
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </PresentWrapper>
      ) : (
        <MessageBox
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {message}
        </MessageBox>
      )}

      {/* Image and "You look beautiful" text */}
      {showImageAndText && (
        <>
          <ImageContainer show={true}>
            <motion.img
              src="/zurag1.jpg"
              alt="First Meeting"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </ImageContainer>

          <YouLookBeautiful
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            You look beautiful!
          </YouLookBeautiful>
        </>
      )}
    </Container>
  );
};

export default HomeSecond;
