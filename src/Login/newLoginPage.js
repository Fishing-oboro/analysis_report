import { MainPage } from "../Main/MainPage";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import React, { useState } from 'react';
import { useEffect } from "react";
import { GraphApi } from "../items/GraphApi";

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
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_AWS_SYNC_GRAPHQL_ENDPOINT,
  aws_appsync_region: process.env.REACT_APP_AWS_SYNC_REGION,
  aws_appsync_authenticationType: process.env.REACT_APP_AWS_SYNC_AUTHENTICATION,
  aws_appsync_apiKey: process.env.REACT_APP_AWS_SYNC_APIKEY
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
//                 <Route path='/*' element={<MainPage user={1} signOut={signOut}/>} />
//                 <Route path='/submit' element={<MainPage tab='submit' />} />
//                 <Route path='/result' element={<MainPage tab='result' />} />
//               </Routes>
//             </BrowserRouter>
//         )}
//       </Authenticator>
//   );
// }

export const LoginPage2 = (props) => {
    const text = 'select * from subject'
    const [data, setData] = useState();

    useEffect(() => {
      GraphApi(text, setData);
    }, [text]);

    // alert(data)
    const func = () => {
      // const data = 
      GraphApi(text, setData);
      alert(data);
      // const jsons = JSON.parse(data);
      // alert(jsons[0]["id"]);
    }

  return (
      <Authenticator>
        {({signOut, user}) => (
            <main>
              <h1>Hello {user.username} {data}</h1>
              {/* {
                data.map((a) => {
                  return <h1>Hello {user.username} {a}</h1>
                })
              } */}
              <button onClick={signOut}>Sign out</button>
              <button onClick={func}>Sign out</button>
            </main>
          )}
      </Authenticator>
  );
}