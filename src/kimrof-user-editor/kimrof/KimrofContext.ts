import React, { createContext } from "react"

import { KimrofObject, KimrofProperty } from "./Types"

export interface KimrofContext {
  values: KimrofObject
  setFieldValue: (name: string, value: KimrofProperty) => void
}

export const kimrofContext = createContext<KimrofContext>({
  values: {},
  setFieldValue: () => void null,
})
