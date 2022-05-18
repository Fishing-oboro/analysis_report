import { useEffect, useState } from "react";
import { ApiFetch } from "../items/ApiFetch";
import { SubjectItem } from "../items/SubjectItem";

export const SubjectList = (props) => {
  const user_id = props.user_id;
  const subjects = ApiFetch(`/${user_id}/subject`);

  return(
    <div>
      {
      subjects.map((subject, index) => {
        return <SubjectItem subject={subject}/>
      })
      }
    </div>
  )
}