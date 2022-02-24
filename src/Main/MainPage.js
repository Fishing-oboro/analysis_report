import styled from 'styled-components';
import {useState} from 'react';
import { SubjectItem } from '../items/SubjectItem';
import { SubjectList } from './SubjectList';
import { Report } from './Report';



const SideBar = styled.div`
  box-sizing: border-box;
  top: 50px;
  height: 100%;
  width: 220px;
  position: fixed;
  overflow: auto;
  background: #eee;
  padding: 20px;
`

const SideItem = styled.div`
  position: sticky;
  margin-bottom: 0;
  top: 10px;
  z-index: 1;
`

const MainBody = styled.div`
  box-sizing: border-box;
  margin-left: 220px;
  padding: 20px 40px;
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

export const MainPage = () => {
  const [page, setPage] = useState(<SubjectList />);

  return (
    <div>
      <SideBar>
        <SideItem>
          <h2>pageLink-test</h2>
          <ul>
            <li onClick={() => setPage(<SubjectList />)}>main</li>
            <li onClick={() => setPage(<Report tab='submit'/>)}>submit</li>
            <li onClick={() => setPage(<Report tab='result'/>)}>result</li>
            <li onClick={() => setPage(<Report tab='info'/>)}>info</li>
          </ul>
        </SideItem>
      </SideBar>
      <MainBody>
        <Title text='Mainpage' />
        {page}
      </MainBody>
    </div>
  )
}