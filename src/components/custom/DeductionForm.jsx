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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import axios from "axios"
import { server } from "@/server"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
const formSchema = z.object({
    idNo: z.string().min(8, {
      message: "ID no. must be 8 numbers long",
    }).max(8,{message:'ID no. must be 8 numbers long'}),
    month:z.string(),
    year: z.string(),
    nhifNumber: z.string(),
    nssfNumber: z.string(),
    advances: z.string(),
    taxes: z.string(),
  })


function DeductionForm() {
        const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          idNo: "",
          month: "",
          year: "",
          nhifNumber: "",
          nssfNumber: "",
          advances: "",
          taxes: "",
        },
      })
     
      const { mutateAsync:createDeduction, isError, isSuccess, isPending } = useMutation({
        mutationFn: async (data) => {
          await axios.post(`${server}/api/deduction/new-deduction`, data)
        },
      })
  
      const onSubmit = (values) => {
        const data = {
          id_no: values.idNo,
          month: values.month,
          year: values.year,
          nhif: values.nhifNumber,
          nssf: values.nssfNumber,
          advances: values.advances,
          taxes: values.taxes,
        };
        createDeduction(data)
      }
      useEffect(()=>{
        if(isSuccess) {
          form.reset()
          toast.success('Deduction entry was successful',{id:'success'})
        }
      },[isSuccess, form])
  
      if(isError) {
        toast.error('Something went wrong. Please try again',{id:'error'})
      }
      
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border bg-card text-card-foreground p-6 shadow-sm w-3/4">
        <h1 className="text-primary text-2xl font-bold">Add employee&apos;s deduction</h1>
        <span className="text-sm text-muted-foreground">Add an employee&apos;s deduction details.</span>
        <div className="grid grid-cols-2 w-full items-center gap-4 mt-4">
       <div className="col-span-2">
       <FormField
          control={form.control}
          name="idNo"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID no</FormLabel>
              <FormControl>
              <Input id="idNo"  {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
       </div>
        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Months</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger  >
                    <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent  id="month" >
                <SelectItem value="January">January</SelectItem>
                  <SelectItem value="February">February</SelectItem>
                  <SelectItem value="March">March</SelectItem>
                  <SelectItem value="April">April</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="June">June</SelectItem>
                  <SelectItem value="July">July</SelectItem>
                  <SelectItem value="August">August</SelectItem>
                  <SelectItem value="September">September</SelectItem>
                  <SelectItem value="October">October</SelectItem>
                  <SelectItem value="November">November</SelectItem>
                  <SelectItem value="December">December</SelectItem>
                </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
              <Input id="year"  {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nhifNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel >NHIF Number</FormLabel>
              <FormControl>
              <Input id="nhifNumber"  {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nssfNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NSSF Number</FormLabel>
              <FormControl>
              <Input id="nssfNumber"  {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="advances"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Advances</FormLabel>
              <FormControl>
              <Input id="advances" {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taxes</FormLabel>
              <FormControl>
              <Input id="taxes" {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        </div>
        <div className="flex justify-end gap-4 items-center mt-4">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" disabled={isPending}>{!isPending ? 'Save' : <Loader2 className="animate-spin"/> }</Button>
        </div>
      </form>
    </Form>
  )
}

export default DeductionForm