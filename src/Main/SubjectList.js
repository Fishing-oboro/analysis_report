import { ApiFetch } from "../items/ApiFetch";
import { SubjectItem } from "../items/SubjectItem";

import Amplify, { API, graphqlOperation} from "aws-amplify"
import awsconfig from "../aws-exports"
import { queryRds } from "../graphql/queries";

import React, { useState } from 'react';

export const SubjectList = (props) => {
  const user_id = props.user_id;
  // const subjects = ApiFetch(`/db/${user_id}/subject`);
  const [subjects, setSubject] = useState();
  API.graphql(graphqlOperation(queryRds, {
                query: `select * from subject where id in (select subject_id from user_subject where user_id=${user_id} );`
      }))
      .then((evt) => {
      setSubject(evt.data.queryRds);
  })

  return(
    <div>
      {
      subjects.map((subject, index) => {
        return <SubjectItem subject={subject} user_id={user_id}/>
      })
      }
    </div>
  )
}