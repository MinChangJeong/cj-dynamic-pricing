import "./ComputeCor.css"
import React, {useState, useEffect} from 'react';
import icon from '../img/icon1.png'

import Summary from "./Summary.js"
import SearchBar from "../search/SearchBar";
import locationData from "../data/location.json";
import TrieSearch from 'trie-search';

import axios from 'axios'

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

  const [check, setCheck] = useState('disabled');
  const [btnSum, setBtnSum] = useState(false);

  // 보내는 사람 권역----------------------------------------------
  const [sendLocation, setSendLocation] = useState({
    value : "",
    validateStatus : false
  });
  const [sendResult, setSendResult] = useState({
    value : [],
    validateStatus : false
  });

  const SearchSendLocation =  (data) => {
    const trie = new TrieSearch();
  
    trie.addFromObject(locationData);

    var results = trie.search(data)

    setSendResult({
      ...sendLocation,
      value : results,
      validateStatus : true,
    });
  }
  
  const updateSendLocation = (data) => {
    setSendLocation(data);
  }

  // ----------------------------------------------

  // 받는 사람 권역----------------------------------------------
  const [getLocation, setGetLocation] = useState({
    value : "",
    validateStatus : false
  });
  const [getResult, setGetResult] = useState({
    value : [],
    validateStatus : false
  });

  const SearchGetLocation =  (data) => {
    const trie = new TrieSearch();
  
    trie.addFromObject(locationData);

    var results = trie.search(data)

    setGetResult({
      ...getResult,
      value : results,
      validateStatus : true
    });
  }
  
  const updateGetLocation = (data) => {
    setGetLocation(data);
  }

  // ----------------------------------------------
  
  // 입력값 전송(기업)---------------------------------------------

  const [resultInfo, SetResultInfo] = useState(null);

  // 보내는 사람 권역주소, 받는 사람 권역 주소, 상품옵션, 월출고량, 카테고리
  // sendLocation, getLocation, [nExpress || fExpress]중 true값, 월 출고량
  const [quantity, setQuantity] = useState({
    value : null,
    validateStatus : false
  });
  const [category, setCategory] = useState({
    value : null,
    validateStatus : false
  });

  const handleSubmit = () => {
    setBtnSum(true)

    const inputRequest = {
      time : new Date().getHours(),
      btnType : "btnCor",
      sendLocation : sendLocation.value,
      getLocation : getLocation.value,
      option : [nExpress, fExpress],
      quantity : quantity.value,
      category : category.value
    }
    
    axios.post('http://localhost:5000/calc/', inputRequest)
      .then(response => {
        console.log(inputRequest)
        console.log("yes")
        console.log(response)
        // response 받고 이후에 보여주는거 하면됨
        // summmary 에 결과값 전달 후 display
      })
      .catch(error => {
        // console.log(inputRequest)
        console.log(error)
        console.log("error")
      })
  
  }
  
  useEffect(() => {
    if (sendLocation.validateStatus &
        getLocation.validateStatus &
        quantity.validateStatus &
        category.validateStatus
      ) {
      setCheck(null)
    }

  }, [sendLocation.validateStatus, getLocation.validateStatus, quantity.validateStatus, category.validateStatus])

  //----------------------------------------------

  return (
    <div className="ComputeCor">
      <div className="container">
          <div className="sub">
            <span className="title">보내시는 분 배송 권역</span>
            <input
            name="search-bar" 
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSendLocation({
                ...sendLocation,
                value : e.target.value,
                validateStatus : true,
              });
              SearchSendLocation(e.target.value)
            }}
          />
          </div>
          {
            sendResult.length != 0 ? (
              <SearchBar result={sendResult.value} updateSendLocation={updateSendLocation}/>    
            ) : (
              null
            )
          }
          <div className="sub">
            <span className="title">받으시는 분 배송 권역</span>
            <input
            name="search-bar" 
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setGetLocation({
                ...getLocation, 
                value : e.target.value,
                validateStatus : true
              });
              SearchGetLocation(e.target.value)
            }}
          />
          </div>
          {
            getResult.length != 0 ? (
              <SearchBar result={getResult.value} updateGetLocation={updateGetLocation}/>    
            ) : (
              null
            )
          }
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
            <input 
              type="text" 
              placeholder=""
              onChange={(e) => setQuantity({
                ...quantity, 
                value : e.target.value, 
                validateStatus : true
              })}
              />
          </div>
          <div className="sub">
            <span className="title">카테고리</span>
            <select 
              className="selectbar" 
              onChange={(e) => setCategory({
                ...category, 
                value : e.target.value, 
                validateStatus : true
              })}>
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
      <button 
        className="price-title" 
        onClick={handleSubmit}
        disabled={check}
      >
        최종 배송비 확인
      </button>
      {
        btnSum ? (
          <Summary result={resultInfo} type="corporate"/>
        ) : null
      }
    </div>

  );
}

export default ComputeCor;
