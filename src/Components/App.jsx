import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Home } from "./Home";
import { Typing } from "./Typing";
import { Practice } from "./Practice";
import { Results } from "./Results";
import { Wating } from "./Wating";

import rawCsvData from "../constants/typingStrings.csv";
import { parse } from "csv-parse/browser/esm";
import { useEffect } from "react";

export default function App() {
  // const [typingStrings1, setTypingStrings1] = useState([]);
  // const [typingStrings2, setTypingStrings2] = useState([]);
  // const [typingStrings3, setTypingStrings3] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   // rawCsvData は既に文字列としてインポートされているので、
  //   // ここで再度読み込む必要はありません。
  //   // そのため、try-catchブロック内で直接 parse を呼び出します。
  //   try {
  //     // parse関数は非同期でコールバックを受け取る形式
  //     parse(
  //       rawCsvData,
  //       {
  //         // rawCsvDataは既に文字列
  //         delimiter: ",",
  //         from_line: 1,
  //         relax_column_count: true,
  //       },
  //       (err, records) => {
  //         // ★非同期コールバック形式
  //         if (err) {
  //           console.error("CSV parse error:", err);
  //           setError("Failed to parse CSV data locally.");
  //           setIsLoading(false);
  //           return;
  //         }

  //         const tempStrings1 = [];
  //         const tempStrings2 = [];
  //         const tempStrings3 = [];

  //         records.forEach((record) => {
  //           const index = parseInt(record[0], 10);
  //           const text = record[1];

  //           switch (index) {
  //             case 1:
  //               tempStrings1.push(text);
  //               break;
  //             case 2:
  //               tempStrings2.push(text);
  //               break;
  //             case 3:
  //               tempStrings3.push(text);
  //               break;
  //             default:
  //               console.warn(`Unknown index: ${index} for text: "${text}"`);
  //           }
  //         });

  //         setTypingStrings1(tempStrings1);
  //         setTypingStrings2(tempStrings2);
  //         setTypingStrings3(tempStrings3);
  //         setIsLoading(false); // パース完了
  //       }
  //     );
  //   } catch (err) {
  //     // parse自体は非同期でエラーをコールバックで処理するため、
  //     // ここでのcatchはparseの呼び出し自体が失敗した場合のみ。
  //     // 基本的には上のerrハンドリングで十分。
  //     console.error("Initial error during CSV parsing setup:", err);
  //     setError("An unexpected error occurred during CSV setup.");
  //     setIsLoading(false);
  //   }
  // }, []); // コンポーネントのマウント時に一度だけ実行

  // if (isLoading) {
  //   return <div>Loading application data...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Typing" element={<Typing />} />
        <Route path="/Practice" element={<Practice />} />{" "}
        {/* Assuming practice uses the same Typing component */}
        <Route path="/results" element={<Results />} />
        <Route path="/Wating" element={<Wating />} />
      </Routes>
    </Router>
  );
}
