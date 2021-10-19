import "./Table.css"
import React, {useState, useEffect} from 'react';

function Table() {
  const now = new Date();

  const [now_month, setMonth] = useState(now.getMonth()+1)
  const [now_date, setDate] = useState(now.getDate());
  const [now_week, setNowWeek] = useState(now.getDay());

  const tommorow = new Date(now.setDate(now.getDate()+1));

  const [tom_month, setTomMonth] = useState(tommorow.getMonth()+1)
  const [tom_date, setTomDate] = useState(tommorow.getDate());
  const [tom_week, setTomWeek] = useState(tommorow.getDay());

  const future = new Date(tommorow.setDate(tommorow.getDate()+1));

  const [future_month, setFutureMonth] = useState(future.getMonth()+1)
  const [future_date, setFutureDate] = useState(future.getDate());
  const [future_week, setFutureWeek] = useState(future.getDay());
  
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
    setNowWeek(get_week(now_week))
    setTomWeek(get_week(tom_week))
    setFutureWeek(get_week(future_week))
  }, [])

  // ex)10/19 10~13 배송비용 대한 state값이 있어야 함 (row : 7, column : 3 )
  

  return (
    <div className="table">
      <table>
        <tr>
          <th>일자/시간</th>
          <th>{`${now_month}월 ${now_date}일 (${now_week})`}</th>
          <th>{`${tom_month}월 ${tom_date}일 (${tom_week})`}</th>
          <th>{`${future_month}월 ${future_date}일 (${future_week})`}</th>
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
