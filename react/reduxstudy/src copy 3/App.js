import React, { createContext, useState, useContext } from "react";
import './App.css'
const ColorContext = createContext({
    color: 'orange',
    setColor: () => { }
})
const Node = () => (
    <div className="node">
        Node
        <SubNode />
    </div>
)
const SubNode = () => {
    const { color, setColor } = useContext(ColorContext)
    const fn = () => {
        console.log(color)
    }
    return <div className="sub-node">
        SubNode ={'>'}&gt; {color}{' '}
        <button
            onClick={() => {
                setColor('#898989')
                fn()
            }}
        >
            修改 color
        </button>
        <Child />
    </div>
}

const Child = () => (
    <div className="child">
        Child：
        <ColorContext.Consumer>
            {value => (
                <span style={{ color: value.color }}>
                    Consumer 消费数据：{value.color}
                    <button onClick={() => value.setColor('red')}>修改color</button>
                </span>
            )}
        </ColorContext.Consumer>
    </div>
)
export default function App() {
    const [color, setColor] = useState('blue')

    return (
        // JSX 中可以通过 a.b 形式来作为组件标签的名称
        // <ColorContext.Provider value={color}>
        <ColorContext.Provider
            value={{
                color,
                setColor
            }}
        >
            <div className="app">
                <h1>我是App组件 - {color}</h1>
                <Node />
            </div>
        </ColorContext.Provider>
    )
}