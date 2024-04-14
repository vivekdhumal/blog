'use client'

import { logOut } from "@/app/login/actions"
import { Button } from "flowbite-react"

export function LogoutButton() {
  return (
    <form action={logOut}>
      <Button type="submit">Log Out</Button>
    </form>
  )
}