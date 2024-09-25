import '../../../index.css';
import './Terminal.css';
import {useRef, useState} from "react";
import UserInput from "../UserInput/UserInput";

interface TerminalProps {
    terminalCallback: Function;
}

interface APIResponse {
    output: string;
    error: string;
    containerId: string;
    waitingForInput: boolean;
    retry: boolean;
}

const defaultResponse: APIResponse = {
    output: "If you see this message, backend server is\n" +
        "probably stopped, or ran into critical problem.\n" +
        "Contact me at kalenskyy.oleksandr@gmail.com.\n" +
        "\n" +
        "If you are testing in local environment,\n" +
        "make sure server is running on localhost:8080",
    containerId: "",
    error: "",
    retry: false,
    waitingForInput: false
};

async function init(code: string): Promise<APIResponse> {
    let result: APIResponse = defaultResponse;

    const api_root = process.env["REACT_APP_OMNICOM_API_LOCAL"];

    try {
        const response = await fetch(api_root + "/terminal/init", {
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
        });

        if (response.ok) {
            result = await response.json();
            if (result.retry) {
                result = await init(code);
            }
        } else {
            console.error(response);
        }
    } catch (error) {
        console.error(error);
    }

    return result;
}

async function provide_input(userInput: string, containerId: string | null): Promise<APIResponse> {
    let result: APIResponse = defaultResponse;

    const api_root = process.env["REACT_APP_OMNICOM_API_LOCAL"];

    try {
        const response = await fetch(api_root + "/terminal/provide-input", {
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
                "containerId": containerId,
                "userInput": userInput,
                "userInputUpdated": true
            })
        });

        if (response.ok) {
            result = await response.json();
        } else {
            console.error(response);
        }
    } catch (error) {
        console.error(error);
    }

    return result;
}

async function terminate(containerId: string): Promise<APIResponse> {
    let result: APIResponse = defaultResponse;

    const api_root = process.env["REACT_APP_OMNICOM_API_LOCAL"];

    try {
        const response = await fetch(api_root + "/terminal/interrupt", {
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
                "containerId": containerId,
                "interruptNeeded": true
            })
        });

        if (response.ok) {
            result = await response.json();
        } else {
            console.error(response);
        }
    } catch (error) {
        console.error(error);
    }

    return result;
}

function Terminal(props: TerminalProps) {
    const [terminalOutput, setTerminalOutput] = useState("");
    const [terminalError, setTerminalError] = useState("");
    const containerId = useRef<string | null>(null);
    const insertUserInput = useRef<boolean>(false);

    const terminalInit = () => {
        const code = props.terminalCallback();
        init(code).then((result) => {
            let processFinished = result.waitingForInput ? "" : "\n\nProcess finished";
            setTerminalOutput(result.output + processFinished);
            setTerminalError(result.error);
            containerId.current = result.containerId;

            if(result.waitingForInput) {
                insertUserInput.current = true;
            }
        });
    }

    const terminalProvideInput = (userInput: string) => {
        provide_input(userInput, containerId.current).then((result) => {
            let processFinished = result.waitingForInput ? "" : "\n\nProcess finished";
            setTerminalOutput(result.output + processFinished);
            setTerminalError(result.error);
            containerId.current = result.containerId;

            if(result.waitingForInput) {
                insertUserInput.current = true;
            }
        });
    }

    const terminalInterrupt = () => {
        if (containerId.current !== null) {
            terminate(containerId.current).then(() => {
                setTerminalError("\nProcess terminated");
            });
        }
    }

    return (
        <div className="terminal vertical-group dont-stretch">
            <div className="horizontal-group underline-group terminal-border">
                <button id="run" className="icon-button green" onClick={terminalInit}>
                    <div className="run-icon"></div>
                </button>
                <button id="stop" className="icon-button red" onClick={terminalInterrupt}>
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
                    <code className="terminal-primary-text">
                        {terminalOutput}
                        {insertUserInput.current ? <UserInput returnInputCallback={terminalProvideInput}/> : null}
                    </code>
                    <code className="terminal-error-text">{terminalError}</code>
                </pre>
            </div>
        </div>
    )
}

export default Terminal;