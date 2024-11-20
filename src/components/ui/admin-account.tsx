
import { ReactNode } from "react";
import AdminLayout from "@/components/ui/admin-layout";

interface AdminAccountProps {
    children: ReactNode;
}

export default function AdminAccount({ children }: AdminAccountProps) {

    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    );
}
