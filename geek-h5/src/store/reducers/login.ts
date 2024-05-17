import { Token } from "@/types/data"
import { LoginAction } from '@/types/store'

const initialState: Token = {
    token: '',
    refresh_token: ''
}
const login = (state = initialState, action: LoginAction): Token => {
    switch (action.type) {
        case 'login/token':
            return action.payload
        case 'login/logout':
            return initialState
        default:
            return state
    }
}
export default login