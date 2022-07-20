import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Detail } from "../items/Detail"
import {PolarAngleAxis, PolarGrid, PolarRadiusAxis,
   RadarChart, Radar} from 'recharts'
import { ApiFetch } from "../items/ApiFetch"
import { useNavigate, useParams } from "react-router-dom"
// import axios from "axios"

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
  font-size: 16px;
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

const getData = (user_id, report_id) => {
  const scores =  ApiFetch(`/${user_id}/${report_id}/data`);
  return scores[0].json_text;
}

export const Report = (props) => {
  const tab = props.tab;
  const user_id = props.user_id;
  const report_id = props.report_id;
  const user_reports = ApiFetch(`${user_id}/${report_id}/data`);
  const [page, setPage] = useState();

  useEffect(() => {
    const pages = {
      'submit': <Submit user_reports={user_reports}/>,
      'result': <Result user_reports={user_reports}/>,
    };
    setPage(pages[tab]);
    }, [tab]);

  return (
    <div>
      <Detail text='exp Report Contents' />
      {
        page
      }
    </div>
  )
}

const Submit = (props) => {
  const [text, setText] = useState('Please write Report');
  const navigation = useNavigate();

  const submit = () => {
    // fastapiに送信＋値をRDSに保存
    
    // const uri = "http://localhost:8000/"
    navigation(`/tsurube/result`);
  
    // return <Navigate to='/login'/>
    // axios
    //   .post(uri, {"text": text})
    //   .then(res => {this.setState({
  
    //   })})
  }

  return (
      <Body>
        <form onSubmit={submit}>
          <ReportArea value={text} onChange={(e) => setText(e.target.value)}></ReportArea>
          <br></br>
          <FormButton type='submit'>submit ok</FormButton>
        </form>
        <button type='button' onClick={submit}>button</button>
      </Body>
  )
}

const Result = (props) => {
  // const user_id = props.user_id;
  // const report_id = props.report_id;
  const user_reports = props.user_reports
  const data = [
    {subject: '文長-妥当性', A: 120, fullMark: 150},
    {subject: '語彙力', A: 98, fullMark: 150},
    {subject: '文体-統一性', A: 86, fullMark: 150},
    {subject: '冗長性', A: 99, fullMark: 150},
    {subject: '主述-妥当性', A: 85, fullMark: 150},
    {subject: '構文-妥当性', A: 65, fullMark: 150},
  ];
  const maxScore = 10;
  const yourScore = 7;
  
  return  user_reports.map((user_report, index) => {
      return(
        <Body>
      <div>{JSON.stringify(user_report['json_text']['score'])}</div>
      <h3>- Your Report</h3>
      <hr></hr>
      <h4>・Your Score = [ {yourScore} / {maxScore} ]</h4>
      <p>report context</p>
      <p></p>
      <h3>- Result Chart</h3>
      <hr></hr>
      <RadarChart 
        cx={400}  // 要素の左端とチャートの中心点との距離(0にするとチャートの左半分が隠れる)
        cy={200}  // 要素の上部とチャートの中心点との距離(0にするとチャートの上半分が隠れる)
        outerRadius={150}  // レーダーチャート全体の大きさ  
        width={800}  // レーダーチャートが記載される幅(この幅よりチャートが大きい場合、はみ出た箇所は表示されない)
        height={400}   // レーダーチャートが記載される高さ
        data={data}  // 表示対象のデータ
      >
        <PolarGrid />
        <PolarAngleAxis dataKey='subject' />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar
                    dataKey="A"   // 表示する値と対応するdata内のキー
                    stroke="#8884d8"  // レーダーの外枠の色
                    fill="#8884d8"  // レーダー内の色
                    fillOpacity={0.6}  // レーダー内の色の濃さ(1にすると濃さMAX)
        />
      </RadarChart>
    <Info/>
    </Body>
      )
    })

  // return user_report[0]['json_text'] === undefined ? <div>nodata</div> : (
  // return (
  //   <Body>
  //     <div>{JSON.stringify(user_report[0])}</div>
  //     <h3>- Your Report</h3>
  //     <hr></hr>
  //     <h4>・Your Score = [ {yourScore} / {maxScore} ]</h4>
  //     <p>report context</p>
  //     <p></p>
  //     <h3>- Result Chart</h3>
  //     <hr></hr>
  //     <RadarChart 
  //       cx={400}  // 要素の左端とチャートの中心点との距離(0にするとチャートの左半分が隠れる)
  //       cy={200}  // 要素の上部とチャートの中心点との距離(0にするとチャートの上半分が隠れる)
  //       outerRadius={150}  // レーダーチャート全体の大きさ  
  //       width={800}  // レーダーチャートが記載される幅(この幅よりチャートが大きい場合、はみ出た箇所は表示されない)
  //       height={400}   // レーダーチャートが記載される高さ
  //       data={data}  // 表示対象のデータ
  //     >
  //       <PolarGrid />
  //       <PolarAngleAxis dataKey='subject' />
  //       <PolarRadiusAxis angle={30} domain={[0, 150]} />
  //       <Radar
  //                   dataKey="A"   // 表示する値と対応するdata内のキー
  //                   stroke="#8884d8"  // レーダーの外枠の色
  //                   fill="#8884d8"  // レーダー内の色
  //                   fillOpacity={0.6}  // レーダー内の色の濃さ(1にすると濃さMAX)
  //       />
  //     </RadarChart>
  //   <Info/>
  //   </Body>
  // )
}

const Info = (props) => {
  const [datas, setDatas] = useState([
    {dName: '文字数', num: '10', exp: '=', ref: '-'},
    {dName: '平均文長', num: '10', exp: '=', ref: '文長-妥当性'},
    {dName: '漢字使用率', num: '10', exp: '=', ref: '語彙力'},
    {dName: '誤字脱字数', num: '10', exp: '=', ref: '語彙力'},
    {dName: '使用単語数', num: '10', exp: '=', ref: '語彙力'},
    {dName: '文末統一率', num: '10', exp: '=', ref: '文体-統一性'},
    {dName: '重複表現数', num: '10', exp: '=', ref: '冗長性'},
    {dName: '係り助詞平均数', num: '10', exp: '=', ref: '主述-妥当性'},
    {dName: '係り受け平均距離', num: '10', exp: '=', ref: '構文-妥当性'},
  ]); 

  return (
    <Body>
      <h3>- Info Table</h3>
      <hr></hr>
      <InfoTable>
        <tr>
          <InfoTh>Name</InfoTh>
            <InfoTd>Score</InfoTd>
            <InfoTd>Reference</InfoTd>
            <InfoTd>Explain</InfoTd>
        </tr>
      {
        datas.map((data, index) => {
          return (
          <tr>
            <InfoTh>{data.dName}</InfoTh>
            <InfoTd>{data.num}</InfoTd>
            <InfoTd>{data.ref}</InfoTd>
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