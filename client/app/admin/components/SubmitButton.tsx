"use client"

import { Button } from "flowbite-react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({label = 'Submit'}) => {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" isProcessing={pending} disabled={pending}>
        { label }
        </Button>
    );
}

export default SubmitButton;