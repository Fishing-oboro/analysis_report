import { useState } from "react";
import styled from "styled-components";

const SubjectContainer = styled.div`
  border-radius: 10px;
  border: 3px solid gray;
  margin: 5px 0;
`

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  justify-content: space-between;
  padding: 0 32px 0;
  border-bottom: 1px solid #E0E0E0;
`

const ReportContainer = styled.div`
  display: flex;
`

const Report = styled.div`
  border-radius: 10px;
  border: 3px solid gray;
  margin: 10px;
`

export const SubjectItem = (props) => {
  const title = props.title;
  const [reports, setReports] = useState(['math1', 'math2']); 

  // props.titleを参照し、reportを取得
  
  return (
    <SubjectContainer>
      <Title>{title}</Title>
      <ReportContainer>
      {
        reports.map((report, index) => {
          return <Report>{report}</Report>
        })
      }
      </ReportContainer>
    </SubjectContainer>
  )
}