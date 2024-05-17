import React, { useRef, useState } from 'react';
import './App.scss';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login'
import Layout from './pages/Layout'
import { AuthRoute } from './components/AuthRoute'
import { customHistory } from './utils/history';
import ProfileEdit from '@/pages/Profile/Edit'
import Article from './pages/Article';
import Search from './pages/Search';
import SearchResult from './pages/Search/Result'
import Chat from './pages/Profile/Chat';
import { KeepAlive } from './components/KeepAlive'

function App() {
  // type Channel = {
  //   id:number
  //   name:string
  // }
  // const [name,setName] = useState<String>('jack')
  // const [list,setList] = useState<Channel[]>([])
  // const inputRef = useRef<HTMLInputElement>(null)
  // const getValue = ()=>{
  //   if(!inputRef.current) return
  //   console.log(inputRef.current.value)
  // }
  return (
    <Router history={customHistory}>
      <div className="App">
        <KeepAlive path="/home">
          <Layout />
        </KeepAlive>
        {/* <input type="text" ref={inputRef}/> */}
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login"></Redirect>}></Route>
          {/* <Route path="/home" component={Layout}></Route> */}
          <Route path="/login" component={Login}></Route>
          <AuthRoute path="/profile/edit">
            <ProfileEdit />
          </AuthRoute>
          <AuthRoute path="/chat">
            <Chat />
          </AuthRoute>
          <Route path="/article/:id">
            <Article></Article>
          </Route>
          <Route exact path="/search">
            <Search></Search>
          </Route>
          <Route path="/search/result">
            <SearchResult></SearchResult>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
