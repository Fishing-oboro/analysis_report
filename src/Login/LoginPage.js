import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { ApiFetch } from "../items/ApiFetch"
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
//import {configure} from "../AwsConfigure";
import '@aws-amplify/ui-react/styles.css';

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

Amplify.configure({
  aws_project_region: "ap-northeast-1",
  aws_cognito_region: "ap-northeast-1",
  aws_user_pools_id: "ap-northeast-1_yOQXB3zp8",
  aws_user_pools_web_client_id:  "3lb96a7jafm1gu1mngqgjj04cd",
});
export const LoginPage = (props) => {
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
//}


// const navigate = useNavigate();
// const setLogined = props.func;
// const [userValue, setUserValue] = useState('tsurube');
// const [passValue, setPassValue] = useState('pass');
// const userReq = userValue.match('/./') ? 'email' : `user_name`;
//
// //無限アクセス保留
// const userdata = ApiFetch(`/user?${userReq}=${userValue}&pass=${passValue}`);
//
// const submit = (e) => {
//   e.preventDefault();
//   // const userdata = ApiFetch(`/user?${userReq}=${userValue}&pass=${passValue}`);
//   setLogined(true);
//   navigate(`/${userdata[0]['id']}/main`);
// }
//
// return (
//     <LoginContainer>
//       <FormContainer>
//         <LoginHeader>
//           {/* <Icon></Icon> */}
//           <h2>Login</h2>
//         </LoginHeader>
//         <LoginBody>
//           <br></br>
//           <LoginForm>
//             <div>Your Email/userName</div>
//             <input type='text' value={userValue} onChange={(e) => setUserValue(e.target.value)}></input>
//             <br></br>
//             <div>Your password</div>
//             <input type='password' value={passValue} onChange={(e) => setPassValue(e.target.value)}></input>
//             <br></br>
//             <button onClick={submit}>logined</button>
//           </LoginForm>
//           <br></br>
//
//           <div style={{display: 'flex'}}>
//             <Link to='/create-account'>Create Account</Link>
//             &nbsp;or&nbsp;
//             <Link to='/forgot'>Forgot PassWord</Link>
//           </div>
//           <br></br>
//         </LoginBody>
//       </FormContainer>
//     </LoginContainer>
// )
