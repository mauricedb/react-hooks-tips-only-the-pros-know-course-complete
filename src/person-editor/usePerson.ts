import { useState, useEffect } from "react"
import localforage from "localforage"

import type { Person } from "../types/person"

function savePerson(person: Person | null): void {
  console.log("Saving", person)
  localforage.setItem("person", person)
}

export function usePerson(initialPerson: Person) {
  const [person, setPerson] = useState<Person | null>(null)

  useEffect(() => {
    const getPerson = async () => {
      const person = await localforage.getItem<Person>("person")
      setPerson(person ?? initialPerson)
    }

    getPerson()
  }, [initialPerson])

  useEffect(() => {
    savePerson(person)
  }, [person])

  return [person, setPerson] as const
}
