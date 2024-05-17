
import {
    Button,
    List,
    DatePicker,
    NavBar,
    Popup,
    Toast,
    Dialog
} from 'antd-mobile'
import classNames from 'classnames'
import { getUserProfile } from "@/store/actions/profile"
import { useInitialState } from '@/utils/use-initial-state'
import styles from './index.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { updateUserProfile, updateUserPhoto } from "@/store/actions/profile"
import { logout } from '@/store/actions/login'
import EditInput from './components/EditInput'
import EditList from "./components/EditList"
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'
const Item = List.Item
type InputPopup = {
    type: '' | 'name' | 'intro'
    value: string
    visible: boolean
}
type ListPopup = {
    type: '' | 'gender' | 'photo',
    visible: boolean
}
const ProfileEdit = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [inputPopup, setInputPopup] = useState<InputPopup>({
        type: '',
        value: '',
        visible: false
    })
    const [listPopup, setListPopup] = useState<ListPopup>({
        type: '',
        visible: false
    })
    const { userProfile } = useInitialState(getUserProfile, 'profile')
    const { photo, intro, gender, birthday } = userProfile
    const name = '人才'
    const onGenderShow = () => {
        setListPopup({
            type: 'gender',
            visible: true
        })
    }
    const onListPopupHide = () => {
        setListPopup({
            type: '',
            visible: false
        })
    }
    const onPhotoShow = () => {
        setListPopup({
            type: 'photo',
            visible: true
        })
    }
    const onInputShow = () => {
        // setInputVisible(true)
        setInputPopup({
            type: 'name',
            value: name,
            visible: true
        })
    }
    const onIntroShow = () => {
        setInputPopup({
            type: 'intro',
            value: intro,
            visible: true
        })
    }
    const onInputHide = () => {
        setInputPopup({
            type: '',
            value: '',
            visible: false
        })
    }
    const onUpdateProfile = async (type: 'name' | 'intro' | 'gender' | 'photo' | 'birthday', value: string) => {
        console.log('父组件拿到修改后的昵称:', type, value)
        if (type === 'photo') {
            fileRef.current?.click()
        } else {
            await dispatch(updateUserProfile({ [type]: value }))
            Toast.show({
                content: '更新成功',
                duration: 1000
            })
            if (type === 'name' || type === 'intro') {
                onInputHide()
            } else if (type === 'gender') {
                onListPopupHide()
            }
        }
    }
    const onChangePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        const file = e.target.files?.[0]
        if (!file) return
        const photoData = new FormData()
        photoData.append('photo', file)
        await dispatch(updateUserPhoto(photoData))
        onListPopupHide()
    }
    const fileRef = useRef<HTMLInputElement>(null)
    const [showBirthday, setShowBirthday] = useState(false)
    const onBirthdayShow = () => {
        setShowBirthday(true)
    }
    const onBirthdayHide = () => {
        setShowBirthday(false)
    }
    const onUpdateBirthday = (value: Date) => {
        console.log(value)
        const birthday = dayjs(value).format('YYYY-MM-DD')
        onUpdateProfile('birthday', birthday)
        onBirthdayHide()
    }
    const onLogout = () => {
        const handler = Dialog.show({
            title: '温馨提示',
            content: '亲，你确定退出吗？',
            actions: [
                [
                    {
                        key: 'cancel',
                        text: '取消',
                        onClick: () => {
                            handler.close()
                        }
                    },
                    {
                        key: 'confirm',
                        text: '退出',
                        style: {
                            color: 'var(--adm-color-weak)'
                        },
                        onClick: () => {
                            console.log('12312')
                            dispatch(logout())
                            handler.close()
                            history.replace('/login')
                        }
                    }
                ]
            ]
        })
    }
    return (
        <div className={styles.root}>
            <div className="content">
                {/* 标题 */}
                <NavBar
                    onBack={() => history.go(-1)}
                    style={{
                        '--border-bottom': '1px solid #F0F0F0'
                    }}
                >
                    个人信息
                </NavBar>

                <div className="wrapper">
                    {/* 列表 */}
                    <List className="profile-list">
                        {/* 列表项 */}
                        <Item
                            extra={
                                <span className="avatar-wrapper">
                                    <img
                                        width={24}
                                        height={24}
                                        src={photo}
                                        alt=""
                                    />
                                </span>
                            }
                            arrow
                            onClick={onPhotoShow}
                        >
                            头像
                        </Item>
                        <Item arrow extra={'黑马先锋'} onClick={onInputShow}>
                            昵称
                        </Item>
                        <Item
                            arrow
                            extra={
                                <span className={classNames('intro', 'normal')}>
                                    {'未填写'}
                                </span>
                            }
                            onClick={onIntroShow}
                        >
                            简介
                        </Item>
                    </List>

                    <List className="profile-list">
                        <Item arrow extra={'男'} onClick={onGenderShow}>
                            性别
                        </Item>
                        <Item arrow extra={birthday} onClick={onBirthdayShow}>
                            生日
                        </Item>
                    </List>
                    <DatePicker
                        visible={showBirthday}
                        onCancel={onBirthdayHide}
                        value={new Date(birthday)}
                        title="选择年月日"
                        min={new Date(1900, 0, 1, 0, 0, 0)}
                        max={new Date()}
                        onConfirm={onUpdateBirthday}
                    />
                    <input type='file' hidden ref={fileRef} onChange={onChangePhoto} ></input>
                </div>

                <div className="logout">
                    <Button className="btn" onClick={onLogout}>退出登录</Button>
                </div>
            </div>
            <Popup visible={inputPopup.visible} position="right">
                <EditInput onClose={onInputHide} type={inputPopup.type} value={inputPopup.value} onUpdateProfile={onUpdateProfile} />
            </Popup>
            <Popup visible={listPopup.visible} onMaskClick={onListPopupHide}>
                <EditList onClose={onListPopupHide} type={listPopup.type} onUpdateProfile={onUpdateProfile}></EditList>
            </Popup>
        </div>
    )
}
export default ProfileEdit
