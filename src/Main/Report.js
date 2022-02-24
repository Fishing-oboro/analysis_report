import { useEffect, useState } from "react"
import styled from "styled-components"
import { Detail } from "../items/Detail"
import {PolarAngleAxis, PolarGrid, PolarRadiusAxis,
   RadarChart, Radar} from 'recharts'

const Body = styled.div`
  position: relative;
`

const ReportArea = styled.textarea`
  font-size: 18px;
  font-family: mintyo;
  realize: none;
  width: 500px;
  height: 800px;
`

const FormButton = styled.button`
  left: 0;
  bottom: 0;
`

const InfoTable = styled.table`
  width: 100%;
  border-spacing: 0;
  font-size: 18px;
  background-color: #ddd;
`

const InfoTh = styled.th`
  border-bottom: solid 2px #ccc;
  padding: 10px 0;
`

const InfoTd = styled.td`
  border-bottom: solid 2px #ccc;
  text-align: center;
  padding: 10px 0;
`

const submit = () => {

}

export const Report = (props) => {
  const tab = props.tab;
  const [page, setPage] = useState();

  useEffect(() => {
    const pages = {
      'info': <Info />,
      'result': <Result/>,
      'submit': <Submit />,
    };
    
    setPage(pages[tab]);
  }, [tab])

  return (
    <div>
      <Detail text='exp Report Contents' />
      {page}
    </div>
  )
}

const Submit = () => {
  const [text, setText] = useState('Please write Report');

  return (
      <Body>
        <form onSubmit={submit}>
          <ReportArea value={text} onChange={(e) => setText(e.target.value)}></ReportArea>
          <br></br>
          <FormButton>submit ok</FormButton>
        </form>
      </Body>
  )
}

const Result = (props) => {
  const data = [
    {subject: '数学', A: 120, B: 110, fullMark: 150},
    {subject: '中国語', A: 98, B: 130, fullMark: 150},
    {subject: '英語', A: 86, B: 130, fullMark: 150},
    {subject: '地理', A: 99, B: 100, fullMark: 150},
    {subject: '化学', A: 85, B: 90, fullMark: 150},
    {subject: '歴史', A: 65, B: 85, fullMark: 150},
  ];

  return (
    <Body>
      <h3>- Your Report</h3>
      <hr></hr>
      <p>report context</p>
      <h3>- Result Chart</h3>
      <hr></hr>
      <RadarChart 
        cx={200}  // 要素の左端とチャートの中心点との距離(0にするとチャートの左半分が隠れる)
        cy={200}  // 要素の上部とチャートの中心点との距離(0にするとチャートの上半分が隠れる)
        outerRadius={150}  // レーダーチャート全体の大きさ  
        width={400}  // レーダーチャートが記載される幅(この幅よりチャートが大きい場合、はみ出た箇所は表示されない)
        height={400}   // レーダーチャートが記載される高さ
        data={data}  // 表示対象のデータ
      >
        <PolarGrid />
        <PolarAngleAxis dataKey='subject' />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar 
                    name="Aさん"  // そのチャートが誰のデータか指定(チャート下にここで指定した値が表示される)
                    dataKey="A"   // 表示する値と対応するdata内のキー
                    stroke="#8884d8"  // レーダーの外枠の色
                    fill="#8884d8"  // レーダー内の色
                    fillOpacity={0.6}  // レーダー内の色の濃さ(1にすると濃さMAX)
                />
                {/* ２個目のレーダー */}
                <Radar name="Bさん" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
      </RadarChart>
    <Info/>
    </Body>
  )
}

const Info = () => {
  const [datas, setDatas] = useState([
    {dName: '1', num: '10', exp: '='},
    {dName: '1', num: '10', exp: '='},
    {dName: '1', num: '10', exp: '='},
  ]); 

  return (
    <Body>
      <h3>- Info Table</h3>
      <hr></hr>
      <InfoTable>
        <tr>
          <InfoTh>Name</InfoTh>
            <InfoTd>Number</InfoTd>
            <InfoTd>Explain</InfoTd>
        </tr>
      {
        datas.map((data, index) => {
          return (
          <tr>
            <InfoTh>{data.dName}</InfoTh>
            <InfoTd>{data.num}</InfoTd>
            <InfoTd>{data.exp}</InfoTd>
          </tr>
        )
        })
      }
      </InfoTable>
      <br></br>
      <h3>- Teacher's Comment</h3>
      <hr></hr>
      <p>Comment</p>
    </Body>
  )
}