"use client";

import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Main Section Style
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

// Title Style
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

// Button Style
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

// Heart Style
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

// Password Input Style
const PasswordInput = styled.input`
  margin-top: 2rem;
  padding: 10px;
  font-size: 1rem;
  font-family: "Cursive", sans-serif;
  border: 2px solid #ff6f61;
  border-radius: 5px;
  text-align: center;
  background-color: #333; /* Black background */
  color: white; /* White text */

  &:focus {
    outline: none;
    border-color: #ff8a7a;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.8rem;
  }
`;

// Error Message Style
const ErrorMessage = styled.div`
  color: red;
  font-size: 1rem;
  margin-top: 1rem;
`;

// Main component
export default function Home() {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false); // New state to track password submission

  const handleClick = () => {
    if (!showMessage) {
      setShowMessage(true);
      setTimeout(() => {
        setShowNextButton(true);
      }, 1000);
    } else {
      alert("On to the next step!");
    }
  };

  const handleClickNext = () => {
    router.push("/step");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    setPasswordSubmitted(true); // Mark password as submitted
    if (password === "Jagaanaa") {
      setIsPasswordCorrect(true);
    } else {
      setIsPasswordCorrect(false);
    }
  };

  return (
    <HeroSection>
      <Title>Welcome to a Special Day! 🎉</Title>

      {/* Password Section */}
      {!isPasswordCorrect && (
        <div>
          <PasswordInput
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
          {/* Show error only after submit */}
          {passwordSubmitted && !isPasswordCorrect && password && (
            <ErrorMessage>Incorrect password. Try again!</ErrorMessage>
          )}
        </div>
      )}

      {/* Only show the message and button after the password is correct */}
      {isPasswordCorrect && !showMessage && (
        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
        >
          Click to Reveal
        </Button>
      )}

      {showMessage && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Heart>❤️I Love You So Much❤️</Heart>
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
