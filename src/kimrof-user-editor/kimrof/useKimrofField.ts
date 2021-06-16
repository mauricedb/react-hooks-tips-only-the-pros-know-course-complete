import { ChangeEvent, useCallback, useContext } from "react"

import { kimrofContext } from "./KimrofContext"

export function useKimrofField(name: string) {
  const { values } = useContext(kimrofContext)

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // TODO
  }, [])

  return {
    value: values[name],
    onChange,
  } as const
}
