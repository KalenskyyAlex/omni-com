interface LinterProps {
    content: string;
}

function Linter(props: LinterProps) {
    return (
        <div>{props.content}</div>
    )
}

export default Linter;