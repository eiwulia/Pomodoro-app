import React, { useState, useEffect } from "react";
import { Message } from "semantic-ui-react";

const UserMessage = ({ status, action }) => {
    const [visible, setVisible] = useState(true);
    const [messageColor, setMessageColor] = useState("green");
    const [messageHeader, setMessageHeader] = useState("header");
    const [messageContent, setMessageContent] = useState("content");

    useEffect(() => {
        if (status === "success") {
            setMessageColor("green");
            setMessageHeader("Success!");
            setMessageContent("");
        } else if (status === "failure") {
            setMessageColor("red");
            setMessageHeader("We're sorry something went wrong");
            setMessageContent("Please try again!");
        }
    }, [status]);

    const handleDismiss = () => {
        setVisible(false);

        setTimeout(() => {
            setVisible(true);
        }, 2000);
    };

    if (visible) {
        return (
            <div className="fixed-user-message">
                <Message
                    color={messageColor}
                    onDismiss={handleDismiss}
                    header={messageHeader}
                    content={messageContent}
                />
            </div>
        );
    }

    return (
        <p>
            <br />
            <i>The message will return in 2s</i>
            <br />
            <br />
        </p>
    );
};

export default UserMessage;
