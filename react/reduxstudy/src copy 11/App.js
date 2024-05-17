import './App.scss'
import axios from 'axios'

// 导入子组件
import { CartHeader } from './components/CartHeader'
import { CartFooter } from './components/CartFooter'
import { GoodsItem } from './components/GoodsItem'
import { useEffect, useState } from 'react'
import { CountContext } from './count-context'

const http = axios.create({
    baseURL: 'http://localhost:8888'
})
export default function App() {
    const [goodsList, setGoodsList] = useState([])
    const [checkAll, setCheckAll] = useState(false)
    useEffect(() => {
        const loadData = async () => {
            const res = await http.get('/goodsList')
            console.log(res)
            setGoodsList(res.data)
            setCheckAll(res.data.every(item => item.goods_state))
        }
        loadData()
    }, [])
    // useEffect(() => {
    //     setCheckAll(goodsList.every(item => item.goods_state))
    // }, [goodsList])
    const changeState = async (id, checked) => {
        console.log(id, checked)
        const newGoodsList = goodsList.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    goods_state: checked
                }
            }
            return item
        })
        setGoodsList(newGoodsList)
        // 注意：此处遍历的是 newGoodsList 
        setCheckAll(newGoodsList.every(item => item.goods_state))
        // setCheckAll(goodsList.every(item => item.goods_state))

        await http.patch(`/goodsList/${id}`, {
            goods_state: checked
        })
    }
    const changeCheckAll = checkAll => {
        console.log(checkAll)
        setCheckAll(checkAll)
        setGoodsList(
            goodsList.map(item => {
                return {
                    ...item,
                    goods_state: checkAll
                }
            })
        )
        goodsList.forEach(item =>
            http.patch(`/goodsList/${item.id}`, {
                goods_state: checkAll
            })
        )
    }
    const totalCount = goodsList.reduce((prevCount, item) => {
        if (item.goods_state) {
            // 选中商品
            return prevCount + item.goods_count
        } else {
            // 未选中
            return prevCount
        }
    }, 0)
    const totalPrice = goodsList.reduce((prevPrice, item) => {
        if (item.goods_state) {
            // 选中商品
            return prevPrice + item.goods_count * item.goods_price
        }
        // 未选中
        return prevPrice
    }, 0)
    const changeCount = (id, goods_count) => {
        console.log('父组件中：', id, goods_count)
        setGoodsList(
            goodsList.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        goods_count
                    }
                }
                return item
            })
        )

        // 更新接口的数据
        http.patch(`/goodsList/${id}`, {
            goods_count
        })
    }
    return (
        <div className="app">
            {/* 标题 */}
            <CartHeader>购物车案例</CartHeader>

            {/* 商品列表项 */}
            <CountContext.Provider value={changeCount}>
                {goodsList.map(item => (
                    <GoodsItem key={item.id} {...item} changeState={changeState}></GoodsItem>
                ))}
            </CountContext.Provider>

            {/* 底部 */}
            <CartFooter checkAll={checkAll} changeCheckAll={changeCheckAll}
                totalCount={totalCount}
                totalPrice={totalPrice} />
        </div>
    )
}
