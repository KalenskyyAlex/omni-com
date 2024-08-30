import '../index.css';
import './Terminal.css';
import {useState} from "react";

interface TerminalProps {
    terminalCallback: Function;
}

interface APIResponse {
    "output": string;
    "containerId": string;
    "waitingForInput": boolean;
}

function Terminal(props: TerminalProps) {
    const [terminalOutput, setTerminalOutput] = useState("");

    const terminalInit = () => {
        const code = props.terminalCallback();
        const api_root = process.env["REACT_APP_OMNICOM_API_LOCAL"];
        fetch(api_root + "/terminal/init", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Credentials": "true",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Max-Age": "3600"
            },
            body: JSON.stringify({
                "code": code
            })
        })
            .then((response: Response) => {
                response.json()
                    .then((apiResponse: APIResponse) => setTerminalOutput(apiResponse.output))
            })
            .catch(console.error);
    }

    return (
        <div className="terminal vertical-group dont-stretch">
            <div className="horizontal-group underline-group terminal-border">
                <button id="run" className="icon-button green" onClick={terminalInit}>
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
                <pre id="terminal-outlet">
                    {terminalOutput}
                </pre>
            </div>
        </div>
    )
}

export default Terminal;