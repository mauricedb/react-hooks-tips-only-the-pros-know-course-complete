// Kimrof = Formik reversed :-)

import React, { ReactElement, ReactNode, useMemo, useReducer } from "react"

import { KimrofObject, KimrofProperty } from "./Types"
import { KimrofContext, kimrofContext } from "./KimrofContext"
import { kimrofReducer } from "./kimrofReducer"

interface Props<TData> {
  children: ReactNode
  initialValues: TData
}

export function Kimrof<TData extends KimrofObject>({
  children,
  initialValues,
}: Props<TData>): ReactElement {
  const [{ values }, dispatch] = useReducer(kimrofReducer, {
    values: initialValues,
    metadata: { isDirty: false, isValid: true },
  })

  const context: KimrofContext = useMemo(
    () => ({
      values,
      setFieldValue: (name: string, value: KimrofProperty) => {
        dispatch({ type: "set-property", payload: { name, value } })
      },
    }),
    [values]
  )

  return (
    <kimrofContext.Provider value={context}>{children}</kimrofContext.Provider>
  )
}
