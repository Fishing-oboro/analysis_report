import { useState } from "react";
import { MainPage } from "./Main/MainPage";
import styled from "styled-components";
import { LoginPage } from "./Login/LoginPage";
import { BrowserRouter, Route, Routes , Navigate} from 'react-router-dom';
import { CreateAccount } from "./Login/CreateAccount";
import { Forgot } from "./Login/Forgot";

import React from 'react';
import { LoginPage2 } from "./Login/newLoginPage";

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
  // const [logined, setLogined] = useState(false);
  // const [user, setUser] = useState(null);

  return (
    <LoginPage2/>
    // <BrowserRouter>
    //   <TitleHeader>
    //     <Title>Analysis-Report</Title>
    //     <HeaderIcon />
    //   </TitleHeader>
    //   {
    //     logined === true ? 
    //     <Routes>
    //       <Route path='/*' element={<MainPage user={user}/>} />
    //       <Route path='/submit' element={<MainPage tab='submit' />} />
    //       <Route path='/result' element={<MainPage tab='result' />} />
    //       <Route path="/login" element={<LoginPage func={setLogined} user={setUser}/>} />
    //     </Routes>
    //    : <LoginPage func={setLogined} user={setUser}/>
    //   }
    // </BrowserRouter>
  )
}

export default Apptest;
