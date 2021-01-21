import React from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import {withRouter} from "react-router-dom";
import ProfilePresenter from "./ProfilePresenter";

export const GET_USER = gql`
    query seeUser($userName: String!){
        seeUser(userName: $userName){
            id
            avatar
            userName
            email
            firstName
            lastName
            followingCount
            followersCount
            postsCount
            posts{
                id
                files {
                    url
                }
                likeCount
                commentCount
            }
        }
    }
`;

export default withRouter(({ match: {params: {userName}} }) => {
    const { data, loading } = useQuery(GET_USER, { variables: {userName} });
    return <ProfilePresenter loading={loading} data={data} />;
});