import "./Table.css"
import React, {useState, useEffect} from 'react';

import Summary from "../compute/Summary";

function Table({result}) {

  const [now, setNow] = useState(new Date());
  const [nowInfo, setNowInfo] = useState(
    {
      month : now.getMonth()+1,
      date : now.getDate(),
      week : now.getDay(),
    }
  )

  const [tomorrow, setTomorrow] = useState(new Date(now.setDate(now.getDate()+1)));
  const [tomorrowInfo, setTomorrowInfo] = useState(
    {
      month : tomorrow.getMonth()+1,
      date : tomorrow.getDate(),
      week : tomorrow.getDay(),
    }
  )

  const [future, setFuture] = useState(new Date(tomorrow.setDate(tomorrow.getDate()+1)));
  const [futureInfo, setFutureInfo] = useState(
    {
      month : future.getMonth()+1,
      date : future.getDate(),
      week : future.getDay(),
    }
  )

  
  const get_week = (week) =>{
    if(week == 0) {
      return "일요일"
    }
    else if(week == 1) {
      return "월요일"
    }
    else if(week == 2) {
      return "화요일"
    }
    else if(week == 3) {
      return "수요일"
    }
    else if(week == 4) {
      return "목요일"
    }
    else if(week == 5) {
      return "금요일"
    }
    else if(week == 6) {
      return "토요일"
    }
  }

  useEffect(() => {
    setNowInfo({
      ...nowInfo,
      week : get_week(nowInfo.week)
    });
    setTomorrowInfo({
      ...tomorrowInfo, 
      week : get_week(tomorrowInfo.week),
    });
    setFutureInfo({
      ...futureInfo, 
      week : get_week(futureInfo.week),
    });

  }, [])

  // table set -----------------------------------------------------------------------

  // ex)10/19 10~13 배송비용 대한 state값이 있어야 함 (row : 7, column : 3 )


  const [nowCosts, setNowCosts] = useState(null);
  const [tomCosts, setTomCosts] = useState(null);
  const [futureCosts, setFutureCosts] = useState(null);

  const [resultInfo, setResultInfo] = useState(result);

  // table에 들어갈 fee
  // const [predicts, setPredicts] = useState(result["predict"])

  var times =["0~2", "2~4", "4~6", "6~8", "8~10", "10~12", "12~14", "14~16", "16~18", "18~20", "20~22", "22~23:59" ]

  var tdPreview = []

  // 선택된 데이터
  const [chooseFee, setChooseFee] = useState(null);

  const selectTd = (id) => {
    for(var i=0; i<=22; ) {
      document.getElementById(`1_${i}`).style.color="black"
      document.getElementById(`2_${i}`).style.color="black"
      document.getElementById(`3_${i}`).style.color="black"
      i+=2;
    }

    document.getElementById(id).style.color="red";
    console.log(id)

    // setChooseFee(document.getElementById(id))
  }


  var idx = 0;

  times.forEach((time) => {
    tdPreview.push(
      <tr>
        <td>{time}</td>
        <td id={`1_${idx}`} onClick={(e) => selectTd(e.target.id) } >data</td>
        <td id={`2_${idx}`} onClick={(e) => selectTd(e.target.id)} >data</td>
        <td id={`3_${idx}`} onClick={(e) => selectTd(e.target.id)} >data</td>
      </tr>
    )
    idx += 2
  })

  const sample = {'1_6' : 3000, '3_6' : 2000}


  // Object.entries(sample).map((data) => {
  //   var key = data[0];
  //   var values = data[1];

  // })

  

  // -----------------------------------------------------------
  
  const [check, setCheck] = useState('disabled')
  const [btnSum, SetBtnSum] = useState(false);

  return (
    <div className="table">
      <table>
        <tr>
          <th>일자/시간</th>
          <th>{`${nowInfo.month}월 ${nowInfo.date}일 (${nowInfo.week})`}</th>
          <th>{`${tomorrowInfo.month}월 ${tomorrowInfo.date}일 (${tomorrowInfo.week})`}</th>
          <th>{`${futureInfo.month}월 ${futureInfo.date}일 (${futureInfo.week})`}</th>
        </tr>
        {tdPreview}
      </table> 
      <button 
        onClick={() => SetBtnSum(true)}
        // disabled={check}
      >
        최종 금액 확인하기
      </button>
      {
        btnSum ? (
          <Summary result={resultInfo} type="individual"/>
        ) : (
          null
        )
      }
    </div>
  );
}

export default Table;