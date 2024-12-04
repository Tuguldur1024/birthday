"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 50px;
  font-family: "Cursive", sans-serif;
`;

const DateInfo = styled.p`
  text-align: center;
  font-size: 1.2rem;
  font-family: "Arial", sans-serif;
`;

const DatePage = () => {
  // Get the dynamic date parameter from the URL using useParams()
  const { date } = useParams<{ date: string }>(); // Explicitly define the type here

  const [dateInfo, setDateInfo] = useState<string | null>(null);

  useEffect(() => {
    // Check that `date` is a valid string and is not undefined
    if (!date || typeof date !== "string") return;

    const dateDetails: { [key: string]: string } = {
      "2023-06-01":
        "This was our first date! We went to the park and had a lovely picnic.",
      "2023-08-15":
        "Our first anniversary! We celebrated with a romantic dinner at our favorite restaurant.",
      "2023-12-25":
        "Christmas together was magical! We exchanged gifts and spent quality time with each other.",
    };

    // Ensure `date` is a valid key for dateDetails
    setDateInfo(dateDetails[date] || "Details for this date are coming soon!");
  }, [date]);

  return (
    <div style={{ padding: "20px" }}>
      <Title>{`Special Date: ${date}`}</Title>
      <DateInfo>{dateInfo}</DateInfo>
    </div>
  );
};

export default DatePage;
