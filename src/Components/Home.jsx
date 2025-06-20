import Button from '@mui/material/Button'
import { useNavigate, useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const handlePractice = () => {
    navigate('/Practice');
  };

  const handleTyping = (roundNum) => {
    navigate('/Typing', { state: { round: roundNum } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 font-inter">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-8 drop-shadow-lg">
        Typing Master
      </h1>
      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <Button
          variant="contained"
          onClick={handlePractice}
          sx={{
            padding: '1rem 2rem',
            fontSize: '1.25rem',
            borderRadius: '1.5rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
            },
            transition: 'all 0.2s ease-in-out',
            backgroundColor: '#4CAF50', // Green
            color: 'white',
          }}
        >
          練習
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleTyping(1)}
          sx={{
            padding: '1rem 2rem',
            fontSize: '1.25rem',
            borderRadius: '1.5rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease-in-out',
            borderColor: '#2196F3', // Blue
            color: '#2196F3',
            '&:hover': { // Combined hover styles
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
              backgroundColor: '#E3F2FD', // Light blue hover
              borderColor: '#1976D2',
            },
          }}
        >
          本番1
        </Button>
      </div>
    </div>
  );
};