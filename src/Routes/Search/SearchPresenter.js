import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import PropTypes from "prop-types";


const Wrapper = styled.div`
    height: 50vh;
    text-align: center;
`;



const SearchPresenter = ({ searchTerm , loading}) => (
    <Wrapper>
        {searchTerm === undefined && <FatText text={"Search for something"}/>}
    </Wrapper>
);

SearchPresenter.propTypes = {
    searchTerm: PropTypes.string,
    loading: PropTypes.bool
};

export default SearchPresenter;