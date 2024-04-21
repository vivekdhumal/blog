'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { userToken } from "../helper";

export async function createUser(formData: FormData) {
    try {
        const rawFormData = {   
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            is_admin: formData.get('is_admin')
        };
        const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/users",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": await userToken(),
            },
            body: JSON.stringify(rawFormData)
        });
    
        if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
        }

        const data = await res.json();
    } catch(error) {
        console.log(error);
    }

    redirect('/admin/users');
}

export async function updateUser(id: string, formData: FormData) {
    try {
        const rawFormData = {
            name: formData.get('name'),
            email: formData.get('email'),
            is_admin: formData.get('is_admin')
        }

        const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/users/"+id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": await userToken(),
            },
            body: JSON.stringify(rawFormData)
        });

        if(!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        // console.log(data);
    } catch (error) {
        console.log(error);
    }

    redirect('/admin/users');
}


export async function deleteUser(id: string) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/users/"+id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": await userToken(),
            }
        });

        if(!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
}