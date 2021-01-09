import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, User, Logo, Resume } from "./Icons";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

const ME = gql`
  {
    me {
      userName
      id
    }
  }
`;

export default withRouter(({ history }) => {
  const search = useInput("");
  const { data } = useQuery(ME);

  // useQuery(ME) 로 조회한 me 데이터 출력.
  // undefined 일 때는 데이터가 없기 때문에 data.me가 오류 발생
  if(data !== undefined){
      console.log(data.me);
  }

  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput 
                  value={search.value} 
                  onChange={search.onChange} 
                  placeholder="Search" />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/resume">
            <Resume />
          </HeaderLink>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          { !(data !== undefined && data.me) ? 
            <HeaderLink to="/#">
              <User />
            </HeaderLink>
            :
            <HeaderLink to={data.me.userName}>
              <User />
            </HeaderLink>
          }
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});