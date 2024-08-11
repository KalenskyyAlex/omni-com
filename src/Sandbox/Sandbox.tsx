import '../index.css';
import './Sandbox.css';
import {useEffect, useRef, useState} from "react";

import themeSwitchLight from '../icons/theme_switch_light.svg';
import themeSwitchDark from '../icons/theme_switch_dark.svg';
import logoLight from '../icons/logoLight.svg';
import logoDark from '../icons/logoDark.svg';
import {Link} from "react-router-dom";
import Codespace from "../Codespace/Codespace";
import Terminal from "../Terminal/Terminal";

function Sandbox() {

    /*Theme storing TODO*/
    const [theme, setTheme] = useState("light");
    let currentThemeSwitch = useRef(themeSwitchLight);
    let currentLogo = useRef(logoLight);

    useEffect(() => {
        document.documentElement.setAttribute("theme", theme);
    }, [theme]);

    const changeTheme = () => {
        if (theme === "dark") {
            currentThemeSwitch.current = themeSwitchLight;
            currentLogo.current = logoLight;
            setTheme("light");
        }
        else {
            currentThemeSwitch.current = themeSwitchDark;
            currentLogo.current = logoDark;
            setTheme("dark");
        }
    }

    return (
        <div className="vertical-group">
            <nav>
                <div className="horizontal-group center" style={{
                    gap: "32px"
                }}>
                    <img src={currentLogo.current} alt="OMNI.COM"/>
                    <Link to="/guidelines">Guidelines</Link>
                </div>
                <div className="horizontal-group center" style={{
                    gap: "32px",
                }}>
                    <div className="horizontal-group center" onClick={changeTheme}>
                        Theme
                        <img src={currentThemeSwitch.current} alt=""/>
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
            <div className="editor-container">
                <Codespace/>
                <Terminal/>
            </div>
        </div>
    );
}

export default Sandbox;
