import { Breadcrumb, BreadcrumbItem, Button, Card, Checkbox, Label, Select, TextInput } from "flowbite-react";

export default async function Page() {
    return (
        <div className="overflow-x-auto">
            <div className="flex mb-4 justify-between items-center">
                <h1 className="text-2xl">Users</h1>
            </div>
            <Breadcrumb aria-label="Default breadcrumb example" className="bg-gray-50 px-5 py-3 dark:bg-gray-800">
                <BreadcrumbItem href="/">
                    Home
                </BreadcrumbItem>
                <BreadcrumbItem href="/users">Users</BreadcrumbItem>
                <BreadcrumbItem>Add New</BreadcrumbItem>
            </Breadcrumb>

            <Card className="max-w-auto mt-4">
                <form className="flex max-w-md flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                        <Label htmlFor="name" value="Name" />
                        </div>
                        <TextInput id="name" type="text" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                        <Label htmlFor="email1" value="Email" />
                        </div>
                        <TextInput id="email1" type="email" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                        <Label htmlFor="password1" value="Password" />
                        </div>
                        <TextInput id="password1" type="password" required />
                    </div>
                    <div className="mb-4">
                        <div className="mb-2 block">
                        <Label htmlFor="isAdmin" value="is Admin?" />
                        </div>
                        <Select id="isAdmin" required>
                            <option value="">-Select-</option>
                            <option value={'1'}>Yes</option>
                            <option value={'0'}>No</option>
                        </Select>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Card>
        </div>
    );
}