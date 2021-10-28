import "./ComputeCor.css"
import React, {useState, useEffect} from 'react';
import icon from '../img/icon1.png'
import locationData from "../data/location.json";

const ChangeColorBtn1 = () => {
  document.getElementById("btn1").style.backgroundColor="#3182f6"
  document.getElementById("btn1").style.color="white"

  document.getElementById("btn2").style.backgroundColor="white"
  document.getElementById("btn2").style.color="black"

}

const ChangeColorBtn2 = () => {
  document.getElementById("btn2").style.backgroundColor="#3182f6"
  document.getElementById("btn2").style.color="white"

  document.getElementById("btn1").style.backgroundColor="white"
  document.getElementById("btn1").style.color="black"

}

function ComputeCor() {
  // CSS state
  const [costInfo, setCostInfo] = useState(false);

  const [nExpress, setNExpress] = useState(false);
  const [fExpress, setFExpress] = useState(false);
  
  // value state
  const [sendLocation, setSendLocation] = useState({
    name : "서울특별시 강남구",
    latitude : null,
    longitude : null,
  });
  const [getLocation, setGetLocation] = useState({
    name : "광주광역시 남구",
    latitude : null,
    longitude : null,
  });
  
  
  useEffect(()=> {
    if (locationData[sendLocation.name] != null) {
      var result = locationData[sendLocation.name];

      setSendLocation({
        ...sendLocation,
        latitude : result[0],
        longitude : result[1],
      })
    }
    console.log(sendLocation)
  }, [sendLocation.name])
  

  // jsx

  return (
    <div className="ComputeCor">
      <div className="container">
          <div className="sub">
            <span className="title">보내시는 분 배송 권역</span>
            <input 
              className="search-bar"
              type="text" 
              placeholder="서울특별시 강남구"
              onChange={(e) => {
                setSendLocation({
                  ...sendLocation,
                  name : e.target.value
                });
              }}
            />
          </div>
          <div className="sub">
            <span className="title">받으시는 분 배송 권역</span>
            <input 
              className="search-bar"
              type="text" 
              placeholder="광주광역시 남구"
              onChange={(e) => {
                setGetLocation({
                  ...getLocation,
                  name : e.target.value
                });
              }}
            
            />
          </div>
          <div className="sub">
            <span className="title">상품 옵션</span>
            <div>
              <button id="btn1" onClick={
                () => {
                  setNExpress(true)
                  setFExpress(false)
                  ChangeColorBtn1()
                }
              }>상온</button>
              <button id="btn2" onClick={
                () => {
                  setNExpress(false)
                  setFExpress(true)
                  ChangeColorBtn2()
                }
              }>냉장, 냉동</button>
            </div>
          </div>
          {
            nExpress ? (
              <span className="alert">수도권일 경우만 가능합니다.</span>
            ) : fExpress ? (
              <span className="alert">수도권일 경우만 가능합니다.</span>
            ) : null
          }
          <div className="sub">
            <span className="title">월 출고량</span>
            <input type="text" placeholder=""/>
          </div>
          <div className="sub">
            <span className="title">카테고리</span>
            <select className="selectbar">
              <option value="선택">선택</option>
              <option value="가구/인테리어">가구/인테리어</option>
              <option value="도서">도서</option>
              <option value="디지털/가전">디지털/가전</option>
              <option value="생활/건강">생활/건강</option>
              <option value="스포츠/레저">스포츠/레저</option>
              <option value="식품">식품</option>
              <option value="여가/생활편의">여가/생활편의</option>
              <option value="출산/육아">출산/육아</option>
              <option value="패션의류/잡화">패션의류/잡화</option>
              <option value="화장품/미용">화장품/미용</option>
            </select>
          </div>
          
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

export default ComputeCor;
