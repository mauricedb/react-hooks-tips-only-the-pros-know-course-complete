// Kimrof = Formik reversed :-)

import React, { ReactElement, ReactNode, useMemo, useReducer } from "react"

import { KimrofObject, KimrofProperty } from "./Types"
import { KimrofContext, kimrofContext } from "./KimrofContext"
import { kimrofReducer } from "./kimrofReducer"

interface Props<TData> {
  children: ReactNode
  initialValues: TData
  onSubmit: (values: TData) => void
}

export function Kimrof<TData extends KimrofObject>({
  children,
  initialValues,
  onSubmit,
}: Props<TData>): ReactElement {
  const [{ values, metadata }, dispatch] = useReducer(kimrofReducer, {
    values: initialValues,
    metadata: { isDirty: false, isValid: true },
  })

  const context: KimrofContext = useMemo(
    () => ({
      values,
      metadata,
      submitForm: () => onSubmit(values as TData),
      setFieldValue: (name: string, value: KimrofProperty) => {
        dispatch({ type: "set-property", payload: { name, value } })
      },
    }),
    [values, metadata, onSubmit]
  )

  return (
    <kimrofContext.Provider value={context}>{children}</kimrofContext.Provider>
  )
}
