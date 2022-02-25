import styled from 'styled-components';
import {useState} from 'react';
import { SubjectItem } from '../items/SubjectItem';
import { SubjectList } from './SubjectList';
import { Report } from './Report';

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
  margin-left: auto;
  margin-right: auto;
  padding: 20px 40px;
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
  height: 80px;
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
  const subjects = [1, 2, 3, 4, 5];
  const [page, setPage] = useState(<SubjectList subjects={subjects}/>);

  return (
    <div>
      <SideBar>
        <SideItem>
          <Icon />
          <div>username</div>
          <h2>pageLink-test</h2>
          <ul>
            <li onClick={() => setPage(<SubjectList subjects={subjects}/>)}>main</li>
            <li onClick={() => setPage(<Report tab='submit'/>)}>submit</li>
            <li onClick={() => setPage(<Report tab='result'/>)}>result</li>
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
          <Title />
          <div>footer</div>
      </MainBodyFotter>
    </div>
  )
}