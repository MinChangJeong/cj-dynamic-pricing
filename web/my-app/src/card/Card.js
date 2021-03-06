import "./Card.css"
import React, {useState, useEffect} from 'react';

// 상품 옵션을 받을 때 state로 받아야함

function Card(props) {
  const [option, setOption] = useState("상온");

  // useEffect(() => {
  //   setOption(props.option);
  // }, [])


  return (
    <div className="card">
      {/* <div className="card-header">
        <span className="header-name">파스토로</span>
        <span className="header-sub-name">출고한다면</span>
      </div> */}
      <div className="card-body">
        <div>
          <span>택배 비용</span>
          <span className="cost">0,000원/ 건</span>
        </div>
        <div >
          {/* <span className="option-title">선택옵션</span>
          <div>
            <span className="option">상온/냉장/냉동</span>
            <span className="cost">0,000/ 건</span>
          </div> */}
          <span>{`선택 옵션 (${option})`}</span>
          <span className="cost">0,000원/ 건</span>
        </div>
        <div>
          <span>할인 혜택</span>
          <span className="cost">0,000원/ 건</span>
        </div>
        <div className="result-cost">
          <div>
            <span>월 출고 비용</span>
            <span className="cost">0,000원</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
