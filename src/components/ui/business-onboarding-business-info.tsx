
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BusinessOnboardingBusinessInfo({ form }) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Business Information</h2>
            <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="businessLogo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Business Logo</FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        field.onChange(e.target.files[0])
                                    }
                                }}
                            />
                        </FormControl>
                        <FormDescription>Upload your business logo</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description (max 250 characters)</FormLabel>
                        <FormControl>
                            <Textarea {...field} maxLength={250} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                            <Input {...field} type="tel" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                            <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

