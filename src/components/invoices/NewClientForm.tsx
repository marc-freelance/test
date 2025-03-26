
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const clientFormSchema = z.object({
  name: z.string().min(2, { message: "Client name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }).optional().or(z.literal("")),
  billingAddress: z.string().min(1, { message: "Billing address is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  phone: z.string().optional().or(z.literal("")),
  isBusiness: z.boolean().default(false),
  vat: z.string().optional().or(z.literal("")),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

interface NewClientFormProps {
  initialName: string;
  onSave: (clientData: ClientFormValues) => void;
  onCancel: () => void;
}

export function NewClientForm({ initialName, onSave, onCancel }: NewClientFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: initialName,
      email: "",
      billingAddress: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      isBusiness: false,
      vat: "",
    },
  });

  // Watch if the client is a business to conditionally show VAT field
  const isBusiness = form.watch("isBusiness");

  function onSubmit(data: ClientFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(data);
      setIsSubmitting(false);
    }, 500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            type="button" 
            className="p-0 mr-2" 
            onClick={onCancel}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">Add New Client</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter client name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="client@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="(123) 456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isBusiness"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Business Client</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {isBusiness && (
            <FormField
              control={form.control}
              name="vat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VAT Number</FormLabel>
                  <FormControl>
                    <Input placeholder="VAT number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="billingAddress"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Billing Address*</FormLabel>
                <FormControl>
                  <Input placeholder="Billing address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Physical Address*</FormLabel>
                <FormControl>
                  <Input placeholder="Street address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City*</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province*</FormLabel>
                <FormControl>
                  <Input placeholder="State/Province" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip/Postal Code*</FormLabel>
                <FormControl>
                  <Input placeholder="Zip/Postal code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country*</FormLabel>
                <FormControl>
                  <Input placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Client"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
