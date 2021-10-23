import "./ComputeIndi.css"
import React, {useState, useEffect} from 'react';
import Table from '../table/Table.js'

import icon from '../img/icon1.png'

function ComputeIndi() {
  const ChangeColorBtn1 = () => {
    document.getElementById("btn1").style.backgroundColor="#3182f6"
    document.getElementById("btn1").style.color="white"

    document.getElementById("btn2").style.backgroundColor="white"
    document.getElementById("btn2").style.color="black"

    document.getElementById("btn3").style.backgroundColor="white"
    document.getElementById("btn3").style.color="black"
  }

  const ChangeColorBtn2 = () => {
    document.getElementById("btn2").style.backgroundColor="#3182f6"
    document.getElementById("btn2").style.color="white"

    document.getElementById("btn1").style.backgroundColor="white"
    document.getElementById("btn1").style.color="black"

    document.getElementById("btn3").style.backgroundColor="white"
    document.getElementById("btn3").style.color="black"

  }

  const ChangeColorBtn3 = () => {
    document.getElementById("btn3").style.backgroundColor="#3182f6"
    document.getElementById("btn3").style.color="white"

    document.getElementById("btn1").style.backgroundColor="white"
    document.getElementById("btn1").style.color="black"

    document.getElementById("btn2").style.backgroundColor="white"
    document.getElementById("btn2").style.color="black"

  }

  const [nExpress, setNExpress] = useState(false);
  const [fExpress, setFExpress] = useState(false);
  const [bExpress, setBExpress] = useState(false);


  return (
    <div className="ComputeIndi">
      <div className="container">
          <div className="sub">
            <span>받으시는 분 배송 권역</span>
            <input type="text" placeholder=""/>
          </div>
          <div className="sub">
            <span>상품 금액</span>
            <input type="text" placeholder=""/>
            <img className="icon" src={icon} alt="" />
          </div>
          <div className="sub">
            <span>상품 옵션</span>
            <button id="btn1" onClick={
              () => {
                setNExpress(true)
                setFExpress(false)
                setBExpress(false)
                ChangeColorBtn1()
              }
            }>당일배송</button>
            <button id="btn2" onClick={
              () => {
                setNExpress(false)
                setFExpress(true)
                setBExpress(false)
                ChangeColorBtn2()
              }
            }>새벽배송</button>
            <button id="btn3" onClick= {
              () => {
                setNExpress(false)
                setFExpress(false)
                setBExpress(true)
                ChangeColorBtn3()
              }
            }>일반배송</button>
          </div>
          <Table />
        </div>
    </div>
  );
}

export default ComputeIndi;
