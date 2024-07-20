export default function CommandHelp() {
    return (
        <div className="terminal_wrapper_content_output_help">
            <hr />
            <h5>help</h5>
            <hr />
            <div className="terminal_wrapper_content_output_help_command-list">
                You can use the following commands:
                <ul>
                    <li>{'>'} help - shows this information</li>
                    <li>{'>'} clear - clears this view </li>
                </ul>
            </div>
            <hr />
        </div>
    )
}