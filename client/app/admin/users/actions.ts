"use server";

import { redirect } from "next/navigation";
import { userToken } from "../helper";

export async function createUser(prevState: any, formData: FormData) {
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    is_admin: formData.get("is_admin"),
  };
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await userToken(),
    },
    body: JSON.stringify(rawFormData),
  });

  const data = await res.json();

  if (res.ok) {
    redirect("/admin/users");
  }

  return data;
}

export async function updateUser(
  id: string,
  prevState: any,
  formData: FormData,
) {
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    is_admin: formData.get("is_admin"),
  };

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/users/" + id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: await userToken(),
      },
      body: JSON.stringify(rawFormData),
    },
  );

  const data = await res.json();

  if (res.ok) {
    redirect("/admin/users");
  }

  return data;
}

export async function deleteUser(id: string) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/users/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: await userToken(),
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}
