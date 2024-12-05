"use client";

import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatUp = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-200px) scale(0.5); opacity: 0; }
`;

const LoveEmojiContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const LoveEmoji = styled.div`
  position: absolute;
  animation: ${floatUp} 4s ease-out forwards;
  font-size: 2.5rem;
  will-change: transform;
`;

const getRandomEmoji = () => {
  const emojis = ["💖", "💘", "💕", "❤️", "💗", "💓"];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const generateRandomPosition = () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 2}s`,
});

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
  padding-top: 50px;
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

interface ImageContainerProps {
  show: boolean;
}

const ImageContainer = styled.div<ImageContainerProps>`
  margin-top: 30px;
  text-align: center;
  max-width: 80%;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const TextExplanation = styled(motion.div)`
  font-size: 1.6rem;
  color: #333;
  line-height: 1.8;
  margin-top: 20px;
  max-width: 600px;
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
  const date = "2022-01-18";
  const message =
    "Энэ өдөр чамтай хамгийн анх удаа уулзаж байсан. Танилцаад удчихсан хүмүүс шиг л удаан ярьж билээ. Зөндөө таалагдсан";

  const [typedMessage, setTypedMessage] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showTextExplanation, setShowTextExplanation] = useState(false);
  const [fadeOutText, setFadeOutText] = useState(false);
  const [loveEmojis, setLoveEmojis] = useState<any[]>([]);

  const router = useRouter();

  const handleNext = () => {
    setFadeOutText(true);
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
          setFadeOutText(true);
          setShowImage(true);
          setShowTextExplanation(true);

          const emojiArray = Array.from({ length: 20 }, () =>
            generateRandomPosition()
          );
          setLoveEmojis(emojiArray);
        }, 3000);
      }
    }, 100);

    return () => clearInterval(messageTyping);
  }, [message]);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessageBox(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <LoveEmojiContainer>
        {loveEmojis.map((pos, index) => (
          <LoveEmoji
            key={index}
            style={{
              top: pos.top,
              left: pos.left,
              animationDelay: pos.animationDelay,
            }}
          >
            {getRandomEmoji()}
          </LoveEmoji>
        ))}
      </LoveEmojiContainer>

      <DateContainer
        initial={{ scale: 0, opacity: 0, y: -50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {date}
      </DateContainer>

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

      {fadeOutText && (
        <EventContainer
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ display: "none" }}
        >
          <Heart>❤️</Heart>
          <TypingText>{typedMessage}</TypingText>
        </EventContainer>
      )}

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

      {showTextExplanation && (
        <TextExplanation
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Хамгийн анх энэ зурагнаас чамайг олж хараад царайлаг охин байсан байна
          даа гэж дараа нь бодсон
        </TextExplanation>
      )}

      {showImage && (
        <NextButton
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
        >
          Proceed to Next Step
        </NextButton>
      )}
    </Container>
  );
};

export default Home;
