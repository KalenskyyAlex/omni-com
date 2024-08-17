import {useEffect, useRef, useState} from "react";
import Linter from "../Linter/Linter";
import {getRaw} from "../Linter/Linter";

import '../index.css';
import './Codespace.css';

interface CodespaceProps {
    callback: Function;
    exampleCallback: Function;
}

function Codespace(props: CodespaceProps) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [tabContents, setTabContent] = useState(["Hello", "World"]);
    const [tabNames, setTabNames] = useState([[0, "script1.min"], [1, "script2.min"]])
    const currentTabContent = useRef(tabContents[activeTabIndex]);

    const switchTabs = (index: number) => {
        const codeInput = document.getElementById("code-input");

        if (codeInput !== null) {
            let updatedTabContent = getRaw(codeInput.innerHTML);

            let newTabContents = [...tabContents.slice(0, activeTabIndex), updatedTabContent, ...tabContents.slice(activeTabIndex + 1)];

            setTabContent(newTabContents);
        }

        setActiveTabIndex(index);
        currentTabContent.current = tabContents[index];
    }

    useEffect(() => {
        let example;
        if ((example = props.exampleCallback()) !== null) {
            let newTabIndex = tabNames.length;

            let newTabContents = [...tabContents, example[0]];
            let newTabNames = [...tabNames, [newTabIndex, example[1]]];

            console.log(newTabContents);

            setTabContent(newTabContents);
            setTabNames(newTabNames);
            setActiveTabIndex(newTabIndex);

            currentTabContent.current = newTabContents[newTabIndex];
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

    const addNewTab = () => {
        let newTabIndex = tabNames.length;

        let newTabContents = [...tabContents, ""];
        let newTabNames = [...tabNames, [newTabIndex, "new.min"]];

        setTabContent(newTabContents);
        setTabNames(newTabNames);

        switchTabs(newTabIndex)
    }

    const closeTab = (index: number) => {
        let length = tabNames.length - 1;

        if (activeTabIndex === index) {
            switchTabs((index + 1 >= length) ? (index - 1) : (index + 1));
        } else if (activeTabIndex > index) {
            switchTabs(activeTabIndex - 1);
        }

        let newTabContents = [...tabContents.slice(0, index), ...tabContents.slice(index + 1)];
        let newTabNames = [...tabNames.slice(0, index), ...tabNames.slice(index + 1).map((pair) => [pair[0] as number - 1, pair[1]])];

        setTabContent(newTabContents);
        setTabNames(newTabNames);
    }

    return (
        <div className="code-space">
            <div className="horizontal-group underline-group code-border">
                <div id="code-tabs-group-1" className="code-tabs-group horizontal-group">
                    {
                        tabNames.map((pair) => {
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
                    }
                    <button className="text-button code-secondary-text tab-secondary horizontal-group center"
                            onClick={addNewTab}>
                        new
                        <div className="add-tab-icon"></div>
                    </button>
                    {/*Todo*/}
                </div>
                <div className="horizontal-group">
                    <button id="upload" className="icon-button tab-secondary">
                        <div className="upload-icon"></div>
                    </button>
                    <button id="download" className="icon-button tab-secondary">
                        <div className="download-icon"></div>
                    </button>
                    <button id="examples" className="text-button code-secondary-text tab-secondary"
                            onClick={() => props.callback({examplesActive: true})}>
                        Examples
                    </button>
                </div>
            </div>

            {/*TODO lint*/}
            <div id="code-input" contentEditable={true} spellCheck={true}
                 suppressContentEditableWarning={true}>
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