import classNames from "classnames"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeActive, getChannels } from '../store/actions/channels'
export const Channel = () => {
    const dispatch = useDispatch()
    const { list, activeId } = useSelector(state => state.channels)
    useEffect(() => {
        dispatch(getChannels())
    }, [dispatch])
    return (
        <ul className="category">
            {
                list.map(item => (
                    <li key={item.id} className={classNames({
                        select: activeId === item.id
                    })} onClick={() => dispatch(changeActive(item.id))}>
                        {item.name}
                    </li>
                ))
            }
        </ul>
    )
}