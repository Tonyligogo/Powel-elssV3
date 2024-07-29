/* eslint-disable react/prop-types */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
  
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { server } from "@/server"
import axios from "axios"
import { Loader2 } from "lucide-react"
const formSchema = z.object({
    recordedBy: z.string(),
    cost: z.string(),
    service: z.string(),
  })

function ExpenseForm() {
  const [counter, setCounter] = useState('')

  const fetchCount = async () => {
    const {data:count} = await axios.get(`${server}/api/expense/get-count`)
    setCounter(count?.count)
    return count
  }
  useEffect(()=>{
    fetchCount()
  },[])
        const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            service: "",
            cost: "",
            recordedBy: "",
        },
      })
      const currentDate = new Date().toLocaleDateString();
      const code = 'Exp-'+counter;
     
      const { mutateAsync:createExpense, isError, isSuccess, isPending } = useMutation({
        mutationFn: async (data) => {
          await axios.post(`${server}/api/expense/new-expense`, data)
        },
      })
  
      const onSubmit = (values) => {
        const data = {
          code,
          service_item_name: values.service,
          total_cost: values.cost,
          recorded_by: values.recordedBy,
          date: currentDate,
          count: counter
        };
        createExpense(data)
      }

      useEffect(()=>{
        if(isSuccess) {
          form.reset()
          toast.success('Expense entry was successful',{id:'success'})
          fetchCount()
        }
      },[isSuccess, form])
  
      if(isError) {
        toast.error('Something went wrong. Please try again',{id:'error'})
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border bg-card text-card-foreground p-6 shadow-sm w-3/4">
        <h1 className="text-primary text-2xl font-bold">Record an expense</h1>
        <span className="text-sm text-muted-foreground">Record expense incurred</span>
        <div className="grid grid-cols-2 w-full items-center gap-4 mt-4">
       <div className="col-span-2">
       <FormField
          control={form.control}
          name="service"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service / Item name</FormLabel>
              <FormControl>
              <Input id="service"  {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
       </div>
        
        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost</FormLabel>
              <FormControl>
              <Input id="cost" {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recordedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Recorded by</FormLabel>
              <FormControl>
              <Input id="recordedBy"  {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <div>
            <Label>Code</Label>
            <Input readOnly defaultValue={code} />
        </div>
        <div>
            <Label>Date</Label>
            <Input readOnly defaultValue={currentDate}/>
        </div>
        </div>
        <div className="flex justify-end gap-4 items-center mt-4">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" disabled={isPending}>{!isPending ? 'Save' : <Loader2 className="animate-spin"/> }</Button>
        </div>
      </form>
    </Form>
  )
}

export default ExpenseForm