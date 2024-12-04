"use client";

import { useState } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb);
  color: #fff;
  text-align: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-family: "Cursive", sans-serif;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Button = styled(motion.button)`
  margin-top: 2rem;
  padding: 15px 25px;
  font-size: 1.2rem;
  font-family: "Cursive", sans-serif;
  background: #ff6f61;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #ff8a7a;
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 10px 18px;
    font-size: 0.9rem;
  }
`;

const Heart = styled.div`
  margin-top: 2rem;
  font-size: 2rem;
  animation: pulse 1.2s infinite;

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

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export default function Home() {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleClick = () => {
    if (!showMessage) {
      setShowMessage(true);
      setTimeout(() => {
        setShowNextButton(true);
      }, 2000);
    } else {
      alert("On to the next step!");
    }
  };
  const handleClickNext = () => {
    router.push("/step");
  };

  return (
    <HeroSection>
      <Title>Welcome to a Special Day! 🎉</Title>
      {!showMessage ? (
        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
        >
          Click to Reveal
        </Button>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Heart>❤️ Love You ❤️</Heart>
          {showNextButton && (
            <Button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClickNext}
            >
              On To The Next Step
            </Button>
          )}
        </div>
      )}
    </HeroSection>
  );
}
