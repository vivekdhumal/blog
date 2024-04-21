import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const {handlers, auth, signIn, signOut} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;

                const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/auth/login", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials)
                })

                if(!response.ok) {
                    throw new Error("Something went wrong");
                }

                const { user: userData, token } = await response.json();

                // console.log(userData);
                cookies().set('user_token', token);

                if(!userData) {
                    throw new Error("User not found");
                }

                user = userData;

                return user;
            },
        })
    ]
})