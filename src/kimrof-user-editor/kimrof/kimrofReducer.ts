import { KimrofErrors, KimrofObject, KimrofProperty } from "./Types"

interface SetPropertyAction {
  type: "set-property"
  payload: { name: string; value: KimrofProperty }
}

interface ValidationResultAction {
  type: "validation-result"
  payload: KimrofErrors
}

type SomeAction = SetPropertyAction | ValidationResultAction

export interface Metadata {
  isDirty: boolean
  isValid: boolean | null
}

interface ReducerState {
  values: KimrofObject
  errors: KimrofErrors
  metadata: Metadata
}

export function kimrofReducer(
  state: ReducerState,
  action: SomeAction
): ReducerState {
  switch (action.type) {
    case "set-property":
      return {
        ...state,
        metadata: { ...state.metadata, isValid: null, isDirty: true },
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value,
        },
      }
    case "validation-result":
      return {
        ...state,
        metadata: {
          ...state.metadata,
          isValid: Object.keys(action.payload).length === 0,
        },
        errors: action.payload,
      }
  }

  return state
}
