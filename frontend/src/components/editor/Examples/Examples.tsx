import '../../../index.css';
import './Examples.css';
import Linter from "../../common/Linter/Linter";

interface ExamplesProps {
    active: boolean;
    callback: Function;
}

const example1 = "use io\n" +
    "\n" +
    "start main\n" +
    "\tout | \"Hello, world!\\n\"\n" +
    "end";

const example2 = "use io\n" +
    "\n" +
    "start main\n" +
    "\tmaxvalue is int\n" +
    "\tindex is int\n" +
    "\n" +
    "\tout | \"Enter number\\n\"\n" +
    "\t\n" +
    "\tmaxvalue = in | int\n" +
    "\tindex = 0\n" +
    "\t\t\n" +
    "\twhile index < maxvalue\n" +
    "\t\tif index % 3 == 0\n" +
    "\t\t\tif index % 5 == 0\n" +
    "\t\t\t\tout | \"fizzbuzz\\n\"\n" +
    "\t\t\telse\n" +
    "\t\t\t\tout | \"fizz\\n\"\n" +
    "\t\t\tend\n" +
    "\t\telse\n" +
    "\t\t\tif index % 5 == 0\n" +
    "\t\t\t\tout | \"buzz\\n\"\n" +
    "\t\t\telse \n" +
    "\t\t\t\tout | index\n" +
    "\t\t\t\tout | \"\\n\"\n" +
    "\t\t\tend\n" +
    "\t\tend\n" +
    "\t\t\n" +
    "\t\tindex = index + 1\n" +
    "\tend\n" +
    "end";

const example3 = "use io\n" +
    "\n" +
    "start factorial | num is int\n" +
    "\tif num == 0\n" +
    "\t\treturn 1\n" +
    "\telse\n" +
    "\t\treturn num * (factorial | (num - 1))\n" +
    "\tend\n" +
    "end\n" +
    "\n" +
    "start main\n" +
    "\tout | \"Enter the number: \"\n" +
    "\n" +
    "\tnumber is int\n" +
    "\tnumber = in | int\n" +
    "\n" +
    "\tout | (factorial | number)\n" +
    "\tout | \"\\n\"\n" +
    "end";

const example4 = "use io\n" +
    "\n" +
    "start main\n" +
    "\tcounter is int\n" +
    "\tcounter = 10\n" +
    "\n" +
    "\twhile counter > 0\n" +
    "\t\tout | counter\n" +
    "\t\tout | \"\\n\"\n" +
    "\t\tcounter = counter - 1\n" +
    "\tend\n" +
    "\n" +
    "\tif counter == 0\n" +
    "\t\tout | \"Hello, World!\\n\"\n" +
    "\tend\n" +
    "end";

const example5 = "use io\n" +
    "\n" +
    "start main\n" +
    "\tname is str\n" +
    "\t\n" +
    "\tout | \"Hi! What is your name? \"\n" +
    "\t\n" +
    "\tname = in | str\n" +
    "\t\n" +
    "\tout | \"Hello, \"\n" +
    "\tout | name\n" +
    "\tout | \"! Nice to meet you!\\n\"\n" +
    "end";

const example6 = "use io\n" +
    "use math\n" +
    "\n" +
    "start print_num | num is int\n" +
    "    out | \"The number is: \"\n" +
    "    out | num\n" +
    "    out | \"\\n\"\n" +
    "end\n" +
    "\n" +
    "start print_sum | a is int, b is int\n" +
    "    sum is int\n" +
    "\n" +
    "    sum = a + b\n" +
    "\n" +
    "    out | \"The sum of a and b is: \"\n" +
    "    out | sum\n" +
    "    out | \"\\n\"\n" +
    "end\n" +
    "\n" +
    "start sum | a is int, b is int\n" +
    "    return a + b\n" +
    "end\n" +
    "\n" +
    "start main\n" +
    "    index1 is int\n" +
    "    index2 is int\n" +
    "\n" +
    "    index1 = -1\n" +
    "    index2 = (index1 * 3 - 1) % 5\n" +
    "\n" +
    "    print_num | index1\n" +
    "    print_num | index2\n" +
    "\n" +
    "    print_sum | index1, index2\n" +
    "    print_sum | index1 + 3, index2\n" +
    "\n" +
    "    index1 = sum | index2, 3\n" +
    "\n" +
    "    print_num | index1\n" +
    "\n" +
    "    root is float\n" +
    "    root = sqrt | 9\n" +
    "    out | root\n" +
    "    out | \"\\n\"\n" +
    "end"

