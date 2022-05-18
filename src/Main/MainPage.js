import styled from 'styled-components';
import {useEffect, useState} from 'react';
import { SubjectItem } from '../items/SubjectItem';
import { SubjectList } from './SubjectList';
import { Report } from './Report';
import { Link } from 'react-router-dom';

const Icon = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  height: 100px;
  border-radius: 40px;
  border: 3px solid gray;
  background-color: white;
  cursor: pointer;
`

const SideBar = styled.div`
  box-sizing: border-box;
  top: 50px;
  height: 100%;
  width: 220px;
  position: fixed;
  overflow: auto;
  background: #eee;
  padding: 20px;
  z-index: 1;
`

const SideItem = styled.div`
  position: sticky;
  margin-bottom: 0;
  top: 10px;
`

const MainBody = styled.div`
  top: 0;
  left: 40px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 40px;
  min-height: 100vh;
  width: 800px;
  background-color: white;
`

const MainBodyContainer = styled.div`
  box-sizing: border-box;
  margin-left: 220px;
  padding: 20px 40px;
  position: relative;
`

const MainBodyFotter = styled.footer`
  bottom: 0;
  right: 0;
  height: 80px;
  overflow: auto;
  box-sizing: border-box;
  margin-left: 220px;
  background-color: #ccc;
`

const Title = (props) => {
  const text = props.text;

  return (
    <div>
    <h2>{text}</h2>
    <hr></hr>
    </div>
  )
}

export const MainPage = (props) => {
  const user = props.user;
  const user_id = 1;
  const report_id = 1;
  const [page, setPage] = useState(<SubjectList user_id={user_id}/>);

  useEffect(() => {
    setPage(<SubjectList user_id={user_id}/>)
  }, [user_id])

  

  return (
    <div>
      <SideBar>
        <SideItem>
          <Icon />
          <div>username</div>
          <h2>pageLink-test</h2>
          <ul>
            <li onClick={() => setPage(<SubjectList user_id={user_id}/>)}>main</li>
            <li onClick={() => setPage(<Report tab='submit' user_id={user_id} report_id={report_id}/>)}>submit</li>
            <li onClick={() => setPage(<Report tab='result' user_id={user_id} report_id={report_id}/>)}>result</li>
            <li><Link to='/login'>login</Link></li>
          </ul>
        </SideItem>
      </SideBar>
      <MainBodyContainer>
        <MainBody>
        <Title text='show Current PageName' />
        {page}
        </MainBody>
      </MainBodyContainer>
      <MainBodyFotter>
        <div>footer</div>
      </MainBodyFotter>
    </div>
  )
}