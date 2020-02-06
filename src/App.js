import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import queryString from "query-string";

import Header from "./components/Nav/Header";
import ContentRouting from "./components/ContentRouting";
import Footer from "./components/Nav/footer/Footer";

import "./styles/styles.css";

const App = () => {
    const [user, setUser] = useState(null);

    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        //check first if user is saved in local storage
        let user = JSON.parse(localStorage.getItem("user"));
        // console.log("what do i get from loal storage?, ", user);
        if (user) {
            // console.log("user exists");
            setUser(user);
        }

        // SAVE USER TO LOCALSTORAGE IF THERES A QUERY
        const query = queryString.parse(location.search);
        // console.log("query: ", query);

        if (query && query.user && query.email) {
            console.log("creating user");
            let user = {
                userEmail: query.email,
                userId: query.user,
                userName: query.name
            };
            window.localStorage.setItem("user", JSON.stringify(user));
            history.push("/");
        }
    }, [history, location.search]);

    const userStateUpdater = updater => {
        setUser(updater);
        // console.log(
        //     "state from state updater: ",
        //     user,
        //     "with updater: ",
        //     updater
        // );
    };

    return (
        <div>
            <Router>
                <Header user={user} userStateUpdater={userStateUpdater} />
                <main>
                    <ContentRouting user={user}></ContentRouting>
                </main>
                <Footer />
            </Router>
        </div>
    );
};

export default App;

// import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import queryString from "query-string";

// import Header from "./components/Nav/Header";
// import ContentRouting from "./components/ContentRouting";
// import Footer from "./components/Nav/footer/Footer";

// import "./styles/styles.css";

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { user: null };
//     }

//     componentDidMount() {
//         //check first if user is saved in local storage
//         const user = JSON.parse(localStorage.getItem("user"));
//         console.log("what do i get from loal storage?, ", user);
//         if (user) {
//             console.log("user exists");
//             this.setState({ user: user.userName });
//         }

//         // SAVE USER TO LOCALSTORAGE
//         const query = queryString.parse(this.props.location.search);
//         console.log("query: ", query);

//         if (query.user && query.email) {
//             let user = {
//                 userEmail: query.email,
//                 userId: query.user,
//                 userName: query.name
//             };
//             window.localStorage.setItem("user", JSON.stringify(user));
//             this.props.history.push("/");
//         }

//         // const userfromLocalStorage = localStorage.getItem("user");
//         // console.log("user from local storage: ", userfromLocalStorage);
//         // this.setState({ user: userfromLocalStorage });
//     }

//     userStateUpdater = updater => {
//         this.setState({ user: updater });
//         console.log("state from state updater: ", this.state.user);
//     };

//     render() {
//         return (
//             <div>
//                 <Router>
//                     <Header
//                         user={this.state.user}
//                         userStateUpdater={this.userStateUpdater}
//                     />
//                     <main>
//                         <ContentRouting user={this.state.user}></ContentRouting>
//                     </main>
//                     <Footer />
//                 </Router>
//             </div>
//         );
//     }
// }

// export default App;
