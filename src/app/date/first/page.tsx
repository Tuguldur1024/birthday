"use client";

import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Confetti from "react-confetti"; // Import the Confetti library

// Background Animation
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align items to the top */
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #8fd3f4);
  background-size: 300% 300%;
  animation: ${backgroundAnimation} 10s ease infinite;
  font-family: "Cursive", sans-serif;
  color: #ff6f61;
  padding-top: 50px; /* Space from the top */
  padding: 20px; /* Added padding to the container */
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

const EventContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 30px 40px;
  border-radius: 15px;
  text-align: center;
  max-width: 500px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const TypingText = styled.span`
  display: inline-block;
  font-size: 1.8rem;
  color: #333;
  line-height: 1.8;
  margin: 0;
`;

const Heart = styled(motion.div)`
  font-size: 4rem;
  color: #ff6f61;
  margin-bottom: 20px;

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

// Properly typed ImageContainer component to accept 'show' prop without errors
interface ImageContainerProps {
  show: boolean;
}

const ImageContainer = styled.div<ImageContainerProps>`
  margin-top: 30px;
  text-align: center;
  max-width: 80%;
  display: ${(props) =>
    props.show ? "block" : "none"}; // Show or hide based on 'show' prop
`;

const TextExplanation = styled(motion.div)`
  font-size: 1.6rem;
  color: #333;
  line-height: 1.8;
  margin-top: 20px;
  max-width: 600px;
`;

const NextButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff3b2f;
  }
`;

const Home = () => {
  const date = "2022-01-18";
  const message =
    "On this day, we met for the first time and talked about school and life.";

  const [typedMessage, setTypedMessage] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showTextExplanation, setShowTextExplanation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOutText, setFadeOutText] = useState(false);

  useEffect(() => {
    let currentIndex = 0;

    const messageTyping = setInterval(() => {
      if (currentIndex < message.length) {
        const nextChar = message.charAt(currentIndex);
        setTypedMessage((prev) => prev + nextChar);
        currentIndex++;
      } else {
        clearInterval(messageTyping);
        setTimeout(() => {
          setFadeOutText(true); // Trigger text fade-out after typing is complete
          setShowImage(true); // Show the image
          setShowTextExplanation(true); // Show the explanation text
          setShowConfetti(true); // Trigger confetti after typing is complete
        }, 3000); // Wait for 3 seconds before transitioning
      }
    }, 100); // Typing speed

    return () => clearInterval(messageTyping);
  }, [message]);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessageBox(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      {/* Display the date with animation */}
      <DateContainer
        initial={{ scale: 0, opacity: 0, y: -50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {date}
      </DateContainer>

      {/* Confetti effect */}
      {showConfetti && <Confetti />}

      {/* Show the message box with typing animation */}
      {showMessageBox && !fadeOutText && (
        <EventContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Heart>❤️</Heart>
          <TypingText>{typedMessage}</TypingText>
        </EventContainer>
      )}

      {/* Wait for 3 seconds, then fade out the message and show the image */}
      {fadeOutText && (
        <EventContainer
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ display: "none" }} // This hides the faded text completely after it fades out
        >
          <Heart>❤️</Heart>
          <TypingText>{typedMessage}</TypingText>
        </EventContainer>
      )}

      {/* Show the image related to the event */}
      <ImageContainer show={showImage}>
        <img
          src="/zurag1.jpg"
          alt="First Meeting"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </ImageContainer>

      {/* Show the explanation text with animation */}
      {showTextExplanation && (
        <TextExplanation
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          This was the first photo I saw of her. It was a beautiful moment.
        </TextExplanation>
      )}

      {/* Next button */}
      {showImage && (
        <NextButton
          onClick={() => {
            alert("Proceeding to the next step!");
          }}
        >
          Proceed to Next Step
        </NextButton>
      )}
    </Container>
  );
};

export default Home;
