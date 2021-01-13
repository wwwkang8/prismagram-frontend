import React from "react";
import {withRouter} from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import {useQuery} from "react-apollo-hooks";
import {SEARCH} from "./SearchQueries";

// withRouter는 무슨 함수이지?
export default withRouter(({location: {search}}) => {
    const term = search.split("=")[1];
    const {data, loading} = useQuery(SEARCH, {
        skip: term === undefined,
        variables: {
            term
        }
    });
    console.log("-------검색된 유저데이터 확인하는 부분--------")
    console.log(data);

    return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
}); 