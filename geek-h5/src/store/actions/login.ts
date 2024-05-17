import { RootThunkAction } from "@/types/store";
import { http } from "@/utils/http";
import { setToken, clearToken } from "@/utils/token";
import { LoginResponse } from '@/types/data'

type LoginParams = {
    mobile: string
    code: string
}

export const login = (data: LoginParams): RootThunkAction => {
    return async dispatch => {
        // 为该接口的返回值指定类型
        const res = await http.post<LoginResponse>('/authorizations', data)
        console.log(res)
        const { data: token } = res.data
        // 将 token 数据存储到本地缓存中
        setToken(token)
        // 分发 action 将 token 存储到 redux 中
        dispatch({ type: 'login/token', payload: token })
    }
}

// 获取验证码
export const getCode = (mobile: string): RootThunkAction => {
    return async () => {
        // try {
        const res = await http.get(`/sms/codes/${mobile}`)
        console.log(res, 'getCode')
        // } catch (error) {
        //     console.log(error)
        // }

    }
}
export const logout = (): RootThunkAction => {
    return async dispatch => {
        dispatch({ type: 'login/logout' })
        clearToken()
    }
}
