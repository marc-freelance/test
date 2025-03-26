
import { useFieldArray, Control } from "react-hook-form";
import { Trash, Plus } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";

export const lineItemSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  rate: z.string().min(1, { message: "Rate is required" }),
  unit: z.enum(["hour", "day", "unit", "item", "flat"]),
  amount: z.string(),
});

export const lineItemsSchema = z.array(lineItemSchema);

type LineItem = z.infer<typeof lineItemSchema>;
type FormValues = { lineItems: LineItem[] };

interface InvoiceLineItemsProps {
  control: Control<any>;
  watch: any;
  setValue: any;
}

export function InvoiceLineItems({ control, watch, setValue }: InvoiceLineItemsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  const lineItems = watch("lineItems") || [];

  // Calculate total amount
  const calculateItemAmount = (quantity: string, rate: string) => {
    const q = parseFloat(quantity) || 0;
    const r = parseFloat(rate) || 0;
    return (q * r).toFixed(2);
  };

  // Calculate and update amount when quantity or rate changes
  const updateLineItemAmount = (index: number, quantity: string, rate: string) => {
    const amount = calculateItemAmount(quantity, rate);
    setValue(`lineItems.${index}.amount`, amount);
  };

  // Calculate total amount of all line items
  const calculateTotal = () => {
    return lineItems.reduce((total: number, item: LineItem) => {
      return total + (parseFloat(item.amount) || 0);
    }, 0).toFixed(2);
  };

  const addLineItem = () => {
    append({
      description: "",
      quantity: "1",
      rate: "0.00",
      unit: "hour",
      amount: "0.00",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-medium">Line Items</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addLineItem}
        >
          <Plus className="mr-1 h-3 w-3" /> Add Item
        </Button>
      </div>

      {fields.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>
                  <FormField
                    control={control}
                    name={`lineItems.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Description" 
                            className="border-0 p-0 h-8 focus-visible:ring-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={control}
                    name={`lineItems.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number"
                            min="0"
                            step="0.01"
                            className="border-0 p-0 h-8 focus-visible:ring-0 w-16"
                            onChange={(e) => {
                              field.onChange(e);
                              updateLineItemAmount(
                                index, 
                                e.target.value, 
                                watch(`lineItems.${index}.rate`)
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={control}
                    name={`lineItems.${index}.rate`}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number"
                            min="0"
                            step="0.01"
                            className="border-0 p-0 h-8 focus-visible:ring-0 w-20"
                            onChange={(e) => {
                              field.onChange(e);
                              updateLineItemAmount(
                                index, 
                                watch(`lineItems.${index}.quantity`), 
                                e.target.value
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={control}
                    name={`lineItems.${index}.unit`}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="border-0 p-0 h-8 w-[70px] focus:ring-0">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hour">Hour</SelectItem>
                            <SelectItem value="day">Day</SelectItem>
                            <SelectItem value="unit">Unit</SelectItem>
                            <SelectItem value="item">Item</SelectItem>
                            <SelectItem value="flat">Flat</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <FormField
                    control={control}
                    name={`lineItems.${index}.amount`}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormControl>
                          <Input 
                            {...field} 
                            readOnly
                            className="border-0 p-0 h-8 focus-visible:ring-0 text-right w-20 bg-transparent"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="h-8 w-8"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} className="text-right font-medium">
                Total:
              </TableCell>
              <TableCell className="text-right font-medium">
                ${calculateTotal()}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <div className="text-center p-4 border border-dashed rounded-md">
          <p className="text-sm text-muted-foreground">No line items added yet</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addLineItem}
            className="mt-2"
          >
            <Plus className="mr-1 h-3 w-3" /> Add First Item
          </Button>
        </div>
      )}
    </div>
  );
}
