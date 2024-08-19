import '../index.css';
import './Terminal.css';

function Terminal() {
    return (
        <div className="terminal vertical-group dont-stretch">
            <div className="horizontal-group underline-group terminal-border">
                <button id="run" className="icon-button green">
                    <div className="run-icon"></div>
                </button>
                <button id="stop" className="icon-button red">
                    <div className="stop-icon"></div>
                </button>
                <button id="stree" className="icon-button neutral">
                    <div className="stree-icon"></div>
                </button>
                <button id="tokens" className="icon-button neutral">
                    <div className="tokens-icon"></div>
                </button>
            </div>
            <div className="terminal-outlet-wrapper">
                <div id="terminal-outlet">
                    &gt;&gt; Produced Output: <br/>
                </div>
            </div>
        </div>
    )
}

export default Terminal;