import "./Table.css"
import React, {useState, useEffect} from 'react';

import Summary from "../compute/Summary";

function Table({result}) {
  console.log(result)
// result["delivery"] == "일반배송"
  const [now, setNow] = useState(new Date());
  const [nowInfo, setNowInfo] = useState(
    {
      month : now.getMonth()+1,
      date : now.getDate(),
      week : now.getDay(),
      hours : now.getHours()
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

  const [check, setCheck] = useState('disabled')
  const [btnSum, SetBtnSum] = useState(false);

  var tdPreview = []
  const [chooseFee, setChooseFee] = useState(null);

  const selectTd = (id) => {
    try {
      for(var i=0; i<=22; ) {
        document.getElementById(`1_${i}`).style.color="black"
        document.getElementById(`2_${i}`).style.color="black"
        document.getElementById(`3_${i}`).style.color="black"
  
  
        document.getElementById(`1_${i}`).innerText = result['predict'][`1_${i}`] ? result['predict'][`1_${i}`] : "예약 불가"
        document.getElementById(`2_${i}`).innerText =result['predict'][`2_${i}`]
        document.getElementById(`3_${i}`).innerText =result['predict'][`3_${i}`]
  
        i+=2;
      }
      
      document.getElementById(id).style.color="red";
      console.log(id)
  
      setChooseFee(document.getElementById(id).innerText)

    } catch (error) {
        document.getElementById(`td_now`).style.color="black"
        document.getElementById(`td_tommorow`).style.color="black"
        document.getElementById(`td_future`).style.color="black"
  
        document.getElementById(id).style.color="red";
  
        setChooseFee(document.getElementById(id).className)    
        // setChooseFee(validate_now)    
 
      }
  
    }

  var times =["0~2", "2~4", "4~6", "6~8", "8~10", "10~12", "12~14", "14~16", "16~18", "18~20", "20~22", "22~23:59" ]

  var idx = 0;


  var validate_now = "";
  (nowInfo.hours > 14) ? (validate_now = "불가") : (validate_now = "th_click")
  console.log("choose", chooseFee)


  if (result["delivery"] == "일반배송"){
  times.forEach((time) => {
    tdPreview.push(
      <tr>
        <td>{time}</td>
        <td id={`1_${idx}`} onClick={(e) => selectTd(e.target.id) } >click</td>
        <td id={`2_${idx}`} onClick={(e) => selectTd(e.target.id)} >click</td>
        <td id={`3_${idx}`} onClick={(e) => selectTd(e.target.id)} >click</td>
      </tr>
    )
    idx += 2
  })
  } else{
    tdPreview.push(        

      <tr>
        <th>일자/시간 <br/> </th>
        <th id="td_now" className = {validate_now} onClick = {(e) => selectTd(e.target.id)}>{`${nowInfo.month}월 ${nowInfo.date}일 `} <br/><br/> {validate_now}</th>
        <th id="td_tommorow" className = "th_click"  onClick = {(e) => selectTd(e.target.id)}>{`${tomorrowInfo.month}월 ${tomorrowInfo.date}일`}<br/><br/> click</th>
        <th id="td_future"  className = "th_click" onClick = {(e) => selectTd(e.target.id)}>{`${futureInfo.month}월 ${futureInfo.date}일`}<br/><br/> click</th>
      </tr>
  )
}


  // -----------------------------------------------------------
  

  return result["delivery"] === "일반배송" ? (
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
        onClick={() => SetBtnSum(!btnSum)}
      >
        최종 금액 확인하기
      </button>
      {
        btnSum ? (
          <Summary result={result} type="individual" minFee={chooseFee} />
        ) : (
          null
        )
      }
    </div>
  ) : (
  <div className="table">
    <table>
      {tdPreview}
    </table> 
    {
      chooseFee === "th_click" ? (
        <button 
        onClick={() => SetBtnSum(!btnSum)}
      >
        최종 금액 확인하기
      </button>
      ) : (
        null
      )
    }
  {
    (btnSum && chooseFee === "th_click") ? (
      <Summary result={result} type="individual_F" minFee={0}/>
    ) : (
      null
    )
  }
</div> )
}


export default Table;