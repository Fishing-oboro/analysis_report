import { ApiFetch } from "../items/ApiFetch";
import { SubjectItem } from "../items/SubjectItem";

import React from 'react';

export const SubjectList = (props) => {
  const user_id = props.user_id;
  const subjects = ApiFetch(`/db/${user_id}/subject`);

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