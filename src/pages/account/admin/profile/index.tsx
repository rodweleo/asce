"use client"

// import { Hero } from '@/components/ui/profile/hero'
import AdminLayout from '@/components/ui/admin-layout'
import { ProfileForm } from '@/components/ui/profile/profile-form'

export default function AdminProfilePage() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
      {/* <Hero /> */}
      <div className="flex items-center w-full h-full">
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className=" rounded-lg p-6 md:p-8 h-full">
            <h2 className="text-2xl font-semibold mb-1 text-blue-500 text-center -mt-10"></h2>
            <ProfileForm />
          </div>
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

