import React, {useState} from "react";
import logo from './logo.svg';
import QRCode from 'qrcode.react';
import {getBalance, readCount, setCount} from './api/UseCaver';
import * as KlipAPI from './api/UseKlip';
import './App.css';

function onPressButton() {
  console.log('Hi');
}
const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
}
const DEFAULT_QR_CODE = 'DEFAULT';

function App() {
  const [balance, setBalance] = useState('0');
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  //readCount();
  //getBalance('0x5b150b3353ae2dd0cba652d9972670490ff10bc6');
  const onclickGetAddress = () => {
    KlipAPI.getAddress(setQrvalue);
  }
  const onclickSetCount = () => {
    KlipAPI.setCount(2000, setQrvalue);
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={()=>{onclickGetAddress()}} >
          주소 가져오기
        </button>
        <br /><br /><br />
        <button onClick={()=>{onclickSetCount()}} >
          카운트 값 변경
        </button>
        <br /><br /><br />
        <QRCode value={qrvalue} />
        <p>
          {balance}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
