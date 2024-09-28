import '../../../index.css';
import '../auth.css';
import Navbar from "../../common/Navbar/Navbar";
import Socials from "../../common/Socials/Socials";
import {Link} from "react-router-dom";

function ActivateAccount() {

    return <div className="vertical-group">
        <Navbar/>
        <Socials/>
        <div className="input-container hack">
            <div className="vertical-group gap16">
                <div className="input-container-header vertical-group center hack">
                    Account verification
                </div>
                <div className="input-container-message">
                    Your account was verified successfully. You can now close this page, or log in
                </div>
            </div>
            <div className="vertical-group gap16 center">
                <Link to="/login" className="fill-container">
                    <button className="login-button hack">
                        Back to Login
                    </button>
                </Link>
            </div>
        </div>
    </div>
}

export default ActivateAccount;