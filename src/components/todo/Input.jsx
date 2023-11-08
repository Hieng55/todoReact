import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Item from "./Item";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Input() {
    const [text, setText] = useState("");
    const [texts, setTexts] = useState([]);
    const [btn, setBtn] = useState(false);
    const [index, setIndex] = useState(null);
    const [active, setActive] = useState(null);
    const handleAdd = (e) => {
        console.log("render-add");
        e.preventDefault();
        if (text === "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please enter work before adding!",
            });
        } else {
            setTexts([...texts, text]);
            const input = document.querySelector(".value");
            input.focus();
            toast.success(" ADD SUCCESS", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setText("");
        }
    };
    const handleApplyEdit = (e) => {
        console.log("render-apply");
        e.preventDefault();
        const updateText = [...texts];
        updateText[index] = text;
        setTexts(updateText);
        setBtn(false);
        setActive(null);
        setText("");
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Update Successful",
            showConfirmButton: false,
            timer: 1500,
        });
    };
    return (
        <>
            <form>
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                <div className="form-todo">
                    <input
                        value={text}
                        className="value"
                        type="text"
                        placeholder="Please enter work"
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    />
                    <button onClick={handleAdd} className={`add ${btn ? "" : "active"}`}>
                        ADD
                    </button>
                    <button onClick={handleApplyEdit} className={`apply ${btn ? "active" : ""}`}>
                        APPLY EDIT
                    </button>
                </div>
                <Item
                    textInput={texts}
                    active={active}
                    setActive={setActive}
                    setTexts={setTexts}
                    setText={setText}
                    setBtn={setBtn}
                    setIndex={setIndex}
                />
            </form>
        </>
    );
}
