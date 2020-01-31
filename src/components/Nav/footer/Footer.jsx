import React from "react";
import { Link } from "react-router-dom";
import tom from "../../../assets/tomatoe.png";

const Footer = () => {
    return (
        <footer>
            <div className="ui inverted vertical footer segment">
                <div className="ui center aligned container">
                    <img
                        src={tom}
                        className="ui centered mini image"
                        alt="logo"
                    />
                    <div className="ui horizontal inverted small divided link list">
                        <Link className="item" to="/contact">
                            Contact Me
                        </Link>
                        <Link className="item" to="/terms-and-conditions">
                            Terms and Conditions
                        </Link>
                        <Link className="item" to="/privacy-policy">
                            Privacy policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
