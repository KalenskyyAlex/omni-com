import {ChangeEvent, useEffect, useRef, useState} from "react";
import Linter from "../../common/Linter/Linter";
import {getRaw} from "../../common/Linter/Linter";

import '../../../index.css';
import './Codespace.css';

interface CodespaceProps {
    codeDataCallback: Function;
    exampleCallback: Function;
    updateCodeCallback: Function;
}

function Codespace(props: CodespaceProps) {
    const example1 = "use io\n" +
        "\n" +
        "start main\n" +
        "\tout | \"Hello, world!\\n\"\n" +
        "end";

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [tabContents, setTabContent] = useState([example1]);
    const [tabNames, setTabNames] = useState([[0, "HelloWorld.min"]]);
    // const [linterStep, triggerLinterUpdate] = useState(0);

    const currentTabContent = useRef(tabContents[activeTabIndex]);

    const switchTabs = (index: number) => {
        const codeInput = document.getElementById("code-input");

        if (codeInput !== null) {
            let updatedTabContent = getRaw(codeInput.innerHTML);

            let newTabContents = [...tabContents.slice(0, activeTabIndex), updatedTabContent, ...tabContents.slice(activeTabIndex + 1)];
            props.updateCodeCallback(newTabContents[index]);

            setTabContent(newTabContents);
        }

        setActiveTabIndex(index);
        currentTabContent.current = tabContents[index];
        codeInput?.focus();
    }

    const downloadCurrent = () => {
        const codeInput = document.getElementById("code-input");
        if (codeInput === null) return;

        const fileContent = getRaw(codeInput.innerHTML);

        // Create a blob from the file content
        const blob = new Blob([fileContent], {type: 'text/min'});

        // Create an object URL for the blob
        const url = URL.createObjectURL(blob);

        // Create an anchor element and trigger the download
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = tabNames[activeTabIndex][1].toString(); // Set the file name
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    useEffect(() => {
        let example;
        if ((example = props.exampleCallback()) !== null) {
            let newTabIndex = tabNames.length;

            let newTabContents = [...tabContents, example[0]];
            let newTabNames = [...tabNames, [newTabIndex, example[1]]];

            setTabContent(newTabContents);
            setTabNames(newTabNames);
            setActiveTabIndex(newTabIndex);

            currentTabContent.current = newTabContents[newTabIndex];
            props.updateCodeCallback(newTabContents[newTabIndex]);
        }
    }, [props]);

    let tabGroup = document.getElementById("code-tabs-group-1");
    tabGroup?.addEventListener("wheel", (event) => {
        if (tabGroup !== null) {

            if (event.deltaY > 0) {
                tabGroup.scrollLeft += 1;
            } else {
                tabGroup.scrollLeft -= 1;
            }
        }
    })
    props.updateCodeCallback(example1); // TODO code might be changed

    const addNewTab = () => {
        let newTabIndex = tabNames.length;

        const codeInput = document.getElementById("code-input");

        if (codeInput !== null) {
            let updatedTabContent = getRaw(codeInput.innerHTML);

            let newTabContents = [...tabContents.slice(0, activeTabIndex), updatedTabContent, ...tabContents.slice(activeTabIndex + 1), ""];
            let newTabNames = [...tabNames, [newTabIndex, "new.min"]];

            setTabContent(newTabContents);
            setTabNames(newTabNames);
            setActiveTabIndex(newTabIndex);

            currentTabContent.current = "";
            props.updateCodeCallback("");
        }
    }

    const closeTab = (index: number) => {
        let length = tabNames.length - 1;

        let newTabContents = [...tabContents.slice(0, index), ...tabContents.slice(index + 1)];
        let newTabNames = [...tabNames.slice(0, index), ...tabNames.slice(index + 1).map((pair) => [pair[0] as number - 1, pair[1]])];

        setTabContent(newTabContents);
        setTabNames(newTabNames);

        let newIndex = (index - 1) % length;
        setActiveTabIndex(newIndex);
        currentTabContent.current = newTabContents[newIndex];
    }

    const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        if (target.files !== null) {
            const file = target.files[0];

            let newTabIndex = tabNames.length;

            let newTabContents = [...tabContents, await file.text()];
            let newTabNames = [...tabNames, [newTabIndex, file.name]];

            setTabContent(newTabContents);
            setTabNames(newTabNames);
            setActiveTabIndex(newTabIndex);

            currentTabContent.current = newTabContents[newTabIndex];
            props.updateCodeCallback(newTabContents[newTabIndex]);
        }
    }

    const displayTabs = tabNames.map((pair) => {
        const index = pair[0];
        const tabName = pair[1];
        if (index === activeTabIndex) {
            return (
                <button key={index}
                        className="text-button code-primary-text tab-primary horizontal-group center"
                        onClick={() => {
                            switchTabs(index as number)
                        }}>
                    {tabName}
                    <div className="close-tab-primary-icon"
                         onClick={(event) => {
                             event.stopPropagation();
                             closeTab(index as number)
                         }}/>
                </button>
            )
        } else {
            return (
                <button key={index}
                        className="text-button code-secondary-text tab-secondary horizontal-group center"
                        onClick={() => {
                            switchTabs(index as number)
                        }}>
                    {tabName}
                    <div className="close-tab-secondary-icon"
                         onClick={(event) => {
                             event.stopPropagation();
                             closeTab(index as number);
                         }}/>
                </button>
            )
        }
    })

    return (
        <div className="code-space">
            <div className="horizontal-group underline-group code-border">
                <div id="code-tabs-group-1" className="code-tabs-group horizontal-group">
                    {displayTabs}
                    <button className="text-button code-secondary-text tab-secondary horizontal-group center"
                            onClick={addNewTab}>
                        new
                        <div className="add-tab-icon"></div>
                    </button>
                    {/*Todo*/}
                </div>
                <div className="horizontal-group">
                    <input id="upload-input" type="file" onChange={onFileChange} style={{display: 'none'}}/>
                    <button id="upload" className="icon-button tab-secondary"
                            onClick={() => document.getElementById('upload-input')?.click()}>
                        <div className="upload-icon"></div>
                    </button>
                    <button id="download" className="icon-button tab-secondary"
                            onClick={downloadCurrent}>
                        <div className="download-icon"></div>
                    </button>
                    <button id="examples" className="text-button code-secondary-text tab-secondary"
                            onClick={() => props.codeDataCallback({examplesActive: true})}>
                        Examples
                    </button>
                </div>
            </div>

            {/*TODO lint*/}
            <div id="code-input" contentEditable={true} spellCheck={false}
                 suppressContentEditableWarning={true} onInput={() => {
                const codeInput = document.getElementById("code-input");

                if (codeInput !== null) {
                    let updatedTabContent = getRaw(codeInput.innerHTML);
                    props.updateCodeCallback(updatedTabContent);
                }
            }}>
                <Linter content={currentTabContent.current}></Linter>
            </div>

            <div className="horizontal-group overline-group code-border" style={{
                justifyContent: "flex-end"
            }}>
                <div className="line-coord">line 1, col 1</div>
            </div>
        </div>
    )
}

export default Codespace;