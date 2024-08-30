import '../index.css'
import "./Navbar.css"
import {Link} from "react-router-dom";
import {MouseEventHandler} from "react";

interface NavbarProps {
    changeTheme: MouseEventHandler<HTMLDivElement>;
}

function Todo(props: NavbarProps) {
    return (
        <nav>
            <div className="horizontal-group center" style={{
                gap: "32px"
            }}>
                <img className="logo-container" alt="OMNI.COM"></img>
                <Link to="/guidelines">Guidelines</Link>
            </div>
            <div className="horizontal-group center" style={{
                gap: "32px",
            }}>
                <div className="horizontal-group center theme-container" onClick={props.changeTheme}>
                    Theme <img alt=""/>
                </div>
                <strong>|</strong>
                <div className="horizontal-group center" style={{
                    gap: "32px",
                }}>
                    <Link target="_blank" to="https://github.com/KalenskyyAlex/omni-com">
                        <div className="github-icon"/>
                    </Link>
                    <Link target="_blank" to="https://www.linkedin.com/in/o-kalenskyy">
                        <div className="linked-in-icon"/>
                    </Link>
                    <Link target="_blank" to="https://t.me/kalenskyj">
                        <div className="telegram-icon"/>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Todo;