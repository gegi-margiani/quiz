import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledColor = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.color};
`;

function App() {
  const [data, setData] = useState(null);
  const [score, setScore] = useState(0);
  const [currColor, setCurrColor] = useState(null);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    axios.get("https://random-colors-lovat.vercel.app/").then((res) => {
      setData(res.data);
      setCurrColor({ color: res.data[0], index: 0 });
    });
  }, []);

  const handleClick = () => {
    if (btnRef.current && currColor.index + 1 < data.length) {
      if (btnRef.current.innerText === currColor.color.color) {
        setScore(score + 1);
      }
      setCurrColor({
        color: data[currColor.index + 1],
        index: currColor.index + 1,
      });
    } else {
      setIsGameFinished(true);
    }
  };

  const restartGame = (e) => {
    axios.get("https://random-colors-lovat.vercel.app/").then((res) => {
      setData(res.data);
      setCurrColor({ color: res.data[0], index: 0 });
      setScore(0);
      setIsGameFinished(false);
    });
  };

  return (
    <>
      {currColor && !isGameFinished ? (
        <>
          <StyledColor color={currColor.color.color}></StyledColor>
          <div>
            {currColor.color.answers.map((answer, i) => {
              return (
                <button onClick={handleClick} ref={btnRef} key={i}>
                  {answer}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div>
          <div>
            {score}/{data && data.length}
          </div>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </>
  );
}

export default App;
