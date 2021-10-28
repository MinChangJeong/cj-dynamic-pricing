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
    </div>
  );
}

export default App;
