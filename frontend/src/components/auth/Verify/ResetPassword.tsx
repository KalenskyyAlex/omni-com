import '../../../index.css';
import '../auth.css';
import Navbar from "../../common/Navbar/Navbar";
import Socials from "../../common/Socials/Socials";
import {Link} from "react-router-dom";
import CreatePassword from "../CreatePassword/CreatePassword";
import {useState} from "react";

function ResetPassword() {
    const [signUpPressed, setsignUpPressed] = useState(false);

    return <div className="vertical-group">
        <Navbar/>
        <Socials/>
        <div className="input-container hack">
            <div className="vertical-group gap16">
                <div className="input-container-header vertical-group center hack">
                    Reset Password
                </div>
                {
                    signUpPressed ?
                        <div className="input-container-message">
                            Password was reset successfully. You can now close this page, or log in
                        </div>
                        : <div className="vertical-group gap24">
                            <CreatePassword name="New Password"/>
                        </div>
                }
            </div>
            <div className="vertical-group gap16 center">
                {
                    signUpPressed ?
                        <Link to="/login" className="fill-container">
                            <button className="login-button hack">
                                Back to Login
                            </button>
                        </Link>
                        : <button className="login-button hack" onClick={() => {
                            setsignUpPressed(true);
                        }}>
                            Reset Password
                        </button>
                }
            </div>
        </div>
    </div>
}

export default ResetPassword;