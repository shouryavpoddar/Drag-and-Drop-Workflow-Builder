import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {clearLogs, updateLogs} from "../../../../StateMangement/Slices/termialSlice";
import CommandHelp from "./CommandHelp";
import CustomError from "./CustomError";
import CommandError from "./CommandError";
import CustomSuccess from "./CustomSuccess";




function Terminal() {
  const dispatch = useDispatch();
  const logs = useSelector((state: any) => state.terminal.logs);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const cmd = String(formData.get('command')).trim()
      console.log("cmd", cmd)
    if (!cmd) return

    e.currentTarget.reset()
    switch (cmd) {
      case 'clear': {
        dispatch(clearLogs());
        break
      }
      default: {
        dispatch(updateLogs({ type: cmd, command: cmd }))
        break
      }
    }
  }

  return (
    <div className="flex flex-col flex-grow overflow-hidden justify-center text-white">
      <div className="h-full overflow-y-auto flex-grow relative">
        <div className='absolute inset-0 break-words' >
          {logs.map((log: any) => {
            switch (log.type) {
              case 'help': {
                return <CommandHelp />
              }
              case 'custom_error': {
                return <CustomError error={log.error} />
              }
              case "custom_info": {
                return <CustomSuccess info={log.info} />
              }
              default: {
                return <CommandError command={log.command} />
              }
            }
          })}
        </div>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <input  name="command" className="flex h-10 w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-0 bg-transparent text-white" placeholder="type 'help' to see the commands" />
      </form>
    </div>
  )
}

export default Terminal