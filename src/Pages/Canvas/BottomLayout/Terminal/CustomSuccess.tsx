export default function CustomSuccess({ info }: any) {
    return (
        <div
            className="flex text-green-200 bg-green-700 border-t border-b border-green-500 -mt-[1px] mb-1 pl-2 box-border text-sm">
            <span
                className="align-top box-border font-source-code-pro whitespace-pre-wrap text-xs clear-right relative py-[3px] pr-0 pl-[22px] ml-4 min-h-[18px] flex-1 w-[calc(100%-15px)]">
                {info}
            </span>
        </div>
)
}
