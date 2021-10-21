// import './App.scss';
import './App.css';

import ComputeMain from  '../compute/ComputeMain.js';
import Card from '../card/Card';

import React , {useState, useEffect} from 'react';
import socketIO from 'socket.io-client';
import axios from 'axios'

function App() {
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
  
  return (
    <div className="App">
      <ComputeMain />
    </div>
  );
}

export default App;
