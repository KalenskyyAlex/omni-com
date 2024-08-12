import {ReactEventHandler, useEffect, useRef, useState} from "react";

import '../index.css';
import './Codespace.css';

function Codespace() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [tabContents, setTabContent] = useState(["Hello"]);
    const [tabNames, setTabNames] = useState([[0, "script1.min"]])
    const currentTabContent = useRef("");

    const switchTabs = (index: number) => {
        setActiveTabIndex(index);

        currentTabContent.current = tabContents[index];
    }

    const addNewTab = () => {
        let newTabIndex = tabNames.length;

        let newTabContents = [...tabContents, ""];
        let newTabNames = [...tabNames, [newTabIndex, "new.min"]];
        setTabContent(newTabContents);
        setTabNames(newTabNames);
        setActiveTabIndex(newTabIndex);
    }

    const closeTab = (index: number) => {
        let length = tabNames.length - 1;

        if (activeTabIndex === index) {
            switchTabs((index + 1 >= length) ? (index - 1) : (index + 1));
        }
        else if (activeTabIndex > index) {
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
                <div className="horizontal-group">
                    {
                        tabNames.map((pair) => {
                            const index = pair[0];
                            const tabName = pair[1];
                            if (index === activeTabIndex) {
                                return (
                                    <button key={index} className="text-button code-primary-text tab-primary horizontal-group center"
                                            onClick={() => {switchTabs(index as number)}}>
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
                                    <button key={index} className="text-button code-secondary-text tab-secondary horizontal-group center"
                                            onClick={() => {switchTabs(index as number)}}>
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
                    <button id="examples" className="text-button code-secondary-text tab-secondary">
                        Examples
                    </button>
                </div>
            </div>

            {/*<textarea id="code-input"*/}
            {/*          value={currentTabContent.current}*/}
            {/*          onChange={updateTabContent}/>*/}
            {/*TODO div contenteditable*/}
            <div id="code-input" contentEditable="true">
                {currentTabContent.current}
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