function emptyError (value: string, name: string): [boolean, string[]] {
    if (value.length === 0) {
        return [true, [name + " cannot be empty"]];
    }

    return [false, []];
}

function noCapitalError (value: string, name: string): [boolean, string[]] {
    const hasCapitalRegex = /[A-Z]/g;
    if (value.match(hasCapitalRegex) === null) {
        return [true, [name + " must contain capital letter"]];
    }

    return [false, []];
}

function noSpecialSymbolError (value: string, name: string): [boolean, string[]] {
    const hasSpecSymbolRegex = /[@/!#$%^&*()_+<>?.,\\]/g;
    if (value.match(hasSpecSymbolRegex) === null) {
        return [true, [name + " must contain capital letter"]];
    }

    return [false, []];
}

function invalidEmailError (value: string, name: string): [boolean, string[]] {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/g;
    if (value.match(emailRegex) === null) {
        return [true, [name + " has invalid format"]];
    }

    return [false, []];
}

function lengthError (value: string, name: string, length: number): [boolean, string[]] {
    if (value.length < length) {
        return [true, [name + " must be at least " + length + " long"]];
    }

    return [false, []];
}

function matchError (value: string, name: string, match: string): [boolean, string[]] {
    if (value !== match) {
        return [true, [name + " do not match"]];
    }

    return [false, []];
}

function noError (value: string, name: string, length: number): [boolean, string[]] {
    return [false, []];
}

export {emptyError, noCapitalError, lengthError, noSpecialSymbolError, invalidEmailError, noError, matchError}