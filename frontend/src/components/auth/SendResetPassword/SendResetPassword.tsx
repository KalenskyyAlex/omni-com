import '../../../index.css';
import '../auth.css';
import Navbar from "../../common/Navbar/Navbar";
import Socials from "../../common/Socials/Socials";
import {Link} from "react-router-dom";
import CreatePassword from "../CreatePassword/CreatePassword";
import {useState} from "react";
import UserInput from "../UserInput/UserInput";
import {emailValidator} from "../validators";

function SendResetPassword() {
    const [sendResetPressed, setSendResetPressed] = useState(false);

    return <div className="vertical-group">
        <Navbar/>
        <Socials/>
        <div className="input-container hack">
            <div className="vertical-group gap16">
                <div className="input-container-header vertical-group center hack">
                    Reset Password
                </div>
                {
                    sendResetPressed ?
                        <div className="input-container-message">
                            Password reset link was sent on TODO
                        </div>
                        : <div className="vertical-group gap8">
                            <UserInput
                                label="Email linked to your account"
                                inputCallback={() => null}
                                errorCallback={emailValidator}
                                type="text"
                                for="email"/>
                            <div className="hack">
                                Password reset link will be sent on this email. You will need to open it and follow
                                instructions
                            </div>
                        </div>
                }
            </div>
            <div className="vertical-group gap16 center">
                {
                    sendResetPressed ?
                        <div className="vertical-group gap16 center">
                            <Link className="link" to="/reset" onClick={() => setSendResetPressed(false)}>
                                Wrong email?
                            </Link>
                            <Link className="link" to="/login">I didn’t receive reset password email</Link>
                            <Link to="/login" className="fill-container">
                                <button className="login-button hack">
                                    Back to Login
                                </button>
                            </Link>
                        </div>
                        : <button className="login-button hack" onClick={() => {
                            setSendResetPressed(true);
                        }}>
                            Send Reset Link
                        </button>
                }
            </div>
        </div>
    </div>
}

export default SendResetPassword;