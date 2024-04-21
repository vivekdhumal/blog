'use server'
import { signIn, signOut } from "@/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function authenticate(formData: FormData) {
    await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirectTo: '/admin',
    });
}

export async function logOut() {
    cookies().delete('user_token');

    await signOut({
        redirectTo: '/login',
    });
}