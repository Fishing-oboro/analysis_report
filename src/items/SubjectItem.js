import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ApiFetch } from "./ApiFetch";

import { Amplify, API, graphqlOperation} from "aws-amplify"
import { queryRds } from "../graphql/queries";

import React from 'react';
import { GraphApi } from "./GraphApi";

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

export const SubjectItem = (props) => {
  const user_id = props.user_id;
  const subject = props.subject;
  // const reports = ApiFetch(`/db/${subject['id']}/report`);
  // const [reports, setReports] = useState([]);

  //GraphQL get
  const text = `select * from report where subject_id=${subject["id"]};`
  const [data, setData] = useState();
  const [jsons, setJsons] = useState([]);

  useEffect(() => {
      GraphApi(text, setData);
      if(data !== undefined){
        // const tmp = JSON.stringify(data);
        // setJsons(JSON.parse(tmp));
        setJsons(JSON.parse(data));
      }
  }, [text]);

  useEffect(() => {
        if(data !== undefined){
          // const tmp = JSON.stringify(data);
          // setJsons(JSON.parse(tmp));
          setJsons(JSON.parse(data));
        }
  }, [data]);

  // API.graphql(graphqlOperation(queryRds, {
  //               query: `select * from report where subject_id=${subject["id"]};`
  //     }))
  //     .then((evt) => {
  //       setReports(JSON.parse(evt.data.queryRds));
  // });

  const navigate = useNavigate();

  return (
    <SubjectContainer>
      <Title>{subject["name"]}</Title>
      <ReportContainer>
      {
        jsons.map((report, index) => {
          return (
            <Report onClick={() => navigate(`/submit?user_id=${user_id}&report_id=${report["id"]}`)}>
                <SubTitle>{report["name"]}</SubTitle>
                <ReportFooter>~ 2022/10/22</ReportFooter>
            </Report>
          )
        })
      }
      </ReportContainer>
    </SubjectContainer>
  )
}