// Kimrof = Formik reversed :-)

import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
} from "react"

import { KimrofErrors, KimrofObject, KimrofProperty } from "./Types"
import { KimrofContext, kimrofContext } from "./KimrofContext"
import { kimrofReducer } from "./kimrofReducer"
import { useThrottle } from "../../hooks/useThrottle"

interface Props<TData> {
  children: ReactNode
  initialValues: TData
  onSubmit: (values: TData) => void
  validate?: (values: TData) => KimrofErrors
}

export function Kimrof<TData extends KimrofObject>({
  children,
  initialValues,
  onSubmit,
  validate,
}: Props<TData>): ReactElement {
  const [{ values, errors, metadata }, dispatch] = useReducer(kimrofReducer, {
    values: initialValues,
    errors: {},
    metadata: { isDirty: false, isValid: true },
  })

  const context: KimrofContext = useMemo(
    () => ({
      values,
      errors,
      metadata,
      submitForm: () => onSubmit(values as TData),
      setFieldValue: (name: string, value: KimrofProperty) => {
        dispatch({ type: "set-property", payload: { name, value } })
      },
    }),
    [values, errors, metadata, onSubmit]
  )

  const validateValues = useCallback(() => {
    if (validate) {
      const errors = validate(values as TData)
      dispatch({ type: "validation-result", payload: errors })
    }
  }, [validate, values])

  useThrottle(validateValues, 100)

  return (
    <kimrofContext.Provider value={context}>{children}</kimrofContext.Provider>
  )
}
