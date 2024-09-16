import '../index.css';
import './Login.css';
import Navbar from "../Navbar/Navbar";
import Socials from "../Socials/Socials";
import {Link} from "react-router-dom";

function Login() {
    return <div className="vertical-group">
        <Navbar/>
        <Socials/>
        <div className="login hack">
            <div className="vertical-group gap24">
                <div className="vertical-group gap8">
                    <label htmlFor="username">Username</label>
                    <input type="text"/>
                </div>
                <div className="vertical-group gap8">
                    <label htmlFor="password">Password</label>
                    <input type="password"/>
                </div>
            </div>
            <div className="vertical-group gap16 center">
                <Link className="link" to="/signup">Forgot password?</Link>
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