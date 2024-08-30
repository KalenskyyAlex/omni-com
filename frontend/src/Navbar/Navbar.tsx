import '../index.css'
import "./Navbar.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function Todo() {
    let storedTheme = localStorage.getItem("theme");
    if (storedTheme === undefined || storedTheme === null) {
        storedTheme = "light";
    }

    const [theme, setTheme] = useState(storedTheme);

    useEffect(() => {
        document.documentElement.setAttribute("theme", theme);
    }, [theme]);

    const changeTheme = () => {
        if (theme === "dark") {
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
        else {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        }
    }

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
                <div className="horizontal-group center theme-container" onClick={changeTheme}>
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