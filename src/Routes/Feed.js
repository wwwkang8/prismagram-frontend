import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import Helmet from "react-helmet";


const FEED_QUERY = gql`
    {
        seeFeed{
            id
            location
            caption
            user{
                id
                userName
                avatar
            }
            files{
                id
                url
            }
            likeCount
            isLiked
            comments{
                id
                text
                user{
                    id
                    userName
                }
            }
            createdAt
        }
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 70vh;
`;

export default () => {
    const { data, loading } = useQuery(FEED_QUERY);
    console.log(data);
    return (
        <Wrapper>
            <Helmet>
                <title>Feed | Prismagram</title>
            </Helmet>
            { loading && <Loader /> }
            {!loading &&
                data &&
                data.seeFeed &&
                data.seeFeed.map(post => (
                    <Post 
                        key={post.id} 
                        id={post.id}
                        user={post.user}
                        files={post.files}
                        likeCount={post.likeCount}
                        isLiked={post.isLiked}
                        comments={post.comments}
                        createdAt={post.createdAt}
                        caption={post.caption}
                        location={post.location}
                    />
                    )
                ) 
            }
        </Wrapper>
    )
};