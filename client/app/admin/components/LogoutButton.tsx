'use client'

import { logOut } from "@/app/login/actions"
import { Button } from "flowbite-react"
import { useFormStatus } from "react-dom";
import { HiArrowSmLeft } from "react-icons/hi";

export function LogoutButton() {
  const { pending } = useFormStatus();
  
  return (
    <form action={logOut}>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" isProcessing={pending} disabled={pending}> <HiArrowSmLeft className="mr-2 h-5 w-5" /> Log Out</Button>
      </div>
    </form>
  )
}