import { useState } from "react";
import { SubjectItem } from "../items/SubjectItem";

export const SubjectList = (props) => {
  const userSubjects = props.subjects;
  const [items, setItems] = useState(userSubjects);

  return(
    <div>
      {
      items.map((item, index) => {
        return <SubjectItem title={item}/>
      })
      }
    </div>
  )
}