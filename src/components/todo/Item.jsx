import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Item(props) {
    const { textInput, setTexts, setText, setBtn, setIndex, setActive, active } = props;
    const [isChecked, setIsChecked] = useState(false);
    const handleRemove = (index) => {
        console.log("render-remove")
        Swal.fire({
            title: "Are you sure you want to delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                const newItems = [...textInput];
                newItems.splice(index, 1);
                setTexts(newItems);
                setActive(null);
                setText("");
                Swal.fire("DELETED!", "DELETED SUCCESSFULLY.", "success");
            }
        });
    };
    const handleEdit = (index) => {
        console.log("render-edit")
        const newItems = [...textInput];
        setText(newItems[index]);
        setActive(index);
        setIndex(index);
        setBtn(true);
    };

    return (
        <>
            <ul>
                {textInput.map((text, index) => {
                    return (
                        <li className={active === index ? "active" : ""} key={index}>
                            <div className="text">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                        setIsChecked(e.target.checked);
                                        Swal.fire({
                                            title: "Are you sure you want to delete them all?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#d33",
                                            cancelButtonColor: "#3085d6",
                                            confirmButtonText: "Delete",
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                Swal.fire("DELETED!", "DELETED SUCCESSFULLY.", "success");
                                                setTexts([]);
                                                setIsChecked(false);
                                            } else {
                                                setIsChecked(false);
                                            }
                                        });
                                    }}
                                />
                                <p>{text} </p>
                            </div>
                            <div className="btn">
                                <span
                                    className="edit"
                                    onClick={() => {
                                        handleEdit(index);
                                    }}
                                >
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </span>
                                <span className="remove" onClick={handleRemove}>
                                    <i className="fa-solid fa-trash"></i>
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
