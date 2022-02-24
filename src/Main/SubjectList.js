import { useState } from "react";
import { SubjectItem } from "../items/SubjectItem";

export const SubjectList = () => {
  const [items, setItems] = useState(['math', 'math']);

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