import './index.scss'

export const GoodsItem = ({
  id,
  goods_count,
  goods_img,
  goods_name,
  goods_price,
  goods_state,
  changeState
}) => {
  function test(e) {
    console.log(e)
  }
  return (
    <div className="my-goods-item">
      <div className="left">
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="input"
            checked={goods_state}
            // onChange={e => {
            //   console.log(e.target.checked)
            // }}
            onChange={e => changeState(id, e.target.checked)}
          />
          <label className="custom-control-label" htmlFor="input">
            <img src={goods_img} alt="" />
          </label>
        </div>
      </div>
      <div className="right">
        <div className="top">{goods_name}</div>
        <div className="bottom">
          <span className="price">¥ {goods_price}</span>
          <span>counter组件</span>
        </div>
      </div>
    </div>
  )
}
