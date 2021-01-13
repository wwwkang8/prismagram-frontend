import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/* styled-components를 사용하여 Button에 스타일 적용  */
const Container = styled.button`
    width: 100%;
    border: 0;
    border-radius: ${props => props.theme.borderRadius};
    color: white;
    font-weight: 600;
    background-color: ${props => props.theme.blueColor};
    text-align: center;
    padding: 7px 0px;
    font-size: 14px;
    cursor: pointer;
`;

// 컨테이너로 text를 감싼다
const Button = ({ text, onClick }) => (
    <Container onClick={onClick}>{text}</Container>
);

// 버튼에 들어오는 값은 text 값으로 제한해주는 것.
Button.propTypes = {
    text: PropTypes.string.isRequired
};

export default Button;