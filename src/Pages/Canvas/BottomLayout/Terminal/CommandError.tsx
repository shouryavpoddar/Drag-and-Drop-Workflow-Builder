

export default function CommandError({ command }: any) {
    return (
        <div className="terminal_wrapper_content_output_error">
            <span>
                command {`"${command}"`} not found. Type {`"help"`} to see the list of commands.
            </span>
        </div>
    )
}
