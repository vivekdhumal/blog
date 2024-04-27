'use client';

import { Card, Label, TextInput } from "flowbite-react";
import { authenticate } from "./actions";
import SubmitButton from "../admin/components/SubmitButton";
import { useFormState } from "react-dom";

export default function Page() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    
    return (
        <Card className="w-1/4">
            <h3 className="text-xl text-center">Login</h3>
            <form action={dispatch} className="flex flex-col gap-4">
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
                <SubmitButton label="Login" />
                {errorMessage && (
                    <>
                    <p className="text-sm text-red-500 text-center">{errorMessage}</p>
                    </>
                )}
            </form>
        </Card>
    );
}