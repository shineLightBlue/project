import { Route, RouteProps } from 'react-router-dom'
export const KeepAlive = ({ children, ...rest }: RouteProps) => {
    console.log(children, rest)
    const child = children as React.ReactNode
    return (
        <Route {...rest} children={props => {
            const isMatch = props.match !== null
            console.log(props)
            return (
                //
                <div style={{ display: isMatch ? 'block' : 'none' }}>{child}</div>
            )
        }} />
    )
}