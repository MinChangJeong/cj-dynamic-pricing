// import './App.scss';
import './App.css';

import ComputeMain from  '../compute/ComputeMain.js';
import Card from '../card/Card';

import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import React , {useState, useEffect} from 'react';
import axios from 'axios'

import step1 from "../img/step1.png"
import step2 from "../img/step2.png"
import step3 from "../img/step3.png"
import step4 from "../img/step4.png"


function App() {
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap" rel="stylesheet">
</head>

  // flask 연결 예시
  const [getMessage, setGetMessage] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })
  }, [])
  
  let history = useHistory();
    
  function handleCorClick() {
    history.push("/cor");
  }

  function handleIndiClick() {
      history.push("/indi");
  }

  return (
    <div className="App"> 
      <h1>e-풀필먼트 배송비 계산기</h1>
      <div>
        <img src= {step1} alt="" />
        <img src= {step2} alt="" />
        <img src= {step3} alt="" />
        <img src= {step4} alt="" />
      </div>
      <div className="body">
        <div>
          <button onClick={handleCorClick}>기업</button>
          <span> 입고비와 보관비를 확인할 수 있습니다.</span>
        </div>
        <div>
          <button onClick={handleIndiClick}>개인</button>
          <span> 배송 방법을 선택할 수 있습니다.</span>
        </div>
      </div>
      <Router >
        {/* <Route 
          path="/cor" 
          render = {(props) => 
            <ComputeMain 
              {...props} />}
        /> */}
        <Route 
          path="/indi" 
          render = {(props) => 
            <ComputeMain 
              {...props} />}
            />
      </Router>
      
      
    </div>
  );
}

export default App;
