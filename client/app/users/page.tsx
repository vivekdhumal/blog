import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Suspense } from "react";

async function getUsers() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/users",{cache:"no-store"});
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    const data = await res.json();
   
    return data;
}

export default async function Page() {
    const {users} = await getUsers();

    // console.log(users);
return (
    <div className="overflow-x-auto">
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl">Users</h1>
        <Button outline pill href="/users/create">Add New</Button>
      </div>
      <Table striped> 
        <TableHead>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>isAdmin?</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          <Suspense fallback={<div>Loading...</div>}>
            { users.map((user: any) => (
                <TableRow key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                    <TableCell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Edit
                    </a>
                    </TableCell>
                </TableRow> 
            ))}
            </Suspense>
        </TableBody>
      </Table>
    </div>
)
}