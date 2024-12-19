import { Routes, Route } from "react-router-dom";
import { Typing } from "./Typing";
import { Home } from "./Home";
import { Results } from "./Results";
import { Stopwatch } from "./Stopwatch";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Typing" element={<Typing />} />
            <Route path="Results" element={<Results />} />
            <Route path="Stopwatch" element={<Stopwatch />} />
        </Routes>
    )
}