import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Typing = () => {
    const targetStrings = ["apple", "banana", "orange"]; //入力させる文字列
    const [target, setTarget] = useState(targetStrings[0]); //今入力する文字列
    const [targetIndex, setTargetIndex] = useState(0); //今入力する文字列をtargetStringsから指定するための数値
    const [correctWordsIndex, setCorrectWordsIndex] = useState(0); //入力があっていた文字数
    const [countTyping, setCountTyping] = useState(0); //入力回数
    const [countCorectTyping, setCountCorrectTyping] = useState(0); //正しく入力した回数
    const [correct, setCorrect] = useState(true); //入力した文字が合っているかどうか
    //react-router-dom
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    }

    //targetStringsに格納した文字列をすべて入力し終えたらResultsに遷移。それまではtargetに次の文字列をセットする
    useEffect(() => {
        if (targetStrings.length > targetIndex) {
            setTarget(targetStrings[targetIndex]);
        } else { //総タイプ数と正しいタイプ数をリザルト画面に送る（あとは時間）
            navigate('/Results', {state: {totalInputs: countTyping, correctInputs: countCorectTyping}});
        }
    }, [targetIndex, targetStrings, navigate]);

    // const Typing = (event) => {
    //     //押された回数をカウント
    //     setCountTyping(countTyping + 1);
    //     const key = event.key;
    //     console.log("----------\n if the input is correct? : " + correct);
    //     console.log("a current correct word is : " + target[correctWordsIndex]);
    //     console.log("the index of correct words : " + correctWordsIndex + "\n----------");
    //     //押したキーが正しかったらCorrectWodsIndexを+1する
    //     if (target[correctWordsIndex] === key) {
    //         setCorrectWordsIndex(correctWordsIndex + 1);
    //         setCountCorrectTyping(countCorectTyping + 1);
    //         setCorrect(true);
    //     } else { //押したキーが間違っていたとき
    //         setCorrect(false);
    //     }
    //     //すべて入力されたら次の文字列にする
    //     if (target.length - 1 === correctWordsIndex) {
    //         setTargetIndex(targetIndex + 1);
    //         console.log(targetIndex);
    //         setCorrectWordsIndex(0);
    //     }
    // };

    const Typing = (event) => {
        const key = event.key;
        console.log("----------\n if the input is correct? : " + correct);
        console.log("a current correct word is : " + target[correctWordsIndex]);
        console.log("the index of correct words : " + correctWordsIndex + "\n----------");
    
        //タイプ数のカウント
        setCountTyping((prev) => prev + 1);
    
        //押されたキーが正しかったらindexを1増やす
        if (target[correctWordsIndex] === key) {
            setCorrectWordsIndex((prev) => prev + 1);
            setCountCorrectTyping((prev) => prev + 1);
            setCorrect(true);
        } else {
            setCorrect(false);
        }
    
        //すべて入力されたら次の文字列にする
        if (correctWordsIndex + 1 === target.length && target[correctWordsIndex] === key) {
            setTargetIndex((prev) => prev + 1);
            setCorrectWordsIndex(0); //新しい文字列に切り替えるのでリセット
        }
    };

    return (
        <>
            <div tabIndex={0} onKeyDown={Typing}>
                <h1>Typing</h1>
                <div style={{borderWidth:"5px", borderStyle:"solid", borderColor: correct ? "white" : "red"}}>
                    {target && target.split("").map((char, index) => (//targetがundefineでないことを確認
                        <span
                            key={index}
                            style={{ color: correctWordsIndex > index ? "gray" : "blue" }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            </div>
            <button onClick={handleHome}>to Home</button>
        </>
    );
};
