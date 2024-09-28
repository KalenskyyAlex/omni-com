import '../../../index.css';
import '../auth.css';
import Navbar from "../../common/Navbar/Navbar";
import Socials from "../../common/Socials/Socials";
import {Link} from "react-router-dom";
import UserInput from "../UserInput/UserInput";
import {emptyError, invalidEmailError} from "../validators";

function Login() {
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
            <div className="vertical-group gap24">
                <UserInput
                    label="Email"
                    type="text"
                    for="email" inputCallback={() => {}}
                    errorCallback={emailValidator}/>
                <UserInput
                    label="Password"
                    type="password" for="password"
                    inputCallback={() => {}}
                    errorCallback={emptyError}/>
            </div>
            <div className="vertical-group gap16 center">
                <Link className="link" to="/reset">Forgot password?</Link>
                <Link className="link" to="/signup">I dont have an account</Link>
                <button className="login-button hack">Log in</button>
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

export default Login;