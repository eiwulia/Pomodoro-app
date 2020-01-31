import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";

const colorOptions = [
    {
        key: "Red",
        text: "Red",
        value: "red",
        label: { color: "red", empty: true, circular: true }
    },
    {
        key: "Blue",
        text: "Blue",
        value: "blue",
        label: { color: "blue", empty: true, circular: true }
    },
    {
        key: "Purple",
        text: "Purple",
        value: "purple",
        label: { color: "purple", empty: true, circular: true }
    },
    {
        key: "Orange",
        text: "Orange",
        value: "orange",
        label: { color: "orange", empty: true, circular: true }
    },
    {
        key: "Yellow",
        text: "Yellow",
        value: "yellow",
        label: { color: "yellow", empty: true, circular: true }
    },
    {
        key: "Pink",
        text: "Pink",
        value: "pink",
        label: { color: "pink", empty: true, circular: true }
    },
    {
        key: "Green",
        text: "Green",
        value: "green",
        label: { color: "green", empty: true, circular: true }
    }
];

const ColorDropdown = ({ chooseColor, usedTodoColor, pickNewColor }) => {
    const [color, setColor] = useState(usedTodoColor ? usedTodoColor : "pink");

    const pickColor = e => {
        let color = e.target.textContent.toLowerCase();
        setColor(color);

        if (usedTodoColor) {
            //edit
            pickNewColor(color);
        } else {
            //add new todo
            chooseColor(color);
        }
    };

    return (
        <span>
            <i className={`circle outline icon ${color}`}></i>
            <span className="text">Choose color theme</span>{" "}
            <Dropdown
                inline
                options={colorOptions}
                defaultValue={
                    usedTodoColor ? usedTodoColor : colorOptions[5].value
                }
                onChange={pickColor}
            />
        </span>
    );
};

export default ColorDropdown;
