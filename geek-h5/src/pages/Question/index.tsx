import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom'

const Question = (props: RouteProps) => {
    console.log(props, 'Question')
    return (
        <div>Question</div>
    )
}
export default Question