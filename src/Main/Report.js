import { useEffect, useState } from "react"
import styled from "styled-components"
import { Detail } from "../items/Detail"

const Body = styled.div`
  position: center;
`

const submit = () => {

}

export const Report = (props) => {
  const tab = props.tab;
  const [page, setPage] = useState(
    tab === 'submit' ? <Submit /> : <Result />
  );

  useEffect(() => {
    switch(tab){
      case 'info':
        setPage(<Info />);
        break;
      case 'result':
        setPage(<Result/>);
        break;
      default:
        setPage(<Submit />);
    }
  })

  return (
    <div>
      <Detail text='reportの送信用ページです' />
      {
        page
      }
    </div>
  )
}

const Submit = () => {
  const [text, setText] = useState('');

  return (
      <Body>
        <form onSubmit={submit}>
          <textarea value={text} onChange={(e) => setText(e.target.text)}></textarea>
          <button>送信</button>
        </form>
      </Body>
  )
}

const Result = () => {
  return (
    <Body>
      result
    </Body>
  )
}

const Info = () => {
  return (
    <Body>
      info
    </Body>
  )
}