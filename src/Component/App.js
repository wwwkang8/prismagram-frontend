import React from "react";
import { ThemeProvider } from "styled-components";

// 동일한 폴더내의 Router.js import. 상대경로로 설정
import Router from "./Router";

//<Router isLoggedIn={false}/> <-- import한 Router를 호출하고 이때 인자는 isLoggedIn을 넣어서 보낸다
/**
 * App.js의 역할
 * index.js로 앱이 시작되면, App.js가 호출이 된다.
 * App.js는 Router.js를 호출하여 로그인 여부에 따라서 다른 페이지를 라우팅 하여 보여준다
 * 
 */

export default () => (
    <Router isLoggedIn={false} />
);

