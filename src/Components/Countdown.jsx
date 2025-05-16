import { useEffect, useState } from "react";

export const Countdown = ({ startCount = 3, onComplete }) => {
  const [count, setCount] = useState(startCount);
  
  useEffect(() => {
    if (count === 0) {
      if (typeof onComplete === "function") onComplete();
      return;
    }
    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onComplete]);
  

  return (
    <div style={{ fontSize: 48, textAlign: "center", marginTop: 100 }}>
      {count === 0 ? "Start!" : count}
    </div>
  );
};
