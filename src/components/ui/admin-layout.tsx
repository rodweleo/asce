"use client"

import React from 'react';
import AdminSidebar from './admin-sidebar';
import { SidebarProvider, SidebarTrigger } from './sidebar';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import AdminProfileBtn from './admin-profile-btn';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const router = useRouter();

    return (
        <SidebarProvider>
            <div className="flex w-full">
                <AdminSidebar />
                <main className='w-full h-full '>
                    <header className="sticky top-0 z-10 bg-white border-b">
                        <div className="flex items-center justify-between px-4 py-2">
                            <SidebarTrigger />
                            <AdminProfileBtn />
                        </div>
                    </header>
                    <section className="container mx-auto py-10 overflow-y-auto bg-gray-50">
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
