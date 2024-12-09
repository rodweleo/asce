'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from './image-upload'
import toast from "react-hot-toast"
import { useAuth } from '../use-auth-client'


const profileFormSchema = z.object({
  principalId: z.string().optional(),
  accountId: z.string().min(2, {
    message: 'Business name must be at least 2 characters.',
  }),
  name: z.string().min(2, {
    message: 'Business name must be at least 2 characters.',
  }),
  logo: z.string().optional(),
  description: z.string().max(500, {
    message: 'Description must not exceed 500 characters.',
  }),
  industry: z.string().min(1, {
    message: 'Please select an industry.',
  }),
  website: z.string().url({
    message: 'Please enter a valid URL.',
  }).optional().or(z.literal('')),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: 'Please enter a valid phone number.',
  }),
  address: z.object({
    street: z.string().min(1, { message: 'Street is required.' }),
    city: z.string().min(1, { message: 'City is required.' }),
    state: z.string().min(1, { message: 'State is required.' }),
    zipCode: z.string().min(1, { message: 'Zip code is required.' }),
    country: z.string().min(1, { message: 'Country is required.' }),
  }),
  socialMedia: z.object({
    linkedin: z.string().url({ message: 'Please enter a valid LinkedIn URL.' }).optional().or(z.literal('')),
    twitter: z.string().url({ message: 'Please enter a valid Twitter URL.' }).optional().or(z.literal('')),
    facebook: z.string().url({ message: 'Please enter a valid Facebook URL.' }).optional().or(z.literal('')),
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// You would typically fetch this data from your backend


export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)

  const { principal } = useAuth()

  const defaultValues: ProfileFormValues = {
    principalId: principal ? principal.toText() : "",
    accountId: "",
    name: 'Asceflow Technologies',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    description: 'Leading business automation solutions provider',
    industry: 'Technology',
    website: 'https://asceflow.com',
    email: 'contact@asceflow.com',
    phone: '+254795565344',
    address: {
      street: '123 Business Ave',
      city: 'Tech City',
      state: 'Innovation State',
      zipCode: '12345',
      country: 'Kenya'
    },
    socialMedia: {
      linkedin: 'https://linkedin.com/company/asceflow',
      twitter: 'https://twitter.com/asceflow',
      facebook: 'https://facebook.com/asceflow'
    }
  }


  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    try {
      // await updateProfile(data)

      toast.success("Your business profile has been successfully updated.")

    } catch (error) {

      toast.error("An error occurred while updating your profile. Please try again.")

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white shadow-md rounded-lg p-8 w-full ">
          <FormField
            control={form.control}
            name="principalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Business Principal ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business principal ID" {...field} defaultValue={principal ? principal.toText() : ""} />
                </FormControl>
                <FormDescription>
                  This is the principal ID that will be displayed on your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Business Account ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business account ID" {...field} />
                </FormControl>
                <FormDescription>
                  This is the account ID that will be displayed on your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name that will be displayed on your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Business Logo</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormDescription>
                  Upload your business logo or profile image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Business Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your business"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a brief description of your business (max 500 characters).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your business website URL.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Email</FormLabel>
                <FormControl>
                  <Input placeholder="contact@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your business contact email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your business phone number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Address</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Street</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">State</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Zip Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Social Media</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="socialMedia.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">LinkedIn</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/company/yourbusiness" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialMedia.twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Twitter</FormLabel>
                    <FormControl>
                      <Input placeholder="https://twitter.com/yourbusiness" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialMedia.facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Facebook</FormLabel>
                    <FormControl>
                      <Input placeholder="https://facebook.com/yourbusiness" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

