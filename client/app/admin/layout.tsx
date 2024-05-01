import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Sidebar, SidebarItems, SidebarItemGroup, SidebarItem, SidebarLogo, SidebarCTA } from "flowbite-react";
import { HiArrowSmLeft, HiHome, HiUser } from "react-icons/hi";
import { LogoutButton } from "./components/LogoutButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Admin",
    description: "Admin",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <Sidebar aria-label="Default sidebar example" className="flex-none h-screen">
                <SidebarLogo href="/admin" img="/favicon.ico" imgAlt="Flowbite logo">
                    Blog
                </SidebarLogo>
                <SidebarItems>
                    <SidebarItemGroup>
                        <SidebarItem href="/admin">
                            <div className="flex flex-wrap gap-2 items-center">
                                <HiHome/>
                                Dashboard
                            </div>
                        </SidebarItem>
                        <SidebarItem href="/admin/users">
                            <div className="flex flex-wrap gap-2 items-center">
                                <HiUser/>
                                Manage Users
                            </div>
                        </SidebarItem>
                    </SidebarItemGroup>
                    <SidebarCTA>
                        <LogoutButton></LogoutButton>
                    </SidebarCTA>
                </SidebarItems>             
            </Sidebar> 
            <div className="flex-auto pt-6 px-6">
                {children}
            </div>
        </div>
    );
}
