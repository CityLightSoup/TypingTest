import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export const Home = () => {
  const navigate = useNavigate();

  const handlePractice = () => {
    navigate("/Practice");
  };

  const handleTyping = () => {
    navigate("/Typing", { state: { round: 1} });
  };

  const handleTyping2 = () => {
    navigate("/Typing", { state: { round: 2} });
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Typing</h1>
      <Button variant="contained" onClick={handlePractice}>
        練習
      </Button>
      <Button
        variant="outlined"
        onClick={handleTyping}
        style={{ marginLeft: 20 }}
      >
        本番1
      </Button>
      <Button
        variant="outlined"
        onClick={handleTyping2}
        style={{ marginRight: 20 }}
      >
        本番2
      </Button>
    </div>
  );
};
