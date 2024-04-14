import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Login",
    description: "Admin",
};

export default function AdminLoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col justify-center items-center mx-auto md:h-screen">
            {children}
        </div>
    )
}   