import '../../../index.css';
import '../error.css';
import { Link } from "react-router-dom";
import Socials from "../../common/Socials/Socials";
import Navbar from "../../common/Navbar/Navbar";

function Unauthorized401() {
    return (
        <div className="vertical-group">
            <Navbar />
            <Socials />

            <div className="vertical-group" style={{
                flexGrow: 1,
                justifyContent: "center"
            }}>
                <div className="vertical-group center gap16">
                    <div className="vertical-group center gap0">
                        <p className="kimberley error-code">401</p>
                        <p className="kimberley error-header">Unauthorized</p>
                    </div>
                    <div className="vertical-group center gap8">
                        <p className="kimberley error-description">You need to log in to access this page</p>
                        <Link className="link" to="/login">Go to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Unauthorized401;
