import { ProfileForm } from './profile-form'
import { Hero } from './hero'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Hero />
      <div className="flex items-center justify-center w-full h-full">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6 md:p-8 h-full">
          <h2 className="text-2xl font-semibold mb-1 text-blue-500 underline text-center">Edit Your Profile</h2>
          <ProfileForm />
        </div>
      </div>
    </div>
  </div>
  )
}

