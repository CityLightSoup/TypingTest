import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export const Home = () => {
  const navigate = useNavigate();

  const handlePractice = () => {
    navigate("/Practice");
  };

  const handleTyping = (roundNum) => {
    navigate("/Typing", { state: { round: roundNum } });
  };

  // const handleTyping2 = () => {
  //   navigate("/Typing", { state: { round: 2} });
  // };

  // const handleTyping3 = () => {
  //   navigate("/Typing", { state: { round: 3} });
  // };

  // const handleTyping4 = () => {
  //   navigate("/Typing", { state: { round: 4} });
  // };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Typing</h1>
      <Button variant="contained" onClick={handlePractice}>
        練習
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleTyping(1)}
        style={{ marginLeft: 20 }}
      >
        本番1
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleTyping(2)}
        // style={{ marginRight: 20 }}
      >
        本番2
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleTyping(3)}
        // style={{ marginRight: 20 }}
      >
        本番3
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleTyping(4)}
        style={{ marginRight: 20 }}
      >
        本番4
      </Button>
    </div>
  );
};
