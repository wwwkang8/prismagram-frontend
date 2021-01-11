import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";


const Wrapper = styled.div`
    height: 50vh;
`;

const Section = styled.div`

`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
    if(searchTerm === undefined){
        return (
            <Wrapper>
                <FatText text = "Search for something"/>
            </Wrapper>
        );
    }else if(loading === true){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        )
    }else if(data && data.searchUser && data.searchPost) {
        return (
            <Wrapper>
                <Section>
                    {data.searchUser.length === 0 ? (
                        <FatText text="No Users found"/>
                    ) : (
                        data.searchUser.map(user => (
                            <UserCard
                                userName={user.userName}
                                isFollowing={user.isFollowing}
                                url={user.url}
                                isSelf={user.isSelf}
                            />
                             
                        ))
                    )}
                </Section>
                <Section>
                    {data.searchPost.length === 0 ? (
                        <FatText text="No Post found"/>
                    ) : (
                        data.searchPost.map(post => null)
                    )}
                </Section>
            </Wrapper>
        )
    }
}


SearchPresenter.propTypes = {
    searchTerm: PropTypes.string,
    loading: PropTypes.bool
};

export default SearchPresenter;