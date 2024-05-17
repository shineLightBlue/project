// 导入用到的包
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/types/store'

// 创建 useInitialState 函数（自定义 hook）
// const useInitialState = (action: () => void, stateName: keyof RootState) => {
//     const dispatch = useDispatch()
//     const state = useSelector((state: RootState) => state[stateName])

//     useEffect(() => {
//         dispatch(action())
//     }, [dispatch, action])

//     return state
// }
const useInitialState = <StateName extends keyof RootState>(action: () => void, stateName: StateName, afterAction = () => { }) => {
    // console.log('useInitialState2')
    const dispatch = useDispatch()
    const actionRef = useRef(action)
    const state = useSelector((state: RootState) => state[stateName])
    // console.log(action, 'action')
    useEffect(() => {
        // console.log('useInitialState1')
        const actionFn = actionRef.current
        dispatch(actionFn())
        // dispatch(action())
        // console.log('dispatch')
        afterAction()
    }, [dispatch])

    return state
}

export { useInitialState }