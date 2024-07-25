export default function CustomError({ error }: any) {
    return (
        <div className="terminal_wrapper_content_output_error">
            <span>
                {error}
            </span>
        </div>
    )
}
