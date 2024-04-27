'use server'
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo: '/admin',
        });
    } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case 'CredentialsSignin':
              return 'Invalid credentials.';
            default:
              return 'Something went wrong.';
          }
        }
        throw error;
      }
}

export async function logOut() {
    cookies().delete('user_token');

    await signOut({
        redirectTo: '/login',
    });
}