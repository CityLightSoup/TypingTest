import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div>No results data.</div>;

  const { totalInputs, correctInputs, elapsedTime, fromPractice } = state;
  const accuracy = totalInputs ? ((correctInputs / totalInputs) * 100).toFixed(2) : 0;
  const timeSeconds = (elapsedTime / 1000).toFixed(2);

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>{fromPractice ? "Practice Results" : "Typing Test Results"}</h1>
      <p>Total Inputs: {totalInputs}</p>
      <p>Correct Inputs: {correctInputs}</p>
      <p>Accuracy: {accuracy}%</p>
      <p>Elapsed Time: {timeSeconds} seconds</p>
      {fromPractice && (
        <Button
          variant="contained"
          onClick={() => navigate("/Countdown")}
          style={{ marginTop: 20 }}
        >
          本番を始める
        </Button>
      )}
      {!fromPractice && (
        <Button variant="contained" onClick={() => navigate("/")}>
          ホームに戻る
        </Button>
      )}
    </div>
  );
};
