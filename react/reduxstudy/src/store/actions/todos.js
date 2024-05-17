// 导入 action types
import * as types from '../actionTypes/todos'

// 创建删除任务的 action 并导出
export const delTodo = id => ({
    type: types.DEL_TODO,
    payload: id
})
// 创建切换任务完成状态的 action 并导出
export const toggleTodo = (id, checked) => ({
    type: types.TOGGLE_TODO,
    // 如果 payload 有多个数据，可以使用对象
    payload: {
        id,
        checked
    }
})


// 添加任务
export const addTodo = text => ({
    type: types.ADD_TODO,
    payload: text
})
// 全选或反选
export const toggleAll = checked => ({
    type: types.TOGGLE_ALL,
    payload: checked
})
// 清除已完成任务
export const clearAll = () => ({
    type: types.CLEAR_ALL
})

// 修改任务名称
export const updateTodo = (id, text) => ({
    type: types.UPDATE_TODO,
    payload: {
        id,
        text
    }
})
