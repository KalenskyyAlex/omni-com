import '../index.css';
import './Codespace.css';

function Codespace () {
    return (
        <div className="code-space">
            <div className="horizontal-group underline-group code-border">
                <div className="horizontal-group">
                    <button id="examples" className="text-button code-primary-text tab-primary">
                        script1.min
                    </button>
                    <button id="examples" className="text-button code-secondary-text tab-secondary">
                        script2.min
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