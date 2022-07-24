import { MainPage } from "../Main/MainPage";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import React from 'react';

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

Amplify.configure({
  aws_project_region: process.env.REACT_APP_AWS_PROJECT_REGION,
  aws_cognito_region: process.env.REACT_APP_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id:  process.env.REACT_APP_AWS_USER_POOLS_CLIENT_ID,
});

// export const LoginPage2 = (props) => {
//   return (
//       <Authenticator>
//         {({signOut, user}) => (
//             <BrowserRouter>
//             <TitleHeader>
//               <Title>Analysis-Report</Title>
//               <HeaderIcon />
//             </TitleHeader>
//               <Routes>
//                 <Route path='/*' element={<MainPage user={user.name}/>} />
//                 <Route path='/submit' element={<MainPage tab='submit' />} />
//                 <Route path='/result' element={<MainPage tab='result' />} />
//               </Routes>
//             </BrowserRouter>
//         )}
//       </Authenticator>
//   );
// }

export const LoginPage2 = (props) => {
  //export default function App() {
  return (
      <Authenticator>
        {({signOut, user}) => (
            <main>
              <h1>Hello {user.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
        )}
      </Authenticator>
  );
}