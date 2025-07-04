import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Home'
import { Typing } from './Typing'
import { Practice } from './Practice'
import { Results } from './Results'
import { Wating } from './Wating'


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Typing" element={<Typing />} />
        <Route path="/Practice" element={<Practice />} /> {/* Assuming practice uses the same Typing component */}
        <Route path="/results" element={<Results />} />
        <Route path="/Wating" element={<Wating />} />
      </Routes>
    </Router>
  );
}