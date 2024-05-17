import classNames from 'classnames'

// 创建组件自己的 props 类型
type Props = {
    type: string
    className?: string
    onClick?: () => void
}

// 使用该组件：
// <Icon type="iconbtn_like_sel" />
// <Icon type="xxx" />
export const Icon = ({ type, className, onClick }: Props) => {
    return (
        <svg
            className={classNames('icon', className)}
            aria-hidden="true"
            onClick={onClick}
        >
            {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
            {/* <use xlinkHref="#iconbtn_like_sel"></use> */}
            <use xlinkHref={`#${type}`}></use>
        </svg>
    )
}
