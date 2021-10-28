import React from 'react'
import "./Summary.css"

function Summary({result,type}) {
    // result ---------------------------------
    // 주문 시간: 시간
    // 주고 받는 거리 : 거리
    // 상품 금액 : 

    // ---------------------------------


    return (
        <div className="Summary">
            {
                type == "cor" ? (
                    <div className="price-container">
                        <div className="price-list">
                            <div className="detail1">
                                <div className="space">주문시간</div>
                                <div className="space">주고 받는 거리</div>
                                <div className="space">상품 금액</div>
                                <div className="space">배송 옵션</div>
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
                            </div>
                        </div>
                        <hr />
                        <div className="all-price">
                            <div>총 합계</div>
                            <div>???,???원</div>
                        </div>
                    </div>
                ) : (
                    <div className="price-container">
                        <div className="price-list">
                            <div className="detail1">
                                <div className="space">주문시간</div>
                                <div className="space">주고 받는 거리</div>
                                <div className="space">주문 금액</div>
                                <div className="space">상품 옵션</div>
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
                )
            }
        </div>
    )
}

export default Summary;