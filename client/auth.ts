import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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

                const { user: userData } = await response.json();

                console.log(userData);

                if(!userData) {
                    throw new Error("User not found");

                }

                user = userData;

                return user;
            },
        })
    ],
})