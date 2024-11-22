import AdminLayout from "../../../../../components/ui/admin-layout";
import AdminContentUploadForm from "../../../../../components/ui/AdminContentUploadForm";
import { ReactElement } from "react";

export default function AdminDigitalMarketingContentUpload() {
    return (
        <div className="w-full">
            <AdminContentUploadForm />
        </div>
    )
}

AdminDigitalMarketingContentUpload.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminLayout>{page}</AdminLayout>
    )
};