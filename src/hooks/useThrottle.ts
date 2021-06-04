import { useEffect, useRef, useDebugValue } from "react"

export function useThrottle(fn: () => void, timeout: number): void {
  const previousRef = useRef<(() => void) | null>(null)
  const currentRef = useRef<(() => void) | null>(fn)
  if (previousRef.current !== fn) {
    currentRef.current = fn
  }

  useDebugValue(currentRef.current, (fn) => fn?.toString())

  useEffect(() => {
    const handle = setInterval(() => {
      if (currentRef.current) {
        previousRef.current = currentRef.current
        currentRef.current()
        currentRef.current = null
      }
    }, timeout)

    return () => clearInterval(handle)
  }, [timeout])
}
