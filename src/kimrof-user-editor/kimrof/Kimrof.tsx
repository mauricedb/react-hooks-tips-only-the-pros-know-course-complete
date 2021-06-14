// Kimrof = Formik reversed :-)

import React, { ReactElement, ReactNode, useMemo } from "react"

import { KimrofObject, KimrofProperty } from "./Types"
import { KimrofContext, kimrofContext } from "./KimrofContext"

interface Props<TData> {
  children: ReactNode
  initialValues: TData
}

export function Kimrof<TData extends KimrofObject>({
  children,
  initialValues,
}: Props<TData>): ReactElement {
  const values = initialValues

  const context: KimrofContext = useMemo(() => ({ values }), [values])

  return (
    <kimrofContext.Provider value={context}>{children}</kimrofContext.Provider>
  )
}
