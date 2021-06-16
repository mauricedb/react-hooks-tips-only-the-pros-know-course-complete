import { ChangeEvent, useCallback, useContext } from "react"

import { kimrofContext } from "./KimrofContext"

export function useKimrofField(name: string) {
  const { values, setFieldValue } = useContext(kimrofContext)

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFieldValue(e.target.name, e.target.value)
    },
    [setFieldValue]
  )

  return {
    value: values[name],
    onChange,
  } as const
}
