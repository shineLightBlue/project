import classNames from 'classnames'
const Tabs = ({ tabs, active, changeTab }) => {
    return (
        <div className="tabs-order">
            <ul className="sort-container">
                {tabs.map(item => (
                    <li key={item.id} className={classNames({
                        on: item.type === active
                    })}
                        onClick={() => changeTab(item.type)}
                    >
                        按{item.name}排序
                    </li>
                ))

                }
            </ul>
        </div>
    )
}

export default Tabs
