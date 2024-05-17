import type { User } from '@/types/data'
import type { ProfileAction } from '@/types/store'
import type { UserProfile } from '@/types/data'
type ProfileState = {
    user: User,
    userProfile: UserProfile
}
const initialState = {
    user: {},
    userProfile: {}
} as ProfileState
const profile = (state = initialState, action: ProfileAction): ProfileState => {
    switch (action.type) {
        case 'profile/getUser':
            return {
                ...state,
                user: action.payload
            }
        case 'profile/getUserProfile':
            return {
                ...state,
                userProfile: action.payload
            }
        case 'profile/update':
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    ...action.payload
                }
            }
        default:
            return state
    }
}

export default profile