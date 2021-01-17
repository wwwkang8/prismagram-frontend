import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import PropType from "prop-types";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import PropTypes from "prop-types";

/** Wrapper 생성 */
const Wrapper = styled.div`
    height: 50vh;
`;

const Section = styled.div`
    margin-bottom: 15px;
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, lfr);
    grid-template-rows: 160px;
    grid-auto-rows: 160px;
`;

/** SearchPresenter 조립 로직 */
const SearchPresenter = ({ searchTerm, loading, data }) => {
    if(searchTerm === undefined){ // 검색어가 정의되지 않은 것이 넘어왔을때
        return (
            <Wrapper>
                <FatText text= "Search for something" />
            </Wrapper>
        );
    }else if(loading ===  true){ //로딩되고 있는 경우
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        )
    }else if(data && data.searchUser && data.searchPost){ // 검색된 데이터가 존재할 경우
        return (
            <Wrapper>
                <Section>
                    { data.searchUser.length === 0 ? (
                        <FatText text="No Users Found" />
                    ) : (
                        data.searchUser.map(user => (
                            <UserCard
                                id={user.id}
                                userName={user.userName}
                                isFollowing={user.isFollowing}
                                isSelf={user.isSelf}
                            />
                        ))
                    )}
                </Section>
                <Section>
                    {data.searchPost.length === 0 ? ( // 검색 포스팅이 없다면 post not found 출력
                        <FatText text="No Post found"/>
                    ) : (
                        data.searchPost.map(post => null)
                    )}
                </Section>
            </Wrapper>
        )
    }
};

SearchPresenter.propTypes = {
    searchTerm: PropTypes.string,
    loading: PropTypes.bool
};

export default SearchPresenter;