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

const floatHeart = keyframes`
  0% { transform: scale(1) translateY(0); opacity: 1; }
  50% { transform: scale(1.2) translateY(-30px); opacity: 0.7; }
  100% { transform: scale(1) translateY(-60px); opacity: 0; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const EventContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 30px 40px;
  border-radius: 15px;
  text-align: center;
  max-width: 600px;
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

const Heart = styled.div`
  font-size: 4rem;
  color: #ff6f61;
  margin-bottom: 20px;
  animation: ${floatHeart} 3s ease-in-out infinite;
`;

const NextButton = styled(motion.button)`
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
  const date: string = "2024-03-03";
  const message =
    "  Day that we go to our first date, It was cool experience. Everything that followed turned out to be even more wonderful.";

  const [typedMessage, setTypedMessage] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    let currentIndex = 0;

    const messageTyping = setInterval(() => {
      if (currentIndex < message.length) {
        setTypedMessage((prev) => prev + message.charAt(currentIndex));
        currentIndex++;
      } else {
        clearInterval(messageTyping);
        setShowNextButton(true); // Show the "Next Memory" button after message is fully typed
      }
    }, 100);

    return () => clearInterval(messageTyping);
  }, [message]);

  const router = useRouter();
  const handleNext = () => {
    setTimeout(() => {
      const visitedSteps = JSON.parse(
        localStorage.getItem("visitedSteps") || "[]"
      );

      if (!visitedSteps.includes("step-3")) {
        visitedSteps.push("step-3");
        localStorage.setItem("visitedSteps", JSON.stringify(visitedSteps));
      }
      router.push("/step");
    }, 1000);
  };

  return (
    <Container>
      <DateContainer
        initial={{ scale: 0, opacity: 0, y: -50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {date}
      </DateContainer>

      <EventContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Heart>💖</Heart>
        <TypingText>{typedMessage}</TypingText>
      </EventContainer>

      {showNextButton && (
        <NextButton
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
        >
          Onto The Next Memory
        </NextButton>
      )}
    </Container>
  );
};

export default Home;
