import { Select } from 'antd'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getChannels } from '@/store/actions'

const { Option } = Select

// export const Channel = ({ ...rest }) => {
// console.log(rest)
export const Channel = ({ value, onChange, width }) => {
  const dispatch = useDispatch()
  const { channels } = useSelector(state => state.article)

  useEffect(() => {
    dispatch(getChannels())
  }, [dispatch])

  return (
    <Select
      placeholder="请选择文章频道"
      value={value}
      onChange={onChange}
      style={{ width: width }}
    >
      {channels.map(item => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
  )
}
