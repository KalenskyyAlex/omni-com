import '../../../index.css';
import '../auth.css';
import React, {useRef, useState} from "react";

interface UserInputProps {
    inputCallback: Function;
    errorCallback: Function;
    label: string;
    for: string;
    type: string;
}

function UserInput(props: UserInputProps) {
    const [invalidInput, setInvalidInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        const [isError, errorMessage] = props.errorCallback(value);

        setInvalidInput(isError);
        setErrorMessage(errorMessage);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.inputCallback(inputRef.current?.value);
            event.preventDefault();
        }
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        props.inputCallback(event.target.value)
    }

    return (
        <div className="vertical-group gap8">
            <label htmlFor={props.for}>{props.label}</label>
            <input ref={inputRef}
                   type={props.type}
                   className={invalidInput ? "error" : ""}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   onKeyDown={handleKeyDown}/>
            {errorMessage.length > 0 ? <label className="error" htmlFor={props.for}>{errorMessage}</label> : null}
        </div>
    )
}

export default UserInput;