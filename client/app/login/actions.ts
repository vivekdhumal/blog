'use server'
import { signIn, signOut } from "@/auth";

export async function authenticate(formData: FormData) {
    await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirectTo: '/admin',
    });
}

export async function logOut() {
    await signOut({
        redirectTo: '/login',
    });
}