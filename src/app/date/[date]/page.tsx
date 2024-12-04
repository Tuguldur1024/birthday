"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const DatePage = () => {
  // Using useParams to get the dynamic params
  const { date } = useParams();

  const [dateInfo, setDateInfo] = useState<string | null>(null);

  useEffect(() => {
    const dateDetails: { [key: string]: string } = {
      "2023-06-01":
        "This was our first date! We went to the park and had a lovely picnic.",
      "2023-08-15":
        "Our first anniversary! We celebrated with a romantic dinner at our favorite restaurant.",
      "2023-12-25":
        "Christmas together was magical! We exchanged gifts and spent quality time with each other.",
    };

    setDateInfo(dateDetails[date] || "Details for this date are coming soon!");
  }, [date]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{`Special Date: ${date}`}</h1>
      <p>{dateInfo}</p>
    </div>
  );
};

export default DatePage;
