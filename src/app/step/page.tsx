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

  // Load visited steps from local storage
  const [visitedSteps, setVisitedSteps] = useState<string[]>([]);

  useEffect(() => {
    const visited = localStorage.getItem("visitedSteps");
    if (visited) {
      setVisitedSteps(JSON.parse(visited));
    }
  }, []);

  // Define the 7 steps
  const steps = [
    { id: "first", label: "First Date" },
    { id: "second", label: "Our Anniversary" },
    { id: "third", label: "Christmas Together" },
    { id: "fourth", label: "First Trip Together" },
    { id: "fifth", label: "Graduation Celebration" },
    { id: "sixth", label: "Engagement" },
    { id: "seventh", label: "Wedding Day" },
  ];

  // Function to handle button click
  const handleStepClick = (stepId: string) => {
    if (!visitedSteps.includes(stepId)) {
      const updatedVisited = [...visitedSteps, stepId];
      setVisitedSteps(updatedVisited);
      localStorage.setItem("visitedSteps", JSON.stringify(updatedVisited));
    }
    router.push(`/date/${stepId}`);
  };

  return (
    <div>
      <Title>Special Dates With You ❤️</Title>
      <StepList>
        {/* Step 1 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("first")}
            locked={false}
            onClick={() => handleStepClick("first")}
          >
            {visitedSteps.includes("first") ? 1 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        {/* Step 2 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("second")}
            locked={visitedSteps.length < 1}
            onClick={() => handleStepClick("second")}
          >
            {visitedSteps.includes("second") ? 2 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        {/* Step 3 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("third")}
            locked={visitedSteps.length < 2}
            onClick={() => handleStepClick("third")}
          >
            {visitedSteps.includes("third") ? 3 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        {/* Step 4 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("fourth")}
            locked={visitedSteps.length < 3}
            onClick={() => handleStepClick("fourth")}
          >
            {visitedSteps.includes("fourth") ? 4 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        {/* Step 5 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("fifth")}
            locked={visitedSteps.length < 4}
            onClick={() => handleStepClick("fifth")}
          >
            {visitedSteps.includes("fifth") ? 5 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        {/* Step 6 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("sixth")}
            locked={visitedSteps.length < 5}
            onClick={() => handleStepClick("sixth")}
          >
            {visitedSteps.includes("sixth") ? 6 : "🔒"}
          </StepButton>
          <ArrowDown>↓</ArrowDown>
        </StepContainer>

        {/* Step 7 */}
        <StepContainer>
          <StepButton
            visited={visitedSteps.includes("seventh")}
            locked={visitedSteps.length < 6}
            onClick={() => handleStepClick("seventh")}
          >
            {visitedSteps.includes("seventh") ? 7 : "🔒"}
          </StepButton>
        </StepContainer>
      </StepList>
    </div>
  );
};

export default Home;
