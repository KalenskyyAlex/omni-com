import './Linter.css'

interface LinterProps {
    content: string;
}

function getRaw(content: string){
    const tagRegex = /(<code class=[^>]*>)|(<\/code>)|(<\/?pre>)/g;

    return content.replaceAll(tagRegex, '').replaceAll(/<\/?br>/g, '\n');
}

function Linter(props: LinterProps) {
    console.log(props.content);

    const keywordRegex = /\b(start|end|use|return|break|while|if|else|elif)\b/g;
    const operatorRegex = /(\+|-|\*|\/|%|\(|\)|is|and|not|>|<|<=|>=|==|!=|\||=)/g;
    const booleanRegex = /\b(true|false)\b/g;
    const numeralRegex = /\b\d+\b/g;
    const typeRegex = /\b(int|float|str|bool)/g;
    const stringLiteralRegex = /"([^"\\]|\\.)*"/g;
    const functionRegex = /([a-zA-Z0-9_]+)\s*(?=\|)/g;
    const libraryRegex = /(?<=\buse\s+)[a-zA-Z0-9_]+/g;
    const variableRegex = /\b(?!__\w+)\w+\b/g;

    const lint = (text: string, regex: RegExp, format: string) => {
        let match;
        let positions = [];

        while ((match = regex.exec(text)) !== null) {
            positions.push({match: match[0], index: match.index});
        }

        for (let i = positions.length - 1; i >= 0; i--) {
            // text = text.slice(0, positions[i].index) + '<code className={' + format + '}>' + positions[i].match + '</code>' + text.slice(positions[i].index + positions[i].match.length);
            text = text.slice(0, positions[i].index) + '__' + format + text.slice(positions[i].index + positions[i].match.length);
        }

        return {text, positions};
    }

    let keywords, operators, booleans, numerals, types, stringLiterals, functions, libraries, variables;

    let result = lint(props.content, stringLiteralRegex, "strings");
    stringLiterals = result.positions;

    result = lint(result.text, functionRegex, "function");
    functions = result.positions;

    result = lint(result.text, libraryRegex, "library");
    libraries = result.positions;

    result = lint(result.text, keywordRegex, "keyword");
    keywords = result.positions;

    result = lint(result.text, operatorRegex, "operator");
    operators = result.positions;

    result = lint(result.text, booleanRegex, "boolean");
    booleans = result.positions;

    result = lint(result.text, numeralRegex, "numeral");
    numerals = result.positions;

    result = lint(result.text, typeRegex, "type");
    types = result.positions;

    result = lint(result.text, variableRegex, "variable");
    variables = result.positions;

    let formattedContent = result.text;

    for(let i = 0; i < stringLiterals.length; i++){
        formattedContent = formattedContent.replace("__strings", '<code class="code-string">' + stringLiterals[i].match + '</code>');
    }

    for(let i = 0; i < keywords.length; i++){
        formattedContent = formattedContent.replace("__keyword", '<code class="code-keyword">' + keywords[i].match + '</code>');
    }

    for(let i = 0; i < operators.length; i++){
        formattedContent = formattedContent.replace("__operator", '<code class="code-operator">' + operators[i].match + '</code>');
    }

    for(let i = 0; i < booleans.length; i++){
        formattedContent = formattedContent.replace("__boolean", '<code class="code-boolean">' + booleans[i].match + '</code>');
    }

    for(let i = 0; i < numerals.length; i++){
        formattedContent = formattedContent.replace("__numeral", '<code class="code-numeral">' + numerals[i].match + '</code>');
    }

    for(let i = 0; i < types.length; i++){
        formattedContent = formattedContent.replace("__type", '<code class="code-type">' + types[i].match + '</code>');
    }

    for(let i = 0; i < functions.length; i++){
        formattedContent = formattedContent.replace("__function", '<code class="code-function">' + functions[i].match + '</code>');
    }

    for(let i = 0; i < libraries.length; i++){
        formattedContent = formattedContent.replace("__library", '<code class="code-library">' + libraries[i].match + '</code>');
    }

    for(let i = 0; i < variables.length; i++){
        formattedContent = formattedContent.replace("__variable", '<code class="code-variable">' + variables[i].match + '</code>');
    }

    return (
        <pre dangerouslySetInnerHTML={{__html: formattedContent}}></pre>
    )
}


export {getRaw};
export default Linter;