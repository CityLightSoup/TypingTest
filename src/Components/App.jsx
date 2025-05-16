import { Routes, Route } from "react-router-dom";
import { Typing } from "./Typing";
import { Home } from "./Home";
import { Practice } from "./Practice";
import { Countdown } from "./Countdown";
import { Results } from "./Results";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Typing" element={<Typing />} />
            <Route path="Results" element={<Results />} />
            <Route path="Countdown" element={<Countdown />} />
            <Route path="Practice" element={<Practice />} />
        </Routes>
    )
}