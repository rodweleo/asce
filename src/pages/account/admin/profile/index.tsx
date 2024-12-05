"use client"

import { Hero } from '@/components/ui/profile/hero'
import AdminLayout from '@/components/ui/admin-layout'
import { ProfileForm } from '@/components/ui/profile/profile-form'

export default function AdminProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">Edit Your Profile</h2>
          <ProfileForm />
        </div>
      </div>
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

