
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ClientSelector } from "./ClientSelector";
import { NewClientForm } from "./NewClientForm";
import { InvoiceLineItems, lineItemsSchema } from "./InvoiceLineItems";

// Base form schema without line items
const baseFormSchema = z.object({
  clientName: z.string().min(2, { message: "Client name is required" }),
  invoiceNumber: z.string().min(1, { message: "Invoice number is required" }),
  date: z.date(),
  dueDate: z.date(),
  status: z.enum(["draft", "due", "paid", "overdue"]),
  lineItems: lineItemsSchema.min(1, { message: "At least one line item is required" }),
});

type FormValues = z.infer<typeof baseFormSchema>;

interface NewInvoiceFormProps {
  onClose: () => void;
}

export function NewInvoiceForm({ onClose }: NewInvoiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(baseFormSchema),
    defaultValues: {
      clientName: "",
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000)).substring(1)}`,
      date: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
      status: "draft",
      lineItems: [
        {
          description: "",
          quantity: "1",
          rate: "0.00",
          unit: "hour",
          amount: "0.00",
        }
      ],
    },
  });

  const handleClientSelect = (clientName: string) => {
    form.setValue("clientName", clientName);
  };

  const handleAddNewClient = (name: string) => {
    setNewClientName(name);
    setShowClientForm(true);
  };

  const handleClientSave = (clientData: any) => {
    // In a real app, save client to backend
    console.log("New client data:", clientData);
    
    // Update the client name in the form
    form.setValue("clientName", clientData.name);
    setShowClientForm(false);
    toast.success("Client added successfully");
  };

  const handleClientCancel = () => {
    setShowClientForm(false);
  };

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    // Calculate total amount
    const totalAmount = data.lineItems.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form data:", { ...data, totalAmount });
      toast.success("Invoice created successfully!");
      setIsSubmitting(false);
      onClose();
    }, 1000);
  }

  // Watch line items for real-time calculation
  const watchLineItems = form.watch("lineItems");

  // Update form total when line items change
  useEffect(() => {
    if (watchLineItems) {
      // The total is calculated in the InvoiceLineItems component
      // This is just for additional tracking if needed
      const total = watchLineItems.reduce((sum, item) => {
        return sum + (parseFloat(item.amount) || 0);
      }, 0);
      console.log("Total updated:", total);
    }
  }, [watchLineItems]);

  if (showClientForm) {
    return <NewClientForm 
      initialName={newClientName} 
      onSave={handleClientSave} 
      onCancel={handleClientCancel} 
    />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create New Invoice</h2>
          <Button variant="ghost" size="icon" onClick={onClose} type="button">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <ClientSelector 
                    value={field.value} 
                    onChange={handleClientSelect}
                    onAddNew={handleAddNewClient}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="invoiceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="due">Due</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <InvoiceLineItems
            control={form.control}
            watch={form.watch}
            setValue={form.setValue}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Invoice"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
