import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'Other']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BusinessOnboardingLocationInfo({ form }) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Business Location and Social Media</h2>
            <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {countries.map((country) => (
                                    <SelectItem key={country} value={country}>
                                        {country}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="socialMedia.instagram"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Instagram profile URL" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="socialMedia.tiktok"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>TikTok</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="TikTok profile URL" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="socialMedia.youtube"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>YouTube</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="YouTube channel URL" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="socialMedia.whatsapp"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="WhatsApp business number" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder="Any additional information about your business" />
                        </FormControl>
                        <FormDescription>Optional: Provide any extra details about your business</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

