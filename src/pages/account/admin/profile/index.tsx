"use client"

import AdminLayout from '@/components/ui/admin-layout'
import { ProfileForm } from '@/components/ui/profile/profile-form'
import useActivePageName from '@/hooks/use-active-page-name'
import { useEffect } from 'react';

export default function AdminProfilePage() {
  const { setActivePageName } = useActivePageName();



  useEffect(() => {
    document.title = "Profile | asceflow.ai"

    setActivePageName("Profile")
  }, [])

  return (
    <div className="min-h-screen w-full grid place-items-center">
      <ProfileForm />
    </div>
  )
}

AdminProfilePage.getLayout = (page: React.ReactElement) => {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

