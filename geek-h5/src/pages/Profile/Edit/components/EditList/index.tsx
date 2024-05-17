import styles from './index.module.scss'
type Props = {
  type: '' | 'gender' | 'photo'
  onUpdateProfile: (type: 'gender' | 'photo', value: string) => void
  onClose: () => void
}
const EditList = ({ onClose, type, onUpdateProfile }: Props) => {
  const genderList = [
    { text: '男', value: '0' },
    { text: '女', value: '1' }
  ]
  const photoList = [
    {
      text: '拍照', value: ''
    },
    {
      text: '本地选择', value: ''
    }
  ]
  const list = type === 'gender' ? genderList : photoList
  const onItemClick = (value: string) => {
    if (type === '') return
    onUpdateProfile(type, value)
  }
  return (
    <div className={styles.root}>
      {
        list.map(item => (
          <div className="list-item" key={item.text} onClick={() => onItemClick(item.value)}>{item.text}</div>
        ))
      }
      <div className="list-item" onClick={onClose}>取消</div>
    </div>
  )
}

export default EditList
