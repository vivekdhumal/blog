'use server'

import { redirect } from "next/navigation";

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

    redirect('/users');
}