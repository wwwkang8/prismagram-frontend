import React from "react";
import PropTypes from "prop-types"; /* 전달받은 데이터의 유효성을 검사하기 위해서 사용 */

/*
HashRouter : 주소 사이에 # 가 들어간다. localhost:3000/#/주소
장점 : 새로고침을 해도 화면이 이동되지 않고 그 주소화면 그대로 보여준다
단점 : 검색엔진에 검색되지 않는다. --> BrowserRouter가 이를 보완한다
Route : 요청받은 pathname에 해당하는 컴포넌트를 렌더링 한다. ex) path="/"에 대해서 Auth.js를 렌더링한다
Swtich : Path간의 충돌이 발생하지 않게 해주며, Route가 다수 있을 떄 제일 처음 매칭되는 path에 대한 Route만 렌더링.(C언어의 Switch문과 유사)

*/
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// 상대경로 방식 : 1개의 상위 폴더로 가서 Routes 폴더 하위의 Auth, Feed.js 파일을 import 한다
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";

/* 
LoggedInRoutes 함수기능
path="/"로 들어왔을 때 Feed.js를 렌더링하여 보여준다
exact 옵션을 사용하면 URL 경로가 정확하게 일치하여야 렌더링을 해준다
*/
const LoggedInRoutes = () => (
    <>
        <Route exact path="/" component={Feed}/>
    </>
);

const LoggedOutRoutes = () => (
    <>
        <Route exact path="/" component={Auth}/>
    </>
);

/**
 * AppRouter 함수
 * isLoggedIn 인자를 받아서 이 값의 true, false에 따라서 LoggedInRoutes, LoggedOUtRoutes를 보여준다
 * isLoggedIn <-- App.js에서 Router.js를 호출시에 넣어준 인자값.
 * 
 */
const AppRouter = ({ isLoggedIn }) => (
    <Router>
        <Switch>
            { isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/> }
        </Switch>
    </Router>
);

/**
 * PropTypes : 컴포넌트의 props에서 타입을 체크할떄 사용
 * AppRouter 컴포넌트의 isLoggedIn props 타입 체크
 * isLoggedIn은 bool 타입만 허용
 */
AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

 
export default AppRouter;


