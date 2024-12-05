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

const StepButton = styled.button<{ visited: boolean; locked: boolean }>`
  background-color: ${({ visited, locked }) =>
    visited ? "#ff6f61" : locked ? "#d3d3d3" : "#ffad99"};
  color: ${({ visited, locked }) =>
    visited ? "white" : locked ? "#888" : "#ff6f61"};
  width: 70px;
  height: 70px;
  border-radius: 50%;
  font-size: 1.5rem;
  font-family: "Cursive", sans-serif;
  border: none;
  cursor: ${({ locked }) => (locked ? "not-allowed" : "pointer")};
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ visited, locked }) =>
      locked ? "#d3d3d3" : visited ? "#ff8a7a" : "#ff7a5c"};
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

  const [visitedSteps, setVisitedSteps] = useState<string[]>([]);

  useEffect(() => {
    const visited = localStorage.getItem("visitedSteps");
    if (visited) {
      setVisitedSteps(JSON.parse(visited));
    }
  }, []);

  const handleStepClick = (stepId: string, stepIndex: number) => {
    if (stepIndex === 0 || visitedSteps.includes(`step-${stepIndex}`)) {
      router.push(`/date/${stepId}`);
    } else {
      alert("Энэ хуудас руу шилжих боломжгүй");
    }
  };

  const markStepVisited = (stepId: string) => {
    if (!visitedSteps.includes(stepId)) {
      const updatedVisited = [...visitedSteps, stepId];
      setVisitedSteps(updatedVisited);
      localStorage.setItem("visitedSteps", JSON.stringify(updatedVisited));
    }
  };

  useEffect(() => {
    const currentPath = window.location.pathname.split("/").pop();
    if (currentPath) {
      markStepVisited(currentPath);
    }
  }, []);

  return (
    <div>
      <Title>Special Dates With You ❤️</Title>
      <StepList>
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("first")}
            locked={false}
            onClick={() => handleStepClick("first", 0)}
          >
            {visitedSteps.includes("first") ? 1 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("second")}
            locked={!visitedSteps.includes("first")}
            onClick={() => handleStepClick("second", 1)}
          >
            {visitedSteps.includes("second") ? 2 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("third")}
            locked={!visitedSteps.includes("second")}
            onClick={() => handleStepClick("third", 2)}
          >
            {visitedSteps.includes("third") ? 3 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("fourth")}
            locked={!visitedSteps.includes("third")}
            onClick={() => handleStepClick("fourth", 3)}
          >
            {visitedSteps.includes("fourth") ? 4 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("fifth")}
            locked={!visitedSteps.includes("fourth")}
            onClick={() => handleStepClick("fifth", 4)}
          >
            {visitedSteps.includes("fifth") ? 5 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("sixth")}
            locked={!visitedSteps.includes("fifth")}
            onClick={() => handleStepClick("sixth", 5)}
          >
            {visitedSteps.includes("sixth") ? 6 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("seventh")}
            locked={!visitedSteps.includes("sixth")}
            onClick={() => handleStepClick("seventh", 6)}
          >
            {visitedSteps.includes("seventh") ? 7 : "🔒"}
          </StepButton>
        </StepContainer>
      </StepList>
    </div>
  );
};

export default Home;
