import { gql } from 'apollo-boost';

// export const SEARCH = gql`
//     query searchUser($term: String!){
//         searchUser(term: $term){
//             id
//             avatar
//             userName
//             isFollowing
//             isSelf
//         }
//         searchPost(term: $term){
//             id
//             caption
//             location
//         }
//     }
// `;

export const SEARCH = gql`
    query searchPost ($term: String!){
        searchPost(term: $term){
            files{
                url
            }
            likeCount
        }
        searchUser(term: $term){
            id
            avatar
            userName
            isFollowing
            isSelf
        }
    }
`;