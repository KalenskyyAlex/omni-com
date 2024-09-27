function emptyError (value: string, name: string) {
    if (value.length === 0) {
        return [true, name + " cannot be empty"];
    }
    else {
        return [false, ""];
    }
}

export {emptyError}