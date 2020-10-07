import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";

import PropTypes from "prop-types";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

const LoggedInRoutes = () => (
    <>
        <Route exact path="/" component={Feed} />
    </>
);

const LoggedOutRoutes = () => (
    <>
        <Route exact path="/" component={Auth}/>
    </>
);

const Router = ({ isLoggedIn }) => (
    <Router>
        <Switch>{ isLoggedIn ?  <LoggedInRoutes/> : <LoggedOutRoutes/> }</Switch>
    </Router>
);

Router.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default Router;