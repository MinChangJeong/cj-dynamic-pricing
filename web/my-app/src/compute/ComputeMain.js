import "./ComputeMain.css"
import Card from "../card/Card.js"
import Table from '../table/Table.js'
import React, {useState, useEffect} from 'react';


function ComputeMain() {
  const [postcode, setPostCode] = useState(null);
  const [deliverOption, setDeliOption] = useState(null);
  const [productOption, setProductOption] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const computeRequest = {
      postcode : postcode,
      deliverOption : deliverOption, 
      productOption : productOption,
    }

    // socket 통신 부분
  }


  return (
    <div className="ComputeMain">
      <div className="header">
        <h1 className="top-header-text">e-풀필먼트 배송비 계산기</h1>
        <h5 className="bottom-header-text">입고비와 보관비는 제외되어 있어요.</h5>
      </div>
      <div className="body">
        <form className="post-form" action="" method="post">
          <div className="post-code">
            <span>배송 권역</span>
            <input 
             type="text" 
             name="post-code" 
             id="" 
             placeholder ="수도권/비수도권" 
             onChange={(e) => setPostCode(e.target.value)}/>
          </div>
          <div className="post-option">
            <span>배송 옵션</span>
            <input 
              type="text" 
              name="deliver-option" 
              id="" 
              placeholder ="일반배송/당일배송/새벽배송" 
              onChange={(e) => setDeliOption(e.target.value)}/>
          </div>
          <div className="product-option">
            <span>상품 옵션</span>
            <input 
              type="text" 
              name="product-option" 
              id="" 
              placeholder ="상온/냉장/냉동" 
              onChange={(e) => setProductOption(e.target.value)}/>
          </div>
          <button className="submit-btn" >
            계산하기
          </button>
        </form>
      </div>
      <div className="result-list" onClick={handleSubmit}>
        <Table />
        <Card />
      </div>
    </div>
  );
}

export default ComputeMain;
