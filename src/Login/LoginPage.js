import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { ApiFetch } from "../items/ApiFetch"

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import React from 'react';

const Icon = styled.div`
  display: block;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  width: 60px;
  height: 60px;
  border-radius: 40px;
  border: 3px solid gray;
  background-color: white;
`

const LoginContainer = styled.div`
  box-sizing: border-box;
  padding: 20px 40px;
  position: fixed;
  top: 50px;
  height: 100%;
  width: 100%;
  overflow: auto;
  background: #eee;
`

const LoginHeader = styled.div`
  text-align: center;
  color: white;
  background: #bbb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LoginBody = styled.div`
  display: flex;
  font-family: cursive;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

const LoginForm = styled.form`
  display: flex;
  flex-flow: column;
`

const FormContainer = styled.div`
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
  background: white;
  
  border: 2px solid gray;
`

export const LoginPage = (props) => {
  const navigate = useNavigate();
  const setLogined = props.func;
  const [userValue, setUserValue] = useState('tsurube');
  const [passValue, setPassValue] = useState('pass');
  


  const submit = (props) => {
    // e.preventDefault();
    const username = props.userValue;
    const userpass = props.passValue;
    
    const userReq = userValue.match('/./') ? 'email' : `user_name`;
    // const userdata = ApiFetch(`/user?${userReq}=${userValue}&pass=${passValue}`);

    // if (userdata === true){
    //   setLogined(true);
    // }

    setLogined(true);
    // navigate(`/${userdata[0]['id']}/main`);
    navigate(`/main?user_id=1`);
  }

  return (
    <LoginContainer>
      <FormContainer>
        <LoginHeader>
          {/* <Icon></Icon> */}
          <h2>Login</h2>
        </LoginHeader>
        <LoginBody>
          <br></br>
          <LoginForm>
            <div>Your Email/userName</div>
            <input type='text' value={userValue} onChange={(e) => setUserValue(e.target.value)}></input>
            <br></br>
            <div>Your password</div>
            <input type='password' value={passValue} onChange={(e) => setPassValue(e.target.value)}></input>
            <br></br>
            <button onClick={() => submit(userValue, passValue)}>logined</button>
          </LoginForm>
          <br></br>
          
          <div style={{display: 'flex' }}>
            <Link to='/create-account'>Create Account</Link>
            &nbsp;or&nbsp;
            <Link to='/forgot'>Forgot PassWord</Link>
          </div>
          <br></br>
        </LoginBody>
      </FormContainer>
    </LoginContainer>
  )
}

// Amplify.configure({
//   aws_project_region: process.env.REACT_APP_AWS_COGNITO_REGION,
//   aws_cognito_region: process.env.REACT_APP_AWS_USER_POOLS_ID,
//   aws_user_pools_id: process.env.REACT_APP_AWS_PROJECT_REGION,
//   aws_user_pools_web_client_id:  process.env.REACT_APP_AWS_USER_POOLS_CLIENT_ID,
// });

