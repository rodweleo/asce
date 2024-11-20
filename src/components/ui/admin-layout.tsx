"use client"

import React from 'react';
import AdminSidebar from './admin-sidebar';
import { Settings, Slash } from 'lucide-react';
import { Button } from './button';
import { SidebarProvider, SidebarTrigger } from './sidebar';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const router = useRouter();
    const pathName = usePathname();

    const paths = pathName.split("/");


    return (
        <SidebarProvider>
            <div className="flex w-full">
                <AdminSidebar />
                <main className='w-full h-full '>
                    <header className="sticky top-0 z-10 bg-white border-b">
                        <div className="flex items-center justify-between px-4 py-2">
                            <SidebarTrigger />
                            <h1 className="text-2xl font-bold">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        {
                                            paths.map((path, index: number) => {
                                                const href = '/' +
                                                    paths.slice(0, index + 1).join('/');
                                                return (
                                                    <>
                                                        <BreadcrumbItem>
                                                            <BreadcrumbLink href={href}>{path}</BreadcrumbLink>
                                                        </BreadcrumbItem>
                                                        {index < paths.length - 1 && (
                                                            <BreadcrumbSeparator>
                                                                <Slash />
                                                            </BreadcrumbSeparator>
                                                        )}
                                                        
                                                    </>
                                                )
                                            })
                                        }
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </h1>
                            <Button variant="ghost" size="icon">
                                <Settings className="h-5 w-5" />
                            </Button>
                        </div>
                    </header>
                    <section className="container mx-auto py-10 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={router.pathname}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </section>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default AdminLayout;
