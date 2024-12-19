import { useNavigate } from "react-router-dom"


export const Home = () => {
    const navigate = useNavigate();
    const handleTyping = () => {
        navigate('/Typing');
    }

    return (
        <>
            <h1>HOME</h1>
            <button onClick={handleTyping}>to Typing</button>
        </>
    )
}