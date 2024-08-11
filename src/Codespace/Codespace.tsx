import {useState} from "react";

import '../index.css';
import './Codespace.css';

function Codespace () {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [tabContents, setTabContent] = useState([""]);
    const [tabNames, setTabNames] = useState([[0, "script1.min"]])

    const switchTabs = (index: number) => {
        setActiveTabIndex(index);
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
                                    <button id="examples"
                                            className="text-button code-primary-text tab-primary horizontal-group center">
                                        {tabName}
                                        <div className="close-tab-primary-icon"></div>
                                    </button>
                                )
                            } else {
                                return (
                                    <button id="examples"
                                            className="text-button code-secondary-text tab-secondary horizontal-group center">
                                        {tabName}
                                        <div className="close-tab-secondary-icon"></div>
                                    </button>
                                )
                            }
                        })
                    }
                    <button id="examples" className="text-button code-secondary-text tab-secondary horizontal-group center">
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
            <div className="horizontal-group overline-group code-border" style={{
                justifyContent: "flex-end"
            }}>
                <div className="line-coord">line 1, col 1</div>
            </div>
        </div>
    )
}

export default Codespace;