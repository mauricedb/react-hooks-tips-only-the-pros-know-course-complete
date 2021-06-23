import React, { createContext } from "react"

import { KimrofErrors, KimrofObject, KimrofProperty } from "./Types"
import { Metadata } from "./kimrofReducer"

export interface KimrofContext {
  values: KimrofObject
  errors: KimrofErrors
  metadata: Metadata
  submitForm: () => void
  setFieldValue: (name: string, value: KimrofProperty) => void
}

export const kimrofContext = createContext<KimrofContext>({
  values: {},
  errors: {},
  metadata: { isDirty: false, isValid: true },
  submitForm: () => void null,
  setFieldValue: () => void null,
})
