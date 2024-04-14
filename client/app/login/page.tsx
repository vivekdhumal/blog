import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { authenticate } from "./actions";
import { auth } from "@/auth";
import SubmitButton from "../admin/components/SubmitButton";

export default async function Page() {
    const session = await auth();

    return (
        <Card className="w-1/4">
            <h3 className="text-xl text-center">Login {session?.user?.name}</h3>
            <form action={authenticate} className="flex flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="email1" value="Email" />
                    </div>
                    <TextInput id="email1" name="email" type="email" required autoFocus={true} />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="password1" value="Password" />
                    </div>
                    <TextInput id="password1" name="password" type="password" required />
                </div>
                {/* <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                </div> */}
                <SubmitButton label="Login" />
            </form>
        </Card>
    );
}