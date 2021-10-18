import "./ComputeMain.css"
import Card from "../card/Card.js"
import Table from '../table/Table.js'

function ComputeMain() {
  return (
    <div className="ComputeMain">
      <div className="header">
        <h1 className="top-header-text">e-풀필먼트 배송비 계산기</h1>
        <h5 className="bottom-header-text">입고비와 보관비는 제외되어 있어요.</h5>
      </div>
      <div className="body">
        <form className="post-form" action="" method="post">
          <div className="post-code">
            <span>배송 권역</span>
            <input type="text" name="" id="" placeholder ="수도권/비수도권"/>
          </div>
          <div className="post-option">
            <span>배송 옵션</span>
            <input type="text" name="" id="" placeholder ="일반배송/당일배송/새벽배송"/>
          </div>
          <div className="product-option">
            <span>상품 옵션</span>
            <input type="text" name="" id="" placeholder ="상온/냉장/냉동"/>
          </div>
          <button className="submit-btn">
            계산하기
          </button>
        </form>
      </div>
      <div className="result-list">
        <Table />
        <Card />
      </div>
    </div>
  );
}

export default ComputeMain;
