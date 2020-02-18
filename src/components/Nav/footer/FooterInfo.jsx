import React from "react";

const FooterInfo = () => {
    return (
        <div className="ui raised very padded center aligned segment">
            {/* <div className="centered-wrapper"> */}
            <h2>Terms and Conditions</h2>
            <ol>
                <li>Have fun using the website</li>
                <li>Work on those goals!</li>
                <li>Spread the good word</li>
            </ol>
            <div>
                <img
                    src="https://media.giphy.com/media/1zi2SFsjUwzB0at4h1/200w_d.gif"
                    alt="tomatoe"
                />
                <p>
                    via{" "}
                    <a href="https://giphy.com/gifs/subway-sverige-funny-cute-1zi2SFsjUwzB0at4h1">
                        GIPHY
                    </a>
                </p>
            </div>
            <div className="ui divider"></div>
            <h2>Privacy policy</h2>

            <p>
                We do not share personal information with third-parties nor do
                we store information we collect about your visit to this website
                for use other than to make it easier for you to use the website
                through the use of cookies, which you can turn off at anytime by
                modifying your internet browser's settings. We use cookies to
                save user login status and to make it easier to come back and
                use the website. This privacy policy is subject to change
                without notice.
            </p>
        </div>
    );
};

export default FooterInfo;
