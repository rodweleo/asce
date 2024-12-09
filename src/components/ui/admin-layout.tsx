"use client"

import React from 'react';
import AdminSidebar from './admin-sidebar';
import { SidebarProvider, SidebarTrigger } from './sidebar';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import AdminProfileBtn from './admin-profile-btn';
import useActivePageName from '@/hooks/use-active-page-name';
import { AuthProvider } from './use-auth-client';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const router = useRouter();
    const { activePageName } = useActivePageName()

    return (
        <AuthProvider>
            <SidebarProvider>
                <div className="flex w-full h-screen">
                    <AdminSidebar />
                    <main className='w-full'>
                        <header className="sticky top-0 z-10 bg-white border-b py-1">
                            <div className="flex items-center justify-between px-4 py-2">
                                <SidebarTrigger />
                                <h1 className="font-bold text-xl">{activePageName}</h1>
                                <AdminProfileBtn />
                            </div>
                        </header>
                        <section className="p-5 bg-gray-50">
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
        </AuthProvider>
    );
};

export default AdminLayout;
