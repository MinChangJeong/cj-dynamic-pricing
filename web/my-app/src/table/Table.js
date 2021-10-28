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

  // ex)10/19 10~13 배송비용 대한 state값이 있어야 함 (row : 7, column : 3 )
  

  // -----------------------------------------------------------
  const [nowCosts, setNowCosts] = useState(null);
  const [tomCosts, setTomCosts] = useState(null);
  const [futrueCosts, setFutureCosts] = useState(null);

  const [resultInfo, setResultInfo] = useState(null);
  // useEffect(() => {
  //   // ex) 10/28 :  0~2 시 : 금액
  //   //     10/28 : 2~4 시 : 금액  을 쭉 담은 리스트 3개를 받아야함
  // }, [])


  // ex)
  
  // -----------------------------------------------------------

  const [check, setCheck] = useState('disabled')
  const [btnSum, SetBtnSum] = useState(false);

  useEffect(  () => {
    console.log(btnSum)
  }, [btnSum])

  return (
    <div className="table">
      <table>
        <tr>
          <th>일자/시간</th>
          <th>{`${nowInfo.month}월 ${nowInfo.date}일 (${nowInfo.week})`}</th>
          <th>{`${tomorrowInfo.month}월 ${tomorrowInfo.date}일 (${tomorrowInfo.week})`}</th>
          <th>{`${futureInfo.month}월 ${futureInfo.date}일 (${futureInfo.week})`}</th>
        </tr>
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