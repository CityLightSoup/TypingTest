import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Home'
import { Typing } from './Typing'
import { Results } from './Results'


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Typing" element={<Typing />} />
        <Route path="/Practice" element={<Typing />} /> {/* Assuming practice uses the same Typing component */}
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}