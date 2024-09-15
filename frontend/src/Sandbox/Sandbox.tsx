import '../index.css';
import './Sandbox.css';
import {useRef, useState} from "react";

import Codespace from "../Codespace/Codespace";
import Terminal from "../Terminal/Terminal";
import Examples from "../Examples/Examples";
import Navbar from "../Navbar/Navbar";
import Socials from "../Socials/Socials";

interface codespaceData {
    examplesActive: boolean;
}

interface examplesData {
    isExampleSelected: boolean;
    exampleSelected: string;
    exampleSelectedTitle: string;
}

function Sandbox() {
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

    return (
        <div className="vertical-group">
            <Socials></Socials>
            <Examples active={codespaceData.examplesActive} callback={examplesCallback}/>
            <Navbar/>
            <div className="editor-container">
                <Codespace exampleCallback={isExampleSelected} codeDataCallback={codespaceCallback} updateCodeCallback={updateCodeCallback} />
                <Terminal terminalCallback={() => code.current}/>
            </div>
        </div>
    );
}

export default Sandbox;
