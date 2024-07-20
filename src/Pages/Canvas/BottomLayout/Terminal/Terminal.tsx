import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Input} from "../../../../Components/Inputs";




function Terminal() {
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const cmd = String(formData.get('command')).trim()
    if (!cmd) return

    e.currentTarget.reset()
    // switch (cmd) {
    //   case 'clear': {
    //     dispatch(clearLogs());
    //     break
    //   }
    //   default: {
    //     dispatch(updateLogs({ type: cmd, command: cmd }))
    //     break
    //   }
    // }
  }

  return (
    <div className="flex flex-col flex-grow overflow-hidden justify-center">
      <div className="h-full overflow-y-auto flex-grow relative">
        <div className='absolute inset-0 break-words' >
          {/*{logs.map((log: Log) => {*/}
          {/*  switch (log.type) {*/}
          {/*    case 'help': {*/}
          {/*      return <CommandHelp />*/}
          {/*    }*/}
          {/*    case 'custom_error': {*/}
          {/*      return <CustomError error={log.error} />*/}
          {/*    }*/}
          {/*    case "custom_info": {*/}
          {/*      return <CustomInfo info={log.info} />*/}
          {/*    }*/}
          {/*    default: {*/}
          {/*      return <CommandError command={log.command} />*/}
          {/*    }*/}
          {/*  }*/}
          {/*})}*/}
        </div>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <input className="flex h-10 w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-0 bg-transparent text-white" placeholder="type 'help' to see the commands" />
      </form>
    </div>
  )
}

export default Terminal
