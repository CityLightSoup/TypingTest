import { useNavigate, useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Button from '@mui/material/Button'


export const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Ensure state exists before destructuring
  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-inter text-gray-700">
        <h1 className="text-3xl font-bold mb-4">No results data.</h1>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            marginTop: '1.5rem',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            borderRadius: '1rem',
            backgroundColor: '#007BFF',
            color: 'white',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          ホームに戻る
        </Button>
      </div>
    );
  }

  const { totalInputs, correctInputs, elapsedTime, isPractice, round } = state;
  const accuracy = totalInputs ? ((correctInputs / totalInputs) * 100).toFixed(2) : 0;
  const timeSeconds = (elapsedTime / 1000).toFixed(2);

  const handleNextRound = () => {
    if (round < 3) { // Assuming 3 is the max round number
      navigate('/Typing', { state: { round: round + 1 } });
    } else {
      // This case should ideally not be reached if the button is hidden for round 3
      navigate('/');
    }
  };

  const isLastRound = round === 3;
  const showNextRoundButton = !isPractice && round < 3;
  const buttonText = `本番${round + 1}へ進む`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 p-4 font-inter">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-8 drop-shadow-lg">
        {isPractice ? '練習結果' : '本番結果'}
      </h1>
      <div className="bg-white rounded-xl shadow-2xl p-8 space-y-4 text-center w-full max-w-md">
        <p className="text-2xl font-semibold text-gray-700">総入力数: <span className="font-bold text-blue-600">{totalInputs}</span></p>
        <p className="text-2xl font-semibold text-gray-700">正解入力数: <span className="font-bold text-green-600">{correctInputs}</span></p>
        <p className="text-2xl font-semibold text-gray-700">正確性: <span className="font-bold text-purple-600">{accuracy}%</span></p>
        <p className="text-2xl font-semibold text-gray-700">経過時間: <span className="font-bold text-red-600">{timeSeconds}秒</span></p>

        {isPractice ? (
          <Button
            variant="contained"
            onClick={() => navigate('/Typing', { state: { round: 1 } })} // Navigate to Round 1 after practice
            sx={{
              marginTop: '1.5rem',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '1.5rem',
              backgroundColor: '#FF5722', // Orange
              color: 'white',
              '&:hover': {
                backgroundColor: '#E64A19',
              },
            }}
          >
            本番を始める
          </Button>
        ) : (
          <>
            {showNextRoundButton && (
              <Button
                variant="contained"
                onClick={handleNextRound}
                sx={{
                  marginTop: '1.5rem',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  borderRadius: '1.5rem',
                  backgroundColor: '#00C853', // Green
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#00B020',
                  },
                }}
              >
                {buttonText}
              </Button>
            )}
            {(isLastRound || !showNextRoundButton) && ( // Show home button if last round or if not a main round (e.g., direct access)
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{
                  marginTop: '1.5rem',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  borderRadius: '1.5rem',
                  borderColor: '#607D8B', // Grey
                  color: '#607D8B',
                  '&:hover': {
                    backgroundColor: '#ECEFF1',
                    borderColor: '#455A64',
                  },
                }}
              >
                ホームに戻る
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};