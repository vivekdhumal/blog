"use client";

import SubmitButton from "@/app/admin/components/SubmitButton";
import { Alert, Card, Label, Select, TextInput } from "flowbite-react";
import { updateUser } from "../../actions";
import { useFormState } from "react-dom";
import { HiInformationCircle } from "react-icons/hi2";

const initialState = {
  message: "",
};

const Form = ({ user }) => {
  const updateUserWithId = updateUser.bind(null, user?._id);
  const [state, formAction] = useFormState(updateUserWithId, initialState);

  return (
    <Card className="max-w-auto mt-4">
      <h1 className="text-2xl">Edit</h1>
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
          <TextInput
            id="name"
            name="name"
            type="text"
            defaultValue={user?.name}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email" />
          </div>
          <TextInput
            id="email1"
            name="email"
            type="email"
            defaultValue={user?.email}
            required
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="isAdmin" value="is Admin?" />
          </div>
          <Select
            id="isAdmin"
            defaultValue={user?.isAdmin == true ? "1" : "0"}
            name="is_admin"
            required
          >
            <option value="">-Select-</option>
            <option value={"1"}>Yes</option>
            <option value={"0"}>No</option>
          </Select>
        </div>
        <SubmitButton />
      </form>
    </Card>
  );
};

export default Form;
