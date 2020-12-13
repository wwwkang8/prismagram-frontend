import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// <Avatar /> 호출시 입력하는 size에 따라 number 분기처리
const getSize = size => {
    let number;
    if(size === "sm"){
        number = 30;
    }else if(size === "md"){
        number = 50;
    }else if(size === "lg"){
        number = 150;
    }

    return `
        width:${number}px;
        height:${number}px;
    `;
};

//getSize 함수를 호출하여 리턴 받은 결과에 따라 width, height가 설정된다.
const Container = styled.div`
    ${props => getSize(props.size)}
    background-image: url(${props => props.url});
    background-size: cover;
    border-radius: 50%;
`;

// <Avatar 사이즈 url /> 호출하면 아래와 같이 Container에 넣어서 리턴한다
const Avatar = ({size = "sm", url}) => <Container size={size} url={url} />

Avatar.propTypes = {
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    url: PropTypes.string.isRequired
};

export default Avatar;