import { useState } from "react";
import { MainPage } from "./Main/MainPage";
import styled from "styled-components";

const TitleHeader = styled.div`
  position: sticky;
  top: 0;
  box-sizing: border-box;
  background: #ccc;
  height: 50px;
  z-index: 1;
` 

const Title = styled.div`
  position: absolute;
  margin: 5px 10px;
  font-size: 30px;
  font-family: fantasy;
`

function App() {
  const [logined, setLogined] = useState(false);

  return (
    <div>
      <TitleHeader>
        <Title>Analysis-Report</Title>
      </TitleHeader>
      {
        logined === false ? <MainPage /> : <MainPage />
      }
    </div>
  );
}

export default App;
