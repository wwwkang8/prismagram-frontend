import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Button from "./Button";
import {Link} from "react-router-dom";

const Card = styled.div`
    ${props => props.theme.whiteBox}
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const EAvatar = styled(Avatar)`
    margin-bottom: 15px;
`;

const ELink = styled(Link)`
    color: inherit;
    margin-bottom: 10px;
`;

/** UserCard 호출 입력 파라메터 : userName, isFollowing, url, isSelf
 * Card  div를 만들어서 그 안에 Avatar url, 유저이름, 팔로잉/언팔로잉 입력
 */
const UserCard = ({ userName, isFollowing, url, isSelf }) => (
    <Card>
        <EAvatar url={ url } size="md" />
        <ELink to={`/${userName}`}>
            <FatText text={ userName } />
        </ELink>    
        {!isSelf && <Button text={isFollowing ? "Unfollowing" : "following" }/>}
    </Card>
);

/** UserCard 파라메터에 대한 필터 */
UserCard.propTypes = {
    userName: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    isSelf: PropTypes.bool.isRequired
};

export default UserCard;