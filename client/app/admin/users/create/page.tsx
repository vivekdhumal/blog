"use client";

import {
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import { createUser } from "../actions";
import SubmitButton from "../../components/SubmitButton";
import { useFormState } from "react-dom";
import { HiInformationCircle } from "react-icons/hi2";

const initialState = {
  message: "",
};

export default function Page() {
  const [state, formAction] = useFormState(createUser, initialState);

  return (
    <div className="overflow-x-auto">
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl">Users</h1>
      </div>
      <Breadcrumb
        aria-label="Default breadcrumb example"
        className="bg-gray-50 px-5 py-3 dark:bg-gray-800"
      >
        <BreadcrumbItem href="/admin/users">Users</BreadcrumbItem>
        <BreadcrumbItem>Add New</BreadcrumbItem>
      </Breadcrumb>

      <Card className="max-w-auto mt-4">
        <h1 className="text-2xl">Add New</h1>
        {state?.message && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">{state?.message}</span>
          </Alert>
        )}

        <form action={formAction} className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput id="name" name="name" type="text" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput id="email1" name="email" type="email" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              id="password1"
              name="password"
              type="password"
              required
            />
          </div>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="isAdmin" value="is Admin?" />
            </div>
            <Select id="isAdmin" name="is_admin" required>
              <option value="">-Select-</option>
              <option value={"1"}>Yes</option>
              <option value={"0"}>No</option>
            </Select>
          </div>
          <SubmitButton />
        </form>
      </Card>
    </div>
  );
}
