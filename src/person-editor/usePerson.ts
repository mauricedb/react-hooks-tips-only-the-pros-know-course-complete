import { useState, useEffect, useCallback, useDebugValue } from "react"
import localforage from "localforage"

import type { Person } from "../types/person"
import { sleep } from "../utils"
import { useIsMounted } from "../hooks/useIsMounted"
import { useDebounce } from "../hooks/useDebounce"
import { useWillUnmount } from "../hooks/useWillUnmount"
import { useThrottle } from "../hooks/useThrottle"

function savePerson(person: Person | null): void {
  console.log("Saving", person)
  localforage.setItem("person", person)
}

export function usePerson(initialPerson: Person) {
  const [person, setPerson] = useState<Person | null>(null)
  const isMounted = useIsMounted()

  useDebugValue(person, (p) => `${p?.firstname} ${p?.surname}`)

  useEffect(() => {
    const getPerson = async () => {
      const person = await localforage.getItem<Person>("person")
      // await sleep(2500)
      if (isMounted.current) {
        setPerson(person ?? initialPerson)
      }
    }

    getPerson()
  }, [initialPerson, isMounted])

  const [, setNow] = useState(new Date())
  useEffect(() => {
    const handle = setInterval(() => setNow(new Date()), 500)
    return () => clearInterval(handle)
  }, [])

  const saveFn = useCallback(() => {
    savePerson(person)
  }, [person])

  useThrottle(saveFn, 1000)
  useWillUnmount(saveFn)

  return [person, setPerson] as const
}
