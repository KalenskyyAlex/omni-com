import './Linter.css'

interface LinterProps {
    content: string;
}

function getRaw(content: string){
    const tagRegex = /(<code class=[^>]*>)|(<\/code>)|(<\/?pre>)/g;

    return content.replaceAll(tagRegex, '').replaceAll(/<\/?br>/g, '\n');
}

function Linter(props: LinterProps) {
    const keywordRegex = /\b(start|end|use|return|break|while|if|else|elif)\b/g;
    const operatorRegex = /(\+|-|\*|\/|%|\(|\)|\bis\b|\band\b|\bnot\b|>|<|<=|>=|==|!=|\||=)/g;
    const booleanRegex = /\b(true|false)\b/g;
    const numeralRegex = /\b(?<!@)\d+\b(?!@)/g;
    const typeRegex = /\b(int|float|str|bool)/g;
    const stringLiteralRegex = /"([^"\\]|\\.)*"/g;
    const functionRegex = /(([a-zA-Z0-9_]+)\s*(?=\|)|(?<=\bstart\s+)[a-zA-Z0-9_]+)/g;
    const libraryRegex = /(?<=\buse\s+)[a-zA-Z0-9_]+/g;
    const variableRegex = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
    const commentRegex = /~(?=(?:[^"]*"[^"]*")*[^"]*$).*/g;

    const codes = {
        keyword: "@001@",
        operator: "@002@",
        boolean: "@003@",
        numeral: "@004@",
        type: "@005@",
        string: "@006@",
        function: "@007@",
        library: "@008@",
        variable: "@009@",
        comment: "@011@",
    }

    const lint = (text: string, regex: RegExp, format: string) => {
        let match;
        let positions = [];

        while ((match = regex.exec(text)) !== null) {
            positions.push({match: match[0], index: match.index});
        }

        for (let i = positions.length - 1; i >= 0; i--) {
            text = text.slice(0, positions[i].index) + format + text.slice(positions[i].index + positions[i].match.length);
        }

        return {text, positions};
    }

    let keywords, operators, booleans, numerals, types, stringLiterals, functions, libraries, variables, comments;

    let result = lint(props.content, commentRegex, codes.comment);
    comments = result.positions;

    result = lint(result.text, stringLiteralRegex, codes.string);
    stringLiterals = result.positions;

    result = lint(result.text, numeralRegex, codes.numeral);
    numerals = result.positions;

    result = lint(result.text, functionRegex, codes.function);
    functions = result.positions;

    result = lint(result.text, libraryRegex, codes.library);
    libraries = result.positions;

    result = lint(result.text, keywordRegex, codes.keyword);
    keywords = result.positions;

    result = lint(result.text, operatorRegex, codes.operator);
    operators = result.positions;

    result = lint(result.text, booleanRegex, codes.boolean);
    booleans = result.positions;

    result = lint(result.text, typeRegex, codes.type);
    types = result.positions;

    result = lint(result.text, variableRegex, codes.variable);
    variables = result.positions;

    let formattedContent = result.text;

    for(let i = 0; i < comments.length; i++){
        formattedContent = formattedContent.replace(codes.comment, '<code class="code-comment">' + comments[i].match + '</code>');
    }

    for(let i = 0; i < stringLiterals.length; i++){
        formattedContent = formattedContent.replace(codes.string, '<code class="code-string">' + stringLiterals[i].match + '</code>');
    }

    for(let i = 0; i < keywords.length; i++){
        formattedContent = formattedContent.replace(codes.keyword, '<code class="code-keyword">' + keywords[i].match + '</code>');
    }

    for(let i = 0; i < operators.length; i++){
        formattedContent = formattedContent.replace(codes.operator, '<code class="code-operator">' + operators[i].match + '</code>');
    }

    for(let i = 0; i < booleans.length; i++){
        formattedContent = formattedContent.replace(codes.boolean, '<code class="code-boolean">' + booleans[i].match + '</code>');
    }

    for(let i = 0; i < numerals.length; i++){
        formattedContent = formattedContent.replace(codes.numeral, '<code class="code-numeral">' + numerals[i].match + '</code>');
    }

    for(let i = 0; i < types.length; i++){
        formattedContent = formattedContent.replace(codes.type, '<code class="code-type">' + types[i].match + '</code>');
    }

    for(let i = 0; i < functions.length; i++){
        formattedContent = formattedContent.replace(codes.function, '<code class="code-function">' + functions[i].match + '</code>');
    }

    for(let i = 0; i < libraries.length; i++){
        formattedContent = formattedContent.replace(codes.library, '<code class="code-library">' + libraries[i].match + '</code>');
    }

    for(let i = 0; i < variables.length; i++){
        formattedContent = formattedContent.replace(codes.variable, '<code class="code-variable">' + variables[i].match + '</code>');
    }

    return (
        <pre dangerouslySetInnerHTML={{__html: formattedContent}}></pre>
    )
}


export {getRaw};
export default Linter;