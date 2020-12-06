import React from 'react';
import { gql } from "apollo-boost";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import { HashRouter as Router } from "react-router-dom";
import Theme from "../Styles/Theme";
import Routes from "./Router";
import { useQuery } from 'react-apollo-hooks';
import Footer from "./Footer";
import Header from "./Header";
/* react-toastify를 import */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;


export default () => {

    const { data: {isLoggedIn} } = useQuery(QUERY);

    console.log(isLoggedIn);

    // ToastContainer를 App.js에서 호출하고, ToastContainer는 toast의 전반적인 위치나 이런것들을 설정해주는 최상위 컴포넌트
    return (
        <ThemeProvider theme={Theme}>
          <>
            <GlobalStyles />
            <Router>
              <>
                <Header/>
                <Wrapper>
                  <Routes isLoggedIn = {isLoggedIn}/>
                  <Footer/>
                </Wrapper>
              </>
            </Router>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
          </>
        </ThemeProvider>
    );
};
