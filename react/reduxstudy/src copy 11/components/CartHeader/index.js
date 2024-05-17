import './index.scss'

// 创建组件并导出
export const CartHeader = ({ children = '购物车' }) => {
  return <div className="my-header">{children}</div>
}
