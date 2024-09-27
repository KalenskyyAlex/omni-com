import '../../../index.css';
import '../auth.css';
import Navbar from "../../common/Navbar/Navbar";
import Socials from "../../common/Socials/Socials";
import {Link} from "react-router-dom";
import UserInput from "../UserInput/UserInput";
import {emptyError, invalidEmailError} from "../validators";
import CreatePassword from "../CreatePassword/CreatePassword";

function Signup() {
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
                <div className="vertical-group gap24">
                    <UserInput
                        label="Email"
                        type="text"
                        for="email"
                        inputCallback={() => {}}
                        errorCallback={emailValidator}/>
                    <UserInput
                        label="Username"
                        type="text"
                        for="username"
                        inputCallback={() => {}}
                        errorCallback={emptyError}/>
                    <CreatePassword/>
                </div>
            </div>
            <div className="vertical-group gap16 center">
                <Link className="link" to="/login">Back to Login</Link>
                <button className="login-button hack">Sign up</button>
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