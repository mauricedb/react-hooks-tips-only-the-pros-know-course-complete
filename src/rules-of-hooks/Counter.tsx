import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

export function Counter(): ReactElement {
  const [counter, setCounter] = useState(0)
  const button = useRef<HTMLButtonElement>(null)

  // if (counter === 2) {
  //   const [name, setName] = useState("")
  // }

  useEffect(() => {
    setTimeout(() => {
      button.current?.focus()
    }, 1000)
  }, [])

  useLayoutEffect(() => {
    if (button.current) {
      button.current.style.backgroundColor = "green"
    }
  }, [])

  return (
    <div>
      <div>Count: {counter}</div>
      <div>
        <button
          ref={button}
          className="btn btn-primary"
          onClick={() => setCounter(counter + 1)}
        >
          Increment
        </button>
      </div>
    </div>
  )
}
