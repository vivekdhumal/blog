import { Breadcrumb, BreadcrumbItem, Button, Card, Label, Select, TextInput } from "flowbite-react";
import { updateUser } from "../../actions";
import SubmitButton from "@/app/admin/components/SubmitButton";

async function getUserById(id: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/users/"+id,{cache:"no-store"});
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    const data = await res.json();
   
    return data;
}

export default async function Page({params}: {params: {id: string}}) {
    const {user} = await getUserById(params.id);

    const updateUserWithId = updateUser.bind(null, params.id);

    return (
        <div className="overflow-x-auto">
            <div className="flex mb-4 justify-between items-center">
                <h1 className="text-2xl">Users</h1>
            </div>
            <Breadcrumb aria-label="Default breadcrumb example" className="bg-gray-50 px-5 py-3 dark:bg-gray-800">
                <BreadcrumbItem href="/admin">
                    Home
                </BreadcrumbItem>
                <BreadcrumbItem href="/admin/users">Users</BreadcrumbItem>
                <BreadcrumbItem>Edit</BreadcrumbItem>
            </Breadcrumb>

            <Card className="max-w-auto mt-4">
                <form action={updateUserWithId} className="flex max-w-md flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Name" />
                        </div>
                        <TextInput id="name" name="name" type="text" defaultValue={user.name} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Email" />
                        </div>
                        <TextInput id="email1" name="email" type="email" defaultValue={user.email} required />
                    </div>
                    <div className="mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="isAdmin" value="is Admin?" />
                        </div>
                        <Select id="isAdmin" defaultValue={user.isAdmin == true ? '1' : '0'} name="is_admin" required>
                            <option value="">-Select-</option>
                            <option value={'1'}>Yes</option>
                            <option value={'0'}>No</option>
                        </Select>
                    </div>
                    <SubmitButton />
                </form>
            </Card>
        </div>
    );
}