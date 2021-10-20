import "./Table.css"
import React, {useState, useEffect} from 'react';

function Table() {
  // const now = new Date();

  const [now, setNow] = useState(new Date());
  const [nowInfo, setNowInfo] = useState(
    {
      month : now.getMonth()+1,
      date : now.getDate(),
      week : now.get_week(),
    }
  )

  const [tommorow, setTommorow] = useState(new Date(now.setDate(now.getDate()+1)));
  const [tommorowInfo, setTommorowInfo] = useState(
    {
      month : tommorow.getMonth()+1,
      date : tommorow.getDate(),
      week : tommorow.get_week(),
    }
  )

  const [future, setFuture] = useState(new Date(tommorow.setDate(tommorow.getDate()+1)));
  const [futureInfo, setFutureInfo] = useState(
    {
      month : future.getMonth()+1,
      date : future.getDate(),
      week : future.get_week(),
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
    setNowInfo(get_week(nowInfo.week));
    setTommorowInfo(get_week(tommorowInfo.week));
    setFutureInfo(get_week(futureInfo.week));

  }, [])

  // ex)10/19 10~13 배송비용 대한 state값이 있어야 함 (row : 7, column : 3 )
  
  const [fees, setFees] = useState(
    {
      nowFees : [],
      tommorowFees : [],
      futureFees : [],
    }
  );


  return (
    <div className="table">
      <table>
        <tr>
          <th>일자/시간</th>
          <th>{`${nowInfo.month}월 ${nowInfo.date}일 (${nowInfo.week})`}</th>
          <th>{`${tommorowInfo.month}월 ${tommorowInfo.date}일 (${tommorowInfo.week})`}</th>
          <th>{`${futureInfo.month}월 ${futureInfo.date}일 (${futureInfo.week})`}</th>
        </tr>
        <tr>
          <td className="time">10:00 ~ 12:00</td>
          <td>0,000원</td>
          <td>0,000원</td>
          <td>0,000원</td>
        </tr>
        <tr>
          <td className="time">12:00 ~ 16:00</td>
          <td>0,000원</td>
          <td>0,000원</td>
          <td>0,000원</td>
        </tr>
        <tr>
          <td className="time">15:00 ~ 19:00</td>
          <td>0,000원</td>
          <td>0,000원</td>
          <td>0,000원</td>
        </tr>
        <tr>
          <td className="time">16:00 ~ 20:00</td>
          <td>0,000원</td>
          <td>0,000원</td>
          <td>0,000원</td>
        </tr>
        <tr>
          <td className="time">18:00 ~ 21:00</td>
          <td>0,000원</td>
          <td>0,000원</td>
          <td>0,000원</td>
        </tr>
        <tr>
          <td className="time">21:00 ~ 23:59</td>
          <td>0,000원</td>
          <td>0,000원</td>
          <td>0,000원</td>
        </tr>
        <tr>
          <td className="time">추천</td>
          <td>0,000원</td>
          <td>0,000원</td>
          <td>0,000원</td>
        </tr>
      </table>
      <span>[추천] 선택시 적용 가능한 최대 혜택을 드립니다.(상시 변동 될 수 있음.)</span>

    </div>
  );
}

export default Table;
