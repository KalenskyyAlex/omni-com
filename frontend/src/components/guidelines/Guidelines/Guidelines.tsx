import '../../../index.css';
import './Guidelines.css';
import Linter from "../../common/Linter/Linter";
import Navbar from "../../common/Navbar/Navbar";
import Socials from "../../common/Socials/Socials";

function Guidelines() {
    const var_example = "var1 is int ~ declaring\n" +
        "var2 is int ~ declaring\n" +
        "\n" +
        "var1 = 3\n" +
        "var2 = (var1 * (var1-2) / (var1 + 3)) % 2 + 1";

    const func_example = "~ no arguments\n" +
        "start new_function\n" +
        "\t~ function body\n" +
        "end\n" +
        "\n" +
        "~ function with 2 arguments\n" +
        "start add | num1 is int, num2 is int\n" +
        "\treturn num1 + num2 ~ function returns a value\n" +
        "end";

    const main_example = "start main\n" +
        "\t~ doing stuff\n" +
        "end"

    const if_else_example = "b is bool\n" +
        "b = true\n" +
        "\n" +
        "if b\n" +
        "\twrite | \"I'm happy\"\n" +
        "else\n" +
        "\twrite | \"I'm sad\"\n" +
        "end"

    const while_example_1 = "index is int\n" +
        "index = 0\n" +
        "\n" +
        "while index < 10\n" +
        "\twrite | index ~ basic output function\n" +
        "\tindex = index + 1\n" +
        "end "

    const while_example_2 = "index is int\n" +
        "index = 0\n" +
        "\n" +
        "while true\n" +
        "\twrite | index ~ basic output function\n" +
        "\tindex = index + 1\n" +
        "\tif index == 10\n" +
        "\t\tbreak ~ while loop can have 'break' statement\n" +
        "\tend\n" +
        "end"

    return <div>
        <Navbar/>
        <Socials darken={true}/>
        <div className="guidelines-container">
            <div>
                <h2 className="underline-group">Intro</h2>
                <p>Interpreter(and language therefore) supports</p>
                <ul>
                    <li>variable definition</li>
                    <ul>
                        <li>basic types (integer, string, boolean, float)</li>
                    </ul>
                    <li>simple mathematical operations</li>
                    <li>functions</li>
                    <ul>
                        <li>arguments</li>
                        <li>return</li>
                    </ul>
                    <li>loops</li>
                    <ul>
                        <li>break</li>
                    </ul>
                    <li>if/else statements</li>
                    <li>Language has NO strict indentation and NO semicolons to sign end of command. Language follows rule
                        "One Line - One Command" instead
                    </li>
                </ul>
                <p>Not really much, there's where the name comes from - MINIMUM language</p>
            </div>
            <div>
                <h2 className="underline-group">Syntax</h2>
                <h3>Comments</h3>
                <div className="code-inline">
                    <Linter content={"~ this is a one-line comment"}/>
                </div>
                <p>Note: only one-line comments allowed</p>
                <h3>Importing</h3>
                <div className="code-inline">
                    <Linter content={"use io ~ basic input/output library"}/>
                </div>
                <p>Note: libraries can be written either with MINIMUM or Python. There is very small set of basic libraries
                    I wrote</p>
                <h3>Assigning variables and Mathematical operations</h3>
                <div className="code-panel-guidelines">
                    <Linter content={var_example}/>
                </div>
                <p>
                    Note: MINIMUM supports brackets
                    &nbsp;
                    <div className="code-inline">
                        <Linter content={"(), +, -, *, /"}/>
                    </div>
                    &nbsp;
                    and
                    &nbsp;
                    <div className="code-inline">
                        <Linter content={"'%'"}/>
                    </div>
                    &nbsp;
                    operators making all basic mathematical operations possible
                </p>
                <h3>Function declaration</h3>
                <div className="code-panel-guidelines">
                    <Linter content={func_example}/>
                </div>
                <p>
                    Note:
                    &nbsp;
                    <div className="code-inline">
                        <Linter content={"start"}/>
                    </div>
                    &nbsp;
                    keyword does not define type of function's return. By default, it is
                    &nbsp;
                    <div className="code-inline">
                        <Linter content={"nothing"}/>
                    </div>
                    &nbsp;
                    value Note: each .min file should have main function with 0 arguments:
                </p>
                <div className="code-panel-guidelines">
                    <Linter content={main_example}/>
                </div>
                <h3>If/Else</h3>
                <div className="code-panel-guidelines">
                    <Linter content={if_else_example}/>
                </div>
                <h3>While loop</h3>
                <p>
                    MINIMUM has only one type of loops -
                    &nbsp;
                    <div className="code-inline">
                        <Linter content={"while"}/>
                    </div>
                    &nbsp;
                    loop
                </p>
                <div className="code-panel-guidelines">
                    <Linter content={while_example_1}/>
                </div>
                <p>or</p>
                <div className="code-panel-guidelines">
                    <Linter content={while_example_2}/>
                </div>
                <h3>More program examples can be found in Examples(available in editor)</h3>
                <h2>Thanks for reading!</h2>
            </div>
        </div>
    </div>
}

export default Guidelines;