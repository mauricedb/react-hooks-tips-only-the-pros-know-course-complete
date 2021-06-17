import React, { createContext } from "react"

import { KimrofObject, KimrofProperty } from "./Types"
import { Metadata } from "./kimrofReducer"

export interface KimrofContext {
  values: KimrofObject
  metadata: Metadata
  submitForm: () => void
  setFieldValue: (name: string, value: KimrofProperty) => void
}

export const kimrofContext = createContext<KimrofContext>({
  values: {},
  metadata: { isDirty: false, isValid: true },
  submitForm: () => void null,
  setFieldValue: () => void null,
})
