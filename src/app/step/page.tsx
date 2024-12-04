"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  margin-top: 50px;
  align-items: center;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepButton = styled.button<{ visited: boolean }>`
  background-color: ${({ visited }) => (visited ? "#ff6f61" : "#ffad99")};
  color: ${({ visited }) => (visited ? "white" : "#ff6f61")};
  width: 70px;
  height: 70px;
  border-radius: 50%;
  font-size: 1.5rem;
  font-family: "Cursive", sans-serif;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ visited }) => (visited ? "#ff8a7a" : "#ff7a5c")};
  }

  &:focus {
    outline: none;
  }
`;

const ArrowDown = styled.div`
  font-size: 2rem;
  color: #ff6f61;
  margin: 10px 0;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 50px;
  font-family: "Cursive", sans-serif;
`;

const Home = () => {
  const router = useRouter();

  // Load visited steps from local storage
  const [visitedSteps, setVisitedSteps] = useState<string[]>([]);

  useEffect(() => {
    const visited = localStorage.getItem("visitedSteps");
    if (visited) {
      setVisitedSteps(JSON.parse(visited));
    }
  }, []);

  // Array of date steps
  const steps = [
    { date: "2023-06-01", label: "First Date" },
    { date: "2023-08-15", label: "Our Anniversary" },
    { date: "2023-12-25", label: "Christmas Together" },
  ];

  // Function to handle button click
  const handleStepClick = (date: string) => {
    if (!visitedSteps.includes(date)) {
      const updatedVisited = [...visitedSteps, date];
      setVisitedSteps(updatedVisited);
      localStorage.setItem("visitedSteps", JSON.stringify(updatedVisited));
    }
    router.push(`/date/${date}`);
  };

  return (
    <div>
      <Title>Special Dates With You ❤️</Title>
      <StepList>
        {steps.map((step, index) => (
          <StepContainer key={step.date}>
            <StepButton
              visited={visitedSteps.includes(step.date)}
              onClick={() => handleStepClick(step.date)}
            >
              {index + 1}
            </StepButton>
            {index < steps.length - 1 && <ArrowDown>↓</ArrowDown>}
          </StepContainer>
        ))}
      </StepList>
    </div>
  );
};

export default Home;
