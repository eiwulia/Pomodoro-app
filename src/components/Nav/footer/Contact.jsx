import React from "react";

const Contact = () => {
    return (
        <div className="ui raised very padded center aligned segment">
            <h2 className="ui header">Send me an email</h2>

            <form className="ui form">
                <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input type="text" name="name" placeholder="Name" />
                    </div>
                </div>

                <div className="field">
                    <div className="ui left icon input">
                        <i className="mail icon"></i>
                        <input
                            type="text"
                            name="email"
                            placeholder="E-mail address"
                        />
                    </div>
                </div>
                <div className="field">
                    <textarea placeholder="Your message"></textarea>
                </div>
                <button className="ui fluid large submit button" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Contact;
