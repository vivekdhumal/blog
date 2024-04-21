import { cookies } from "next/headers";

export const userToken = async() => { return cookies().get('user_token')?.value };