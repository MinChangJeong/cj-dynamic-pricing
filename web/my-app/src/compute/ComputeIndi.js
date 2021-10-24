import "./ComputeIndi.css"
import React, {useState, useEffect} from 'react';
import Table from '../table/Table.js'

import icon from '../img/icon1.png'

function ComputeIndi() {
  const [costInfo, setCostInfo] = useState(false);

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
            <span className="title">받으시는 분 배송 권역</span>
            <input type="text" placeholder=""/>
          </div>
          <div className="sub">
            <span className="title">상품 금액</span>
            <input type="text" placeholder=""/>
            <img className="icon" src={icon} onClick={
              () => setCostInfo(!costInfo)
            }/>
            
          </div>
          <div className="sub">
            <span className="title">상품 옵션</span>
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
          {
            nExpress ? (
              <span className="alert">받으시는 분 주소가 수도권일 경우만 가능합니다.</span>
            ) : fExpress ? (
              <span className="alert">받으시는 분 주소가 수도권일 경우만 가능합니다.</span>
            ) : null
          }
          <Table />
        </div>
        {
          costInfo ?  (
            <div className="cost-info">
              <span style={{marginTop:"10px"}}>고객 택배 할증 요금 기준</span>
              &nbsp;
              <span>50 ~ 100 만원 : 2000원</span>
              <span>100 ~ 200 만원 : 4000원</span>
              <span>200 ~ 300 만원 : 6000원</span>
              &nbsp;
              <span>300만원 이상은 취급하지 않습니다.</span>
              <span>할증 요금을 내지 않을 경우 파손시 최대 50만원까지만 보상 받을수 있습니다.</span>
            </div>
          ) : null
        }
    </div>
  );
}

export default ComputeIndi;
