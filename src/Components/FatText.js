import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/* 폰트에 대한 옵션을 Text 변수에 넣는다 */
const Text = styled.span`
    font-weight: 600;
    margin-left: 15px;
`;

// text를 매개변수로 받으면, 그 text를 <Text>로 감싸서 적용한다.
const FatText = ({ text, className }) => (
    <Text className={className}>{text}</Text>
);

// FatText의 propTypes를 설정하여 String이 들어올 수 있도록 제한을 건다.
FatText.propTypes = {
    text: PropTypes.string.isRequired
};

export default FatText;