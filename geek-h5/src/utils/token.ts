import { Token } from "@/types/data";
const GEEK_TOKEN_KEY = 'geek-h5-token'
// export const getToken = (): Token => JSON.parse(localStorage.getItem(GEEK_TOKEN_KEY) || '{}')
export const getToken = () =>
    JSON.parse(
        localStorage.getItem(GEEK_TOKEN_KEY) ??
        '{ "token": "", "refresh_token": "" }'
    ) as Token
export const setToken = (token: Token) => localStorage.setItem(GEEK_TOKEN_KEY, JSON.stringify(token))
export const clearToken = () => localStorage.removeItem(GEEK_TOKEN_KEY)
export const isAuth = () => !!getToken().token