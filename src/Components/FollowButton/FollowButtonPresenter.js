import React from "react";
import Button from "../../Components/Button";

export default ({ isFollowing, onClick }) => {
    return <Button onClick={onClick} text={isFollowing ? "Unfollow" : "follow"} />;
};