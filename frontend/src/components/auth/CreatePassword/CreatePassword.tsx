import '../../../index.css';
import '../auth.css';
import UserInput from "../UserInput/UserInput";
import {lengthError, matchError, noCapitalError, noError, noSpecialSymbolError} from "../validators";
import React, {useEffect, useState} from "react";

function CreatePassword({name = "Password"}) {
    const [passwordValid, setPasswordValid] = useState(false);
    const [password, setPassword] = useState("");

    const errorCallbackPassword = (value: string, name: string) => {
        setPassword(value);

        return [false, []]
    }

    const errorCallbackConfirmPassword = (value: string, name: string) => {
        return matchError(value, "passwords", password);
    }

    useEffect(() => {
        setPasswordValid(!(lengthError(password, "", 8)[0]
            || noCapitalError(password, "")[0]
            || noSpecialSymbolError(password, "")[0]));
    }, [password]);

    return <div className={"vertical-group" + (passwordValid ? " gap24" : " gap16")}>
        <UserInput
            label={name}
            type="password"
            for="password"
            inputCallback={() => {}}
            errorCallback={errorCallbackPassword}/>
        {
            passwordValid ?
                <UserInput
                    label={"Confirm " + name}
                    type="password"
                    for="password"
                    inputCallback={() => {}}
                    errorCallback={errorCallbackConfirmPassword}/>
                : <div>
                    <label className={"horizontal-group center" + (lengthError(password, "", 8)[0] ? " error" : " ok")}
                           htmlFor="password">
                        <div className={lengthError(password, "", 8)[0] ? "input-error-icon" : "input-ok-icon"}></div>
                        <div>minimum 8 characters</div>
                    </label>
                    <label className={"horizontal-group center" + (noCapitalError(password, "")[0] ? " error" : " ok")}
                           htmlFor="password">
                        <div className={noCapitalError(password, "")[0] ? "input-error-icon" : "input-ok-icon"}></div>
                        <div>minimum 1 capital letter</div>
                    </label>
                    <label className={"horizontal-group center" + (noSpecialSymbolError(password, "")[0] ? " error" : " ok")}
                           htmlFor="password">
                        <div className={noSpecialSymbolError(password, "")[0] ? "input-error-icon" : "input-ok-icon"}></div>
                        <div>minimum 1 special symbol</div>
                    </label>
                </div>
        }
    </div>
}

export default CreatePassword;