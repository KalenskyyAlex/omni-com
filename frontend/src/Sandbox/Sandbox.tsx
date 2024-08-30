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
import Navbar from "../Navbar/Navbar";

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

    const [codespaceData, setCodespaceData] = useState({examplesActive: false});
    const [examplesData, setExamplesData] = useState({isExampleSelected: false, exampleSelected: '', exampleSelectedTitle: ''});
    let code = useRef("");

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

    const updateCodeCallback = (newCode: string) => {
        code.current = newCode;
    }

    useEffect(() => {
        document.documentElement.setAttribute("theme", theme);
    }, [theme]);

    const changeTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        }
        else {
            setTheme("dark");
        }
    }

    return (
        <div className="vertical-group">
            <Examples active={codespaceData.examplesActive} callback={examplesCallback}/>
            <Navbar changeTheme={changeTheme}/>
            <div className="editor-container">
                <Codespace exampleCallback={isExampleSelected} codeDataCallback={codespaceCallback} updateCodeCallback={updateCodeCallback} />
                <Terminal terminalCallback={() => code.current}/>
            </div>
        </div>
    );
}

export default Sandbox;