function Examples(props: ExamplesProps) {
    if (!props.active) return <div style={{display: "none"}}></div>;

    return (
        <div className="horizontal-group fullscreen center blur-background">
            <div className="examples-group vertical-group">
                Try out existing scripts!
                <div className="vertical-group examples-scrollbar">
                    <div className="horizontal-group fill-container examples-group-code" style={{
                        gap: '0px'
                    }}>
                        <div className="code-panel" onClick={() => {
                            props.callback(
                                {examplesActive: false},
                                {
                                    isExampleSelected: true,
                                    exampleSelected: example1,
                                    exampleSelectedTitle: 'HelloWorld.min'
                                })
                        }}>
                            <div className="horizontal-group fill-container underline-group hack code-keyword" style={{
                                justifyContent: "center"
                            }}>
                                HelloWorld.min
                            </div>
                            <Linter content={example1}/>
                            <div className="code-fade"></div>
                        </div>
                        <div className="code-panel" onClick={() => {
                            props.callback(
                                {examplesActive: false},
                                {
                                    isExampleSelected: true,
                                    exampleSelected: example2,
                                    exampleSelectedTitle: 'FizzBuzz.min'
                                })
                        }}>
                            <div className="horizontal-group fill-container underline-group hack code-keyword" style={{
                                justifyContent: "center"
                            }}>
                                FizzBuzz.min
                            </div>
                            <Linter content={example2}/>
                            <div className="code-fade"></div>
                        </div>
                    </div>
                    <div className="horizontal-group fill-container examples-group-code" style={{
                        gap: '0px'
                    }}>
                        <div className="code-panel" onClick={() => {
                            props.callback(
                                {examplesActive: false},
                                {
                                    isExampleSelected: true,
                                    exampleSelected: example3,
                                    exampleSelectedTitle: 'Factorial.min'
                                })
                        }}>
                            <div className="horizontal-group fill-container underline-group hack code-keyword" style={{
                                justifyContent: "center"
                            }}>
                                Factorial.min
                            </div>
                            <Linter content={example3}/>
                            <div className="code-fade"></div>
                        </div>
                        <div className="code-panel" onClick={() => {
                            props.callback(
                                {examplesActive: false},
                                {
                                    isExampleSelected: true,
                                    exampleSelected: example4,
                                    exampleSelectedTitle: 'CounterHello.min'
                                })
                        }}>
                            <div className="horizontal-group fill-container underline-group hack code-keyword" style={{
                                justifyContent: "center"
                            }}>
                                CounterHello.min
                            </div>
                            <Linter content={example4}/>
                            <div className="code-fade"></div>
                        </div>
                    </div>
                    <div className="horizontal-group fill-container examples-group-code" style={{
                        gap: '0px'
                    }}>
                        <div className="code-panel" onClick={() => {
                            props.callback(
                                {examplesActive: false},
                                {
                                    isExampleSelected: true,
                                    exampleSelected: example5,
                                    exampleSelectedTitle: 'SayHi.min'
                                })
                        }}>
                            <div className="horizontal-group fill-container underline-group hack code-keyword" style={{
                                justifyContent: "center"
                            }}>
                                SayHi.min
                            </div>
                            <Linter content={example5}/>
                            <div className="code-fade"></div>
                        </div>
                        <div className="code-panel" onClick={() => {
                            props.callback(
                                {examplesActive: false},
                                {
                                    isExampleSelected: true,
                                    exampleSelected: example6,
                                    exampleSelectedTitle: 'Math.min'
                                })
                        }}>
                            <div className="horizontal-group fill-container underline-group hack code-keyword" style={{
                                justifyContent: "center"
                            }}>
                                Math.min
                            </div>
                            <Linter content={example6}/>
                            <div className="code-fade"></div>
                        </div>
                    </div>
                </div>
                <div className="examples-close" onClick={() => props.callback({examplesActive: false}, {
                    isExampleSelected: false,
                    exampleSelected: null,
                    exampleSelectedTitle: null
                })}></div>
            </div>
        </div>
    );
}

export default Examples;