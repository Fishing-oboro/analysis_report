import { ApiFetch } from "../items/ApiFetch";
import { SubjectItem } from "../items/SubjectItem";

import  { Amplify, API, graphqlOperation} from "aws-amplify"
import { queryRds } from "../graphql/queries";

import React, { useEffect, useState } from 'react';
import { GraphApi } from "../items/GraphApi";

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

export const SubjectList = (props) => {
  const user_id = props.user_id;
  // const subjects = ApiFetch(`/db/${user_id}/subject`);
  // const [subjects, setSubject] = useState("");

  //GraphQL get
  const text = `select * from subject where id in (select subject_id from user_subject where user_id=${user_id} );`
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
  //               query: `select * from subject where id in (select subject_id from user_subject where user_id=${user_id} );`
  //     }))
  //     .then((evt) => {
  //     setSubject(JSON.parse(evt.data.queryRds));
  // })

  return(
    <div>
      {
      jsons.map((subject, index) => {
        return <SubjectItem subject={subject} user_id={user_id}/>
      })
      }
    </div>
  )
}