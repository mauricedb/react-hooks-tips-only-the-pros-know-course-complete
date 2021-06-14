import React, { createContext } from "react"

import { KimrofObject, KimrofProperty } from "./Types"

export interface KimrofContext {
  values: KimrofObject
}

export const kimrofContext = createContext<KimrofContext>({
  values: {},
})
