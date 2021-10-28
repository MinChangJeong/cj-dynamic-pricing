import "./ComputeIndi.css"
import React, {useState, useEffect} from 'react';
import Table from '../table/Table.js'

import icon from '../img/icon1.png'

import Sumamry from "./Summary.js"
import SearchBar from "../search/SearchBar";
import locationData from '../data/location.json'
import TrieSearch from 'trie-search';


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


function ComputeIndi() {
  const [costInfo, setCostInfo] = useState(false);

  const [nExpress, setNExpress] = useState(false);
  const [fExpress, setFExpress] = useState(false);
  const [bExpress, setBExpress] = useState(false);

  const [btnSum, setBtnSum] = useState(false);

  // 받는 사람 주소(권역) ---------------------------------------------
  const [location, setLocation] = useState({
    value : "",
    validateStatus : false
  });
  const [result, setResult] = useState({
    value : [],
    validateStatus : false
  });
  const [price, setPrice] = useState({
    value : 0,
    validateStatus : false
  })

  const SearchLocation =  (data) => {
    const trie = new TrieSearch();
  
    trie.addFromObject(locationData);

    var results = trie.search(data)

    setResult({
      ...result,
      value : results, 
      validateStatus : true
    });
  }
  
  const updateLocation = (data) => {
    setLocation({
      ...location, 
      value : data, 
      validateStatus : true
    });
  }

  // server 호출---------------------------------------------

  const handleSubmit = () => {
  
    const inputRequest = {
      location : location.value, 
      price : price.value, 
      option : [nExpress, fExpress, bExpress]
    }
  
    console.log(inputRequest)

    setBtnSum(true)

    // axios.post('http://localhost:5000/flask', inputRequest)
    //   .then(response => {
    //     // response 받고 이후에 보여주는거 하면됨
    //     // summmary 에 결과값 전달 후 display
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  
  }

  // ---------------------------------------------

  const isFormInvalid = () => {
    return (
        location.validateStatus &
        price.validateStatus 
    )
  }

  return (
    <div className="ComputeIndi">
      <div className="container">
          
        <div className="sub">
          <span className="title">받으시는 분 배송 권역</span>
          {/* <img 
            className="icon" 
            src={icon} 
            onClick={() => setCostInfo(!costInfo)}
          /> */}
          <input
            name="search-bar" 
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setLocation({
                ...location, 
                value : e.target.value, 
                validateStatus : true
              });
              SearchLocation(e.target.value)
            }}
          />
        </div>
            {
              result.length != 0 ? (
                <SearchBar result={result.value} updateLocation={updateLocation}/>    
              ) : (
                null
              )
            }
        <div className="sub">
          <span className="title">상품 금액</span>
          <input 
            type="text" 
            placeholder=""
            onChange={(e) => setPrice({
              ...price, 
              value : e.target.value, 
              validateStatus : true
            })}
            />
        </div>
        <div className="sub">
          <span className="title">상품 옵션</span>
          <div>
            <button className="button2" id="btn1" onClick={
              () => {
                setNExpress(true)
                setFExpress(false)
                setBExpress(false)
                ChangeColorBtn1()
              }
            }>당일배송</button>
            <button className="button2" id="btn2" onClick={
              () => {
                setNExpress(false)
                setFExpress(true)
                setBExpress(false)
                ChangeColorBtn2()
              }
            }>새벽배송</button>
            <button className="button2" id="btn3" onClick= {
              () => {
                setNExpress(false)
                setFExpress(false)
                setBExpress(true)
                ChangeColorBtn3()
              }
            }>일반배송</button>
          </div>
        </div>
          {
            nExpress ? (
              <span className="alert">받으시는 분 주소가 수도권일 경우만 가능합니다.</span>
            ) : fExpress ? (
              <span className="alert">받으시는 분 주소가 수도권일 경우만 가능합니다.</span>
            ) : null
          } 

         {
           // submit 버튼을 눌러야만 나오게 수정
          btnSum ? (
            // table 데이터 보내주게 만들어야함
            <Table />
          ) : null
         }
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
      <button 
        className="price-title" 
        onClick={handleSubmit}
      >
        최종 배송비 확인
      </button>
      {
        isFormInvalid() ? (
          <Sumamry />
        ) : null
      }
    </div>
  );
}

export default ComputeIndi;
