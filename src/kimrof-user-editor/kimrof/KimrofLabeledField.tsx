import React, { ComponentProps, ReactElement } from "react"

import { LabeledInput } from "../../components"
import { useKimrofField } from "./useKimrofField"

type LabeledInputProps = ComponentProps<typeof LabeledInput>

interface Props extends Omit<LabeledInputProps, "onChange" | "value"> {
  name: string
}

export function KimrofLabeledField(props: Props): ReactElement {
  const fieldProps = useKimrofField(props.name)

  return <LabeledInput {...props} {...fieldProps} />
}
