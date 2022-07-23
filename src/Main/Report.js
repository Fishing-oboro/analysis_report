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
  const user_reports = ApiFetch(`/db/${user_id}/${report_id}/data`);
  const [page, setPage] = useState();

  useEffect(() => {
    const pages = {
      'submit': <Submit user_id={user_id} report_id={report_id}/>,
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
  const user_id = props.user_id;
  const report_id = props.report_id;
  const [text, setText] = useState('Please write Report.');
  const navigation = useNavigate();

  const submit = async (user_id, report_id, text) => {
    // fastapiに送信＋値をRDSに保存

    const getapi = (text) => {
      return fetch(`/api/texts/${text}`, {method: 'GET'})
      .then((res) => res.json())
      .then((data) => {
          return data;
      });
    }

    const data = await getapi(text);
    const result = JSON.stringify(data);
    
    alert(`success get result: ${result}`);

    fetch(`/db/result/post?user_id=${user_id}&report_id=${report_id}&json_text=${result}`, {method: 'POST'});

    navigation(`/result?user_id=${user_id}&report_id=${report_id}`);
  }

    return (
        <Body>
            <ReportArea value={text} onChange={(e) => setText(e.target.value)}></ReportArea>
            <br></br>
            <FormButton onClick={() => submit(user_id, report_id, text)}>submit ok</FormButton>
        </Body>
    )
}

const Result = (props) => {
  const user_reports = props.user_reports;
  

  const data = [
    {subject: '文長-妥当性', A: 120, fullMark: 150},
    {subject: '語彙力', A: 98, fullMark: 150},
    {subject: '文体-統一性', A: 86, fullMark: 150},
    {subject: '冗長性', A: 99, fullMark: 150},
    {subject: '主述-妥当性', A: 85, fullMark: 150},
    {subject: '構文-妥当性', A: 65, fullMark: 150},
  ];
  
  return  user_reports.map((user_report, index) => {
      const json = JSON.parse(user_report['json_text']);
      
      return(
        <Body>
          <h3>- Your Report</h3>
          <hr></hr>
          <p>{json['text']}</p>
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
        <Info user_report={user_report}/>
    </Body>
      )
    })
}

const Info = (props) => {
  const user_report = props.user_report
  const json = JSON.parse(user_report['json_text']);
  const [datas, setDatas] = useState([
    {dName: '文字数', num: json['char_num'], exp: '=', ref: '-'},
    {dName: '平均文長', num: json['sentence_num'], exp: '=', ref: '文長-妥当性'},
    {dName: '漢字使用率', num: json['char_rate'], exp: '=', ref: '語彙力'},
    {dName: '誤字脱字数', num: json['proofreading'], exp: '=', ref: '語彙力'},
    {dName: '使用単語数', num: json['word_num'], exp: '=', ref: '語彙力'},
    {dName: '文末統一率', num: json['end_unity'], exp: '=', ref: '文体-統一性'},
    {dName: '重複表現数', num: json['dupli_num'], exp: '=', ref: '冗長性'},
    {dName: '係り助詞平均数', num: json['bind_rate'], exp: '=', ref: '主述-妥当性'},
    {dName: '係り受け平均距離', num: json['depend_mean'], exp: '=', ref: '構文-妥当性'},
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