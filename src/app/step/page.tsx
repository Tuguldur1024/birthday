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
    if (!localStorage.getItem("visitedSteps")) {
      localStorage.setItem("visitedSteps", JSON.stringify([]));
    }
    const visited = localStorage.getItem("visitedSteps");
    setVisitedSteps(JSON.parse(visited || "[]"));
  }, []);

  const handleStepClick = (stepId: string, stepIndex: number) => {
    if (stepIndex === 0 || visitedSteps.includes(`step-${stepIndex - 1}`)) {
      router.push(`/date/${stepId}`);
      markStepVisited(`step-${stepIndex}`);
    } else {
      alert("Энэ хуудас руу шилжих боломжгүй");
    }
  };

  const markStepVisited = (stepId: string) => {
    setVisitedSteps((prevVisited) => {
      if (!prevVisited.includes(stepId)) {
        const updatedVisited = [...prevVisited, stepId];
        localStorage.setItem("visitedSteps", JSON.stringify(updatedVisited));
        return updatedVisited;
      }
      return prevVisited;
    });
  };

  useEffect(() => {
    const currentPath = window.location.pathname.split("/").pop();
    if (currentPath) {
      markStepVisited(currentPath);
    }
  }, []);

  if (visitedSteps.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Title>Special Dates With You ❤️</Title>
      <StepList>
        {/* Step 0 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("step-0")}
            locked={false}
            onClick={() => handleStepClick("first", 0)}
          >
            {visitedSteps.includes("step-0") ? 1 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        {/* Step 1 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("step-1")}
            locked={!visitedSteps.includes("step-0")}
            onClick={() => handleStepClick("second", 1)}
          >
            {visitedSteps.includes("step-1") ? 2 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        {/* Step 2 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("step-2")}
            locked={!visitedSteps.includes("step-1")}
            onClick={() => handleStepClick("third", 2)}
          >
            {visitedSteps.includes("step-2") ? 3 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        {/* Step 3 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("step-3")}
            locked={!visitedSteps.includes("step-2")}
            onClick={() => handleStepClick("fourth", 3)}
          >
            {visitedSteps.includes("step-3") ? 4 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        {/* Step 4 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("step-4")}
            locked={!visitedSteps.includes("step-3")}
            onClick={() => handleStepClick("fifth", 4)}
          >
            {visitedSteps.includes("step-4") ? 5 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        {/* Step 5 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("step-5")}
            locked={!visitedSteps.includes("step-4")}
            onClick={() => handleStepClick("sixth", 5)}
          >
            {visitedSteps.includes("step-5") ? 6 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        {/* Step 6 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("step-6")}
            locked={!visitedSteps.includes("step-5")}
            onClick={() => handleStepClick("seventh", 6)}
          >
            {visitedSteps.includes("step-6") ? 7 : "🔒"}
          </StepButton>
        </StepContainer>
      </StepList>
    </div>
  );
};

export default Home;
