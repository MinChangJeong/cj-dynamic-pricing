// import './App.scss';
import './App.css';

import ComputeCor from '../compute/ComputeCor.js';
import ComputeIndi from '../compute/ComputeIndi.js';

import React , {useState, useEffect} from 'react';
import axios from 'axios'

import step1 from "../img/step1.png"
import step2 from "../img/step2.png"
import step3 from "../img/step3.png"
import step4 from "../img/step4.png"

const ChangeColorCor = () => {
  document.getElementById("cor").style.backgroundColor="#3182f6"
  document.getElementById("cor").style.color="white"

  document.getElementById("indi").style.backgroundColor="white"
  document.getElementById("indi").style.color="black"
}

const ChangeColorIndi = () => {
  document.getElementById("indi").style.backgroundColor="#3182f6"
  document.getElementById("indi").style.color="white"
  
  document.getElementById("cor").style.backgroundColor="white"
  document.getElementById("cor").style.color="black"

}

function App() {
  // flask 연결 예시
  // const [getMessage, setGetMessage] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:5000/flask/hello').then(response => {
  //     console.log("SUCCESS", response)
  //     setGetMessage(response)
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }, [])
  
  
  const [btnCor, setBtnCor] = useState(false);
  const [btnIndi, setBtnIndi] = useState(false);

  return (
    <div className="App"> 
      <h1>e-풀필먼트 배송비 계산기</h1>
      <div class="body-container">
        <div class="img-container">
          <img className="img" src= {step1} alt="" />
          <img className="img" src= {step2} alt="" />
          <img className="img" src= {step3} alt="" />
          <img className="img" src= {step4} alt="" />
        </div>
        <div className="Container">
          <div className="container-header">
            
            <button id="cor" onClick={() => {
              setBtnCor(true)
              setBtnIndi(false)
              ChangeColorCor()
            }}>기업
            </button>
            
            <button id="indi" onClick={() => {
              setBtnIndi(true)
              setBtnCor(false)
              ChangeColorIndi()
            }}>개인
            </button>
          
          </div>
        
        </div>
        <div className="container-body">
          {
            btnCor ? (
              <div>
                <div className="mention">입고비와 보관비를 확인할 수 있습니다.</div>
                <ComputeCor  />
              </div>
            ) : btnIndi ?(
              <div>
                <div className="mention">배송방법을 선택 할 수 있습니다.</div>
                <ComputeIndi  />
              </div>
            ) : (
              null
            )
          }
          </div>
      </div>
      
      <div className="price-title">최종 배송비 확인</div>
      <div className="price-container">
        <div className="price-list">
          <div className="detail1">
              <div className="space">주문시간</div>
              <div className="space">주고 받는 거리</div>
              <div className="space">상품 금액</div>
              <div className="space">배송 옵션</div>
              <div className="space">할인 혜택</div>
          </div>
          <div class="detail2">
              <div className="space">오후 5시 17분</div>
              <div className="space">100km 내</div>
              <div className="space">20,000원</div>
              <div className="space">20,000원</div>
              <div className="space">SILVER</div>
          </div>
          <div className="detail3">
              <div className="space">+?00원</div>
              <div className="space">+?00원</div>
              <div className="space">+?00원</div>
              <div className="space">+?00원</div>
              <div className="space">-?00원</div>
          </div>
        </div>
        <hr />
        <div className="all-price">
          <div>총 합계</div>
          <div>???,???원</div>
        </div>
      </div>
        

    </div>
  );
}

export default App;
