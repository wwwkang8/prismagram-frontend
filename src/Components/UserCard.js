import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Button from "./Button";

const Card = styled.div`

`;

/** UserCard 호출 입력 파라메터 : userName, isFollowing, url, isSelf
 * Card  div를 만들어서 그 안에 Avatar url, 유저이름, 팔로잉/언팔로잉 입력
 */
const UserCard = ({ userName, isFollowing, url, isSelf }) => (
    <Card>
        <Avatar url={ url }/>
        <FatText text={ userName } />
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