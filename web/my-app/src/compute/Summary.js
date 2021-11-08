import React from 'react'
import "./Summary.css"

import  {useState, useEffect} from 'react'

function Summary({result,type, minFee}) {
    console.log("console.log", result, minFee)

    // result 기업---------------------------------
    // 주문 시간: 시간
    // 주고 받는 거리 : 거리
    // 상품 옵션
    // 할인 혜택 : 월 출고량 에따른 금액 변화
    
    // ---------------------------------



    // result 개인---------------------------------
    // 주문 시간: 시간
    // 주고 받는 거리 : 거리
    // 주문 금액
    // 배송 옵션

    // ---------------------------------

    // 주문시간
    const [orderTime, setOrderTime] = useState({
        time : null, 
        fee : null
    });
    // 거리
    const [distance, setDistance] = useState({
        t_distance : null,
        fee : null,
    });
    // 상품옵션 || 배송옵션
    const [option, setOption] = useState({
        name : null,
        fee : null,
    });
    // 할인혜택
    const [discount, setDiscount ] = useState({
        quantity : null,
        benefits : null,
    });
    // 주문금액
    const [orderPrice, setOrderPrice] = useState({
        price : null,
        fee : null,
    });

    const [totalFee, setTotalFee] = useState(null);

    const [totalFee_indi, setTotalFee_Indi] = useState(null);

    useEffect(() => {
        if(type == "corporate") {
            setOrderTime({
                ...orderTime,
                time : result["time"],
                fee : result["time_weight"]
            })
            setDistance({
                ...distance,
                t_distance : result["distance"],
                fee : result["distance_weight"]
            })
            setOption({
                ...option,
                name : result["storage"],
                fee : result["category_weight"]
            })
            setDiscount({
                ...discount,
                quantity : result["quantity"],
                benefits : result["discount_weight"]
            })
            setTotalFee(result["fee"])
        }
        // 개인
        // else if(type == "individual") {
        else {
            setOrderTime({
                ...orderTime,
                time : result["time"],
                fee : result["time_weight"]
            });
            setDistance({
                ...distance,
                t_distance : result["distance"],
                fee : result["distance_weight"]
            });
            setOption({
                ...option,
                name : result["delivery"],
                fee : result["option_weight"]
            });
            setOrderPrice({
                ...orderPrice,
                price : result["price"],
                fee : result["price_weight"]
            });
            setTotalFee(result["fee_"]);

            setTotalFee_Indi(result["fee_"] + parseInt(minFee));            
        };
    }, [result])

    useEffect(() => {
        setTotalFee_Indi(result["fee_"] + parseInt(minFee));            

    },[minFee])

    if ( type === "corporate") {
    return (
        <div className="Summary">                  
            <div className="price-container">
                <div className="price-list">
                    <div className="detail1">
                        <div className="space">주문시간</div>
                        <div className="space">주고 받는 거리</div>
                        <div className="space">배송 옵션</div>
                        <div className="space">출고량</div>
                        <div className="space">할인 혜택(출고량)</div>
                    </div>
                    <div class="detail2">
                        <div className="space">{orderTime.time} 시</div>
                        <div className="space">{distance.t_distance} km</div>
                        <div className="space">{option.name}</div>
                        <div className="space">　</div>
                        <div className="space">{discount.quantity} 개</div>
                    </div>
                    <div className="detail3">
                        <div className="space">+{orderTime.fee}원</div>
                        <div className="space">+{distance.fee}원</div>
                        <div className="space">+{option.fee}원</div>
                        <div className="space">+100원</div>
                        <div className="space">- {discount.benefits}원</div>
                        
                    </div>
                </div>
                <hr />
                <div className="all-price">
                    <div>총 합계</div>
                    <div>{totalFee}원</div>
                </div>
            </div>
        </div>
        )
    } else if (type === "individual") {
        return(
            <div className="Summary">      
                    <div className="price-container">
                        <div className="price-list">
                            <div className="detail1">
                                <div className="space">주문시간</div>
                                <div className="space">주고 받는 거리</div>
                                <div className="space">주문 금액</div>
                                <div className="space">배송 옵션</div>
                                <div className="space">할인 혜택</div>
                            </div>
                            <div class="detail2">
                                <div className="space">{orderTime.time} 시</div>
                                <div className="space">{distance.t_distance} km</div>
                                <div className="space">{orderPrice.price}원</div>
                                <div className="space">{option.name}</div>
                                <div className="space">선택한 날짜에 대한 할인 금액</div>
                            </div>
                            <div className="detail3">
                                <div className="space">+{orderTime.fee}원</div>
                                <div className="space">+{distance.fee}원</div>
                                <div className="space">+{orderPrice.fee}원</div>
                                <div className="space">+{option.fee}원</div>
                                <div className="space">{minFee}원</div>
                            </div>
                        </div>
                        <hr />
                        <div className="all-price">
                            <div>총 합계</div>
                            <div>{totalFee_indi}원</div>
                        </div>
                    </div>
                </div>
            )
        } else {        
            return(
            <div className="Summary"> 
                    <div className="price-container">
                    <div className="price-list">
                        <div className="detail1">
                            <div className="space">주문시간</div>
                            <div className="space">주고 받는 거리</div>
                            <div className="space">주문 금액</div>
                            <div className="space">배송 옵션</div>
                        </div>
                        <div class="detail2">
                            <div className="space">{orderTime.time} 시</div>
                            <div className="space">{distance.t_distance} km</div>
                            <div className="space">{orderPrice.price}원</div>
                            <div className="space">{option.name}</div>
                        </div>
                        <div className="detail3">
                            <div className="space">+{orderTime.fee}원</div>
                            <div className="space">+{distance.fee}원</div>
                            <div className="space">+{orderPrice.fee}원</div>
                            <div className="space">+{option.fee}원</div>
                        </div>
                    </div>
                    <hr />
                    <div className="all-price">
                        <div>총 합계</div>
                        <div>{totalFee_indi}원</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Summary;