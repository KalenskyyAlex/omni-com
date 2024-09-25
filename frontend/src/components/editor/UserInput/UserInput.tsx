import '../../../index.css';
import './UserInput.css';
import React, {useRef, useState} from "react";

interface UserInputProps {
    returnInputCallback: Function;
}

function UserInput(props: UserInputProps) {
    const userInput = useRef<HTMLInputElement | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);

    userInput.current?.focus();
    const userInputOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setIsDisabled(true);
            props.returnInputCallback(userInput.current?.value);
        }
    }

    return (
        <input className="terminal-primary-text hack"
               ref={userInput}
               disabled={isDisabled}
               onKeyDown={userInputOnKeyDown}
               spellCheck={false}/>
    );
}

export default UserInput;