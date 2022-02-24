import styled from "styled-components";

const Body = styled.div`

`

export const Detail = (props) => {
  const context = props.text;
  return (
    <Body>
      <p>{context}</p>
      <hr></hr>
    </Body>
  )
}