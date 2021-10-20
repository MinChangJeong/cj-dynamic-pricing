// import './App.scss';
import './App.css';

import ComputeMain from  '../compute/ComputeMain.js';
import Card from '../card/Card';

import React , {useEffect} from 'react';
import socketIO from 'socket.io-client';

function App() {

  // useEffect(() => {
  //   const socket = socketIO('127.0.0.1:3001')
  //   socket.connect()
  //   socket.on('connect', () => {
  //     console.log('connect to socket server');
  //   })

  // }, [])
  
  return (
    <div className="App">
      <ComputeMain />
    </div>
  );
}

export default App;
