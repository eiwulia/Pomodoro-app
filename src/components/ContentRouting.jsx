import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Contact from "../components/Nav/footer/Contact";
import FooterInfo from "../components/Nav/footer/FooterInfo";

const ContentRouting = ({ user, totalTomPoints }) => {
    const [routes] = useState([
        { exact: true, path: "/", component: Home },
        { exact: false, path: "/login", component: Home },
        { exact: false, path: "/logout", component: Home },
        { exact: false, path: "/home", component: Home },
        { exact: false, path: "/contact", component: Contact },
        { exact: false, path: "/terms-and-conditions", component: FooterInfo },
        { exact: false, path: "/privacy-policy", component: FooterInfo }
    ]);

    const Routes = routes.map((route, index) => (
        <Route
            key={index}
            exact={route.exact}
            path={route.path}
            render={({ match }) => (
                <route.component
                    match={match}
                    user={user}
                    totalTomPoints={totalTomPoints}
                />
            )}
        />
    ));

    return <Switch>{Routes}</Switch>;
};

export default ContentRouting;
