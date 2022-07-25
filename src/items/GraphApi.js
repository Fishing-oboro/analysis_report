import { useEffect, useState } from "react";

import { Amplify, API, graphqlOperation } from "aws-amplify";

import { queryRds } from "../graphql/queries";

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

export const GraphApi = async (text) => {
  const [result, setResult] = useState();
  // useEffect(() => {
  //   fetchapi();
  // }, [text])

  const fetchapi = async () => {
    try{
      // const res = 
      await API.graphql(graphqlOperation(queryRds, { query: text }))
      .then((event) => {
        const rdsdata = event.data.queryRds;
        setResult(rdsdata)
      });
      // const rdsdata = res.data.queryRds;
      // setResult(rdsdata);
    }catch(err){
      console.log("error");
    }
  }

  await fetchapi();

  return  result;

  

  // return API.graphql(graphqlOperation(queryRds, { query: text }))
  //                       .then((event) => {
  //                           const result = event.data.queryRds;
  //                           setResult(rdsdata)
  //                           return JSON.parse(result);
  //                       });
}