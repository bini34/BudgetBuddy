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
  incomeSource: z.string().nonempty({ message: "Income Source is required." }),
  dateReceived: z.string().nonempty({ message: "Date Received is required." }),
  notes: z.string().optional(),
})

export function IncomeAddForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      incomeSource: '',
      dateReceived: '',
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
          <CardTitle>Add Income</CardTitle>
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

              {/* Income Source Input */}
              <FormField
                control={form.control}
                name="incomeSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="incomeSource">Income Source</FormLabel>
                    <FormControl>
                      <Input type="text" id="incomeSource" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Received Picker */}
              <FormField
                control={form.control}
                name="dateReceived"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="dateReceived">Date Received</FormLabel>
                    <FormControl>
                      <Input type="date" id="dateReceived" {...field} required />
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
                    <FormLabel htmlFor="notes">Notes (Optional)</FormLabel>
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
          <Button className="w-full" type="submit">Add Income</Button>
        </CardFooter>
      </Card>
    </div>
  );
} 