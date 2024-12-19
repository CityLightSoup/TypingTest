import { useLocation, useNavigate } from "react-router-dom"

export const Results = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    }
    const location = useLocation();
    const { totalInputs, correctInputs } = location.state || {};

    return (
        <>
            <h1>Results</h1>
            <p>totalInputs : {totalInputs}</p>
            <p>correctInputs : {correctInputs}</p>
            <p>accuracy : {Math.round((correctInputs / totalInputs) * 1000)/10}%</p>
            <button onClick={handleHome}>to Home</button>
        </>

    )
}