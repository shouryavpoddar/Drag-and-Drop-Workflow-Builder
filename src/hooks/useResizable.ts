import { useCallback, useState } from 'react'
import type { MouseEvent } from 'react'

export function useResizable():  {
    height: number
    handleMouseDown: (evt: MouseEvent<HTMLDivElement>) => void
    availablelHeight: number
} {
    const availablelHeight: number = window.innerHeight - 72
    const [height, setHeight] = useState(availablelHeight * 0.7);

    const handleMouseDown = useCallback((evt: MouseEvent<HTMLDivElement>) => {
        evt.preventDefault()

        const flowElement = document.getElementsByClassName(
            'react-flow__pane',
        )[0] as HTMLDivElement

        let startY: number = evt.clientY
        document.documentElement.style.cursor = 'n-resize'
        flowElement.style.cursor = 'n-resize'

        const handleMouseMove: EventListener = (event: Event) => {
            event.preventDefault()
            if (event instanceof MouseEvent && event.buttons === 1) {
                const dy: number = event.clientY - startY

                setHeight((prevHeight) => {
                    const updatedHeight: number = prevHeight + dy
                    startY = event.clientY
                    if (startY < window.innerHeight - 30) {
                        return updatedHeight;
                    }
                    return prevHeight
                })
            }
        }

        const handleMouseUp: EventListener = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.documentElement.style.cursor = ''
            flowElement.style.cursor = ''
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.documentElement.style.cursor = ''
            flowElement.style.cursor = ''
        }
    }, [])

    return { handleMouseDown, height, availablelHeight }
}
