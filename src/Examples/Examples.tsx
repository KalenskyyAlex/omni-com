import '../index.css';
import './Examples.css';
import Linter from "../Linter/Linter";

function Examples() {
    const example1 = "use io\n\nstart main |\n    out | \"What is your name? \"\n    \n    name = in | str\n    name is str\n    out | \"Nice to meet you, \"\n    out | name\n    out | \"!\n\"\nend";
    return (
        <div className="horizontal-group fullscreen center blur-background">
            <div className="examples-group vertical-group">
                Try out existing scripts!
                <div className="vertical-group" style={{
                    width: "100%",
                    overflow: "auto"
                }}>
                    <div className="horizontal-group fill-container" style={{
                        gap: '24px'
                    }}>
                        <div className="code-panel">
                            <Linter content={example1}/>
                        </div>
                        <div className="code-panel">
                            {/*<Linter content="asfdkasjd;fjaasdjfksjf"/>*/}
                        </div>
                    </div>
                    <div className="horizontal-group fill-container" style={{
                        gap: '24px'
                    }}>
                        <div className="code-panel">
                            {/*<Linter content=""/>*/}
                        </div>
                        <div className="code-panel">
                            {/*<Linter content=""/>*/}
                        </div>
                    </div>
                    <div className="horizontal-group fill-container" style={{
                        gap: '24px'
                    }}>
                        <div className="code-panel">
                            {/*<Linter content=""/>*/}
                        </div>
                        <div className="code-panel">
                            {/*<Linter content=""/>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Examples;