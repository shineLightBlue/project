import axios from "axios";
import store from "@/store";
import { Toast } from "antd-mobile";
import { customHistory } from "./history";
import { clearToken, setToken } from "./token";
import { logout } from "@/store/actions/login";
const baseURL = 'http://toutiao.itheima.net/v1_0'
const http = axios.create({
    baseURL,
    timeout: 5000
})
http.interceptors.request.use(config => {
    const { login: { token } } = store.getState()
    if (!config.url?.startsWith('/authorizations')) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
http.interceptors.response.use(undefined, async error => {
    console.log(error, 'error')
    if (!error.response) {
        Toast.show({
            content: '网络繁忙，请稍后再试',
            duration: 1000
        })
        return Promise.reject(error)
    }
    if (error.response.status === 401) {
        try {
            const { refresh_token } = store.getState().login
            if (!refresh_token) {
                await Promise.reject(error)
            }
            const res = await axios.put(`${baseURL}/authorizations`, null, {
                headers: {
                    Authorization: `Bearer ${refresh_token}`
                }
            })
            const tokens = {
                token: res.data.data.token,
                refresh_token
            }
            setToken(tokens)
            store.dispatch({ type: 'login/token', payload: tokens })
            return http(error.config)
        } catch (e) {
            store.dispatch({ type: 'login/logout' })
            clearToken()
            // token 过期，登录超时
            Toast.show({
                content: '登录超时，请重新登录',
                duration: 1000,
                afterClose: () => {
                    customHistory.push('/login', {
                        from: customHistory.location.pathname
                    })
                    // 触发退出 action，将 token 等清除
                    // store.dispatch(logout())
                }
            })
            return Promise.reject(error)
        }
    }
})

export { http }