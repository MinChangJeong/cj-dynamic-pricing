// import './App.scss';
import './App.css';

import ComputeCor from '../compute/ComputeCor.js';
import ComputeIndi from '../compute/ComputeIndi.js';

// import ComputeMain from  '../compute/ComputeMain.js';

import React , {useState, useEffect} from 'react';
import axios from 'axios'

import step1 from "../img/step1.png"
import step2 from "../img/step2.png"
import step3 from "../img/step3.png"
import step4 from "../img/step4.png"


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
        {/* <div className="body">
          <div>
            <button onClick={() => setBtnCor(true)}>기업</button>
            <span> 입고비와 보관비를 확인할 수 있습니다.</span>
          </div>
          <div>
            <button onClick={() => setBtnIndi(true)}>개인</button>
            <span> 배송 방법을 선택할 수 있습니다.</span>
          </div>
        </div> */}
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
          <div>
            {
              btnCor ? (
                <div class="cor-container">
                  <div class="mention">입고비와 보관비를 확인할 수 있습니다.</div>
                  <ComputeCor />
                </div>
              ) : btnIndi ?(
                <div class="cor-container">
                  <div class="mention">배송 방법을 선택할 수 있습니다.</div>
                  <ComputeIndi />
                </div>
              ) : (
                null
              )
            }
          </div>
          
          <div class="price-title">최종 배송비 확인</div>
          <div class="price-container">
            <div class="price-list">
              <div class="detail1">
                  <div class="space">주문시간</div>
                  <div class="space">주고 받는 거리</div>
                  <div class="space">상품 금액</div>
                  <div class="space">배송 옵션</div>
                  <div class="space">할인 혜택</div>
              </div>
              <div class="detail2">
                  <div class="space">오후 5시 17분</div>
                  <div class="space">100km 내</div>
                  <div class="space">20,000원</div>
                  <div class="space">20,000원</div>
                  <div class="space">SILVER</div>
              </div>
              <div class="detail3">
                  <div class="space">+?00원</div>
                  <div class="space">+?00원</div>
                  <div class="space">+?00원</div>
                  <div class="space">+?00원</div>
                  <div class="space">-?00원</div>
              </div>
            </div>
            <hr />
            <div class="all-price">
              <div>총 합계</div>
              <div>???,???원</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
