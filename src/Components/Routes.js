import Auth from "../Routes/Auth";
import Search from "../Routes/Search/index";
import Feed from "../Routes/Feed";
import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Profile from "../Routes/Profile";
import Explore from "../Routes/Explore";
import Resume from "../Routes/Resume";

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Feed} />
        <Route path="/explore" component={Explore} />
        <Route path="/search" component={Search}/>
        <Route path="/resume" component={Resume}/>
        <Route path="/:userName" component={Profile}/>
        <Redirect from = "*" to="/" />
    </Switch>
);

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth}/>
        <Redirect from = "*" to="/" />
    </Switch>
);

const AppRouter = ({ isLoggedIn }) => (
    <Switch>{ isLoggedIn ?  <LoggedInRoutes/> : <LoggedOutRoutes/> }</Switch>
);

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppRouter;