import { useLocation, useNavigate } from "react-router-dom"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from '@mui/material/Button';

const Font = css({
    fontFamily: "Arial"
})

const Title = css({
    textAlign: "center",
    margin: "24px"
})

const Body = css({
    textAlign: "center",
    margin: "24px"
})

export const Results = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    }
    const location = useLocation();
    const { totalInputs, correctInputs, elapsedTime } = location.state || {};

    return (
        <>
            <h1 css={Title}>Results</h1>
            <div css={Body}>
                <p>totalInputs : {totalInputs}</p>
                <p>correctInputs : {correctInputs}</p>
                <p>accuracy : {Math.round((correctInputs / totalInputs) * 1000) / 10}%</p>
                <p>
                    Time : {" "}
                    {Math.floor(elapsedTime / 600000)}:
                    {Math.floor((elapsedTime % 600000) / 1000).toString().padStart(2, "0")}:
                    {Math.floor((elapsedTime % 1000) / 10).toString().padStart(2, "0")}
                </p>
                <Button variant="outlined" onClick={handleHome}>to Home</Button>
            </div>

        </>

    )
}