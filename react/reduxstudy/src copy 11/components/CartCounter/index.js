import './index.scss'
import { useContext } from 'react'
import { CountContext } from '../../count-context'
export const CartCounter = ({ id, count }) => {
    const changeCount = useContext(CountContext)
    return (
        <div className="my-counter">
            <button type="button" className="btn btn-light" onClick={() => changeCount(id, count - 1)}>
                -
            </button>
            <input type="input" className="form-control inp"
                value={count}
                // 注意： e.target.value 是字符串，此处，需要转化为 数值 才可以
                onChange={e => changeCount(id, +e.target.value)} />
            <button type="button" className="btn btn-light" onClick={() => changeCount(id, count + 1)}>
                +
            </button>
        </div>
    )
}