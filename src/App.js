import { createContext, useContext, useState } from "react";
import { MainPage } from "./Main/MainPage";
import styled from "styled-components";
import { LoginPage } from "./Login/LoginPage";
import { BrowserRouter, Route, Routes , Navigate } from 'react-router-dom';
import { CreateAccount } from "./Login/CreateAccount";
import { Forgot } from "./Login/Forgot";

const TitleHeader = styled.div`
  position: fixed;
  overflow: auto;
  top: 0;
  box-sizing: border-box;
  background: #ccc;
  height: 50px;
  width: 100%;
  z-index: 1;
` 

const HeaderIcon = styled.div`
  position: absolute;
  top: 4px;
  right: 20px;
  width: 35px;
  height: 35px;
  border-radius: 40px;
  border: 2px solid gray;
  background-color: white;
  cursor: pointer;
`

const Title = styled.div`
  position: absolute;
  margin: 5px 10px;
  font-size: 30px;
  font-family: fantasy;
  cursor: pointer;
`

export const App = () => {
  const [logined, setLogined] = useState(false);

  return (
    <div>
      <TitleHeader>
        <Title>Analysis-Report</Title>
        <HeaderIcon />
      </TitleHeader>
      {
        logined === false ? <MainPage /> : <MainPage />
      }
      
    </div>
  );
}

export const Apptest = () => {
  const [user, setUser] = useState(null);
  const [logined, setLogined] = useState(true);
  return (
    <BrowserRouter>
      <TitleHeader>
        <Title>Analysis-Report</Title>
        <HeaderIcon />
      </TitleHeader>
      <Routes>
        <Route path="/Home" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage func={setLogined}/>} />
        <Route path="/forgot" element={<CreateAccount/>} />
        <Route path="/create-account" element={<Forgot/>} />
        <Route path='/:user/main' element={logined === true ? <MainPage user={user}/> : <Navigate to='/login'/>} />
        <Route path='*' element={<div>Notfound</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Apptest;
