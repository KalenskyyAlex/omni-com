import '../../../index.css';
import '../auth.css';
import Navbar from "../../common/Navbar/Navbar";
import Socials from "../../common/Socials/Socials";
import {Link} from "react-router-dom";
import UserInput from "../UserInput/UserInput";
import {emptyError, invalidEmailError} from "../validators";
import CreatePassword from "../CreatePassword/CreatePassword";
import {useState} from "react";

function Signup() {
    const [signUpPressed, setSignUpPressed] = useState(false);

    const emailValidator = (value: string, name: string) => {
        const [error1, message1] = emptyError(value, name);
        const [error2, message2] = invalidEmailError(value, name);

        const error = error1 || error2;
        const message = [...message1, ...message2];

        return [error, message]
    }

    return <div className="vertical-group">
        <Navbar/>
        <Socials/>
        <div className="input-container hack">
            <div className="vertical-group gap16">
                <div className="input-container-header vertical-group center hack">
                    Create New Account
                </div>
                {
                    signUpPressed ?
                        <div className="input-container-message">
                            You will get verification email shortly after submission
                        </div>
                        : <div className="vertical-group gap24">
                            <UserInput
                                label="Email"
                                type="text"
                                for="email"
                                inputCallback={() => {
                                }}
                                errorCallback={emailValidator}/>
                            <UserInput
                                label="Username"
                                type="text"
                                for="username"
                                inputCallback={() => {
                                }}
                                errorCallback={emptyError}/>
                            <CreatePassword/>
                        </div>
                }
            </div>
            <div className="vertical-group gap16 center">
                {
                    signUpPressed ?
                        <div className="vertical-group gap16 center">
                            <Link className="link" to="/login">Wrong email?</Link>
                            <Link className="link" to="/login">I didn’t receive verification email</Link>
                        </div>
                        : null
                }
                <Link className="link" to="/login">Back to Login</Link>
                {
                    signUpPressed ? null :
                    <button className="login-button hack" onClick={() => {
                        setSignUpPressed(true);
                    }}>
                        Sign up
                    </button>
                }

                <div>Or</div>
                <button className="login-button hack horizontal-group gap8 center" style={{
                    justifyContent: "center"
                }}>
                <div className="google-icon"></div>
                    Log in with Google
                </button>
            </div>
        </div>
    </div>
}

export default Signup;