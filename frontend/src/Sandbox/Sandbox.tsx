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
import Examples from "../Examples/Examples";

interface codespaceData {
    examplesActive: boolean;
}

interface examplesData {
    isExampleSelected: boolean;
    exampleSelected: string;
    exampleSelectedTitle: string;
}

function Sandbox() {
    /*Theme storing TODO*/
    const [theme, setTheme] = useState("light");
    let currentThemeSwitch = useRef(themeSwitchLight);
    let currentLogo = useRef(logoLight);

    const [codespaceData, setCodespaceData] = useState({examplesActive: false});
    const [examplesData, setExamplesData] = useState({isExampleSelected: false, exampleSelected: '', exampleSelectedTitle: ''});

    const codespaceCallback = (newData: codespaceData) => {
        setCodespaceData(newData);
    }

    const isExampleSelected = () => {
        if (!examplesData.isExampleSelected) return null;

        setExamplesData({isExampleSelected: false, exampleSelected: examplesData.exampleSelected, exampleSelectedTitle: examplesData.exampleSelectedTitle});

        return [examplesData.exampleSelected, examplesData.exampleSelectedTitle];
    }

    const examplesCallback = (status: codespaceData, example: examplesData) => {
        setCodespaceData(status);
        setExamplesData(example);
    }

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
                <Examples active={codespaceData.examplesActive} callback={examplesCallback}/>
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
                <Codespace exampleCallback={isExampleSelected} callback={codespaceCallback}/>
                <Terminal/>
            </div>
        </div>
    );
}

export default Sandbox;
