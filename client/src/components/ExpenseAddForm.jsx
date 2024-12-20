"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Define the schema for the form
const formSchema = z.object({
  amount: z.number().min(0.01, { message: "Amount must be greater than 0." }),
  date: z.string().nonempty({ message: "Date is required." }),
  category: z.string().nonempty({ message: "Category is required." }),
  notes: z.string().optional(),
})

export function ExpenseAddForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      date: '',
      category: '',
      notes: '',
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {/* Amount Input */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="amount">Amount</FormLabel>
                    <FormControl>
                      <Input type="number" id="amount" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Picker */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <FormControl>
                      <Input type="date" id="date" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Dropdown */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="food">Food</SelectItem>
                          <SelectItem value="transport">Transport</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Notes Text Area */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="notes">Notes</FormLabel>
                    <FormControl>
                      <Textarea id="notes" {...field} rows="4" placeholder="Optional details" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">Add Expense</Button>
        </CardFooter>
      </Card>
    </div>
  );
} 