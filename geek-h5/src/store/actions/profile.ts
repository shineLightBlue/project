import { http } from '@/utils/http'
import type { RootThunkAction } from '@/types/store'
import type { User } from '@/types/data'
import type { UserResponse } from '@/types/data'
import type { UserProfileResponse, UserPhotoResponse } from '@/types/data'
import type { UserProfile } from '@/types/data'
// 我的页面 - 获取个人信息
export const getUser = (): RootThunkAction => {
    return async dispatch => {
        const res = await http.get<UserResponse>('/user')
        console.log(res)
        const { data, message } = res.data
        dispatch({ type: 'profile/getUser', payload: data })
    }
}
export const getUserProfile = (): RootThunkAction => {
    return async dispatch => {
        const res = await http.get<UserProfileResponse>('/user/profile')
        console.log(res)
        dispatch({ type: 'profile/getUserProfile', payload: res.data.data })
    }
}
export const updateUserProfile = (
    // 参数为 UserProfile 中的任意属性，也就是调用该 action 时，可以传入任意的用户信息
    // 从而来实现该接口的复用
    userProfile: Partial<UserProfile>
): RootThunkAction => {
    return async dispatch => {
        await http.patch('/user/profile', userProfile)
        dispatch({ type: 'profile/update', payload: userProfile })
    }
}
export const updateUserPhoto = (data: FormData): RootThunkAction => {
    return async dispatch => {
        const res = await http.patch<UserPhotoResponse>('/user/photo', data)
        dispatch({
            type: 'profile/update',
            payload: {
                photo: res.data.data.photo
            }
        })
    }
}