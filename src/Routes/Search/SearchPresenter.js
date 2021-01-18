import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

/** Wrapper div를 생성 */
const Wrapper = styled.div`
    height: 50vh;
`;

/** Section div를 생성 */
const Section = styled.div`
    margin-bottom: 15px;
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, 160px);
    grid-template-rows: 160px;
    grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
`;

/** SearchPresenter 호출시 렌더링 로직 */
const SearchPresenter = ({ searchTerm, loading, data }) => { //검색어, 로딩여부, 데이터(User, Post 검색결과)
    if(searchTerm === undefined){ // 검색어가 없는 경우, 검색어 입력 요청 문구 표기
        return (
            <Wrapper>
                <FatText text = "Search for something"/>
            </Wrapper>
        );
    }else if(loading === true){ // 로딩 중인 경우에는 Loader를 호출한다. 로고가 깜박이는 것
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        )
    }else if(data && data.searchUser && data.searchPost) { //data, 검색 유저, 검색 포스팅이 존재할 경우
        return (
            <Wrapper>
                <Section>
                    {data.searchUser.length === 0 ? ( //유저가 없는 경우
                        <FatText text="No Users found"/>
                    ) : (
                        data.searchUser.map(user => (//유저가 있는 경우 for문을 돌려서, 각 유저의 정보를 UserCard에 넣어서 출력
                            <UserCard
                                id={user.id}
                                userName={user.userName}
                                isFollowing={user.isFollowing}
                                url={user.avatar}
                                isSelf={user.isSelf}
                            />
                             
                        ))
                    )}
                </Section>
                <PostSection>
                    {data.searchPost.length === 0 ? ( // 검색 포스팅이 없다면 post not found 출력
                        <FatText text="No Post found"/>
                    ) : (
                        data.searchPost.map(post => (
                            <SquarePost 
                                key={post.id}
                                likeCount={post.likeCount} 
                                commentCount={post.commentCount} 
                                file={post.files[0]}  />
                        ))
                    )}
                </PostSection>
            </Wrapper>
        )
    }
}


SearchPresenter.propTypes = {
    searchTerm: PropTypes.string,
    loading: PropTypes.bool
};

export default SearchPresenter;