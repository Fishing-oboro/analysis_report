import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ApiFetch } from "./ApiFetch";

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

const SubTitle = styled(Title)`
  font-size: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ReportFooter = styled.div`
  font-size: 15px;
  position: absolute;
  bottom: 0;
  right: 0;
`

const ReportContainer = styled.ul`
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
`

const Report = styled.li`
  border-radius: 10px;
  display: inline-block;
  width: 200px;
  height: 50px;
  border: 3px solid gray;
  margin: 10px;
  cursor: pointer;
  position: relative;
`

export const SubjectItem = (props) => {
  const user_id = props.user_id;
  const subject = props.subject;
  const reports = ApiFetch(`/db/${subject['id']}/report`);

  const navigate = useNavigate();

  return (
    <SubjectContainer>
      <Title>{subject['name']}</Title>
      <ReportContainer>
      {
        reports.map((report, index) => {
          return (
            <Report onClick={() => navigate(`/submit?user_id=${user_id}&report_id=${report['id']}`)}>
                <SubTitle>{report['name']}</SubTitle>
                <ReportFooter>~ 2022/10/22</ReportFooter>
            </Report>
          )
        })
      }
      </ReportContainer>
    </SubjectContainer>
  )
}