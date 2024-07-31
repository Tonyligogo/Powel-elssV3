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
import { useMutation } from "@tanstack/react-query"
import { server } from "@/server"
import axios from "axios"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
const formSchema = z.object({
    id: z.string().min(8, {
      message: "ID no must be 8 numbers long",
    }).max(8,{message:'ID no must be 8 numbers long'}),
    month:z.string(),
    year: z.string(),
    arrears: z.string(),
    house: z.string(),
    imprestAmount: z.string(),
    transport: z.string(),
  })


function AllowanceForm() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        id: "",
          month:"",
          year: "",
          arrears: "",
          house: "",
          imprestAmount: "",
          transport: "",
    },
  })

    const { mutateAsync:createAllowance, isError, isSuccess, isPending } = useMutation({
      mutationFn: async (data) => {
        await axios.post(`${server}/api/allowance/new-allowance`, data)
      },
    })

    const onSubmit = (values) => {
      const data = {
        id_no: values.id,
        month: values.month,
        year: values.year,
        arrears: values.arrears,
        house: values.house,
        imprest_amount: values.imprestAmount,
        transport: values.transport,
      };
      createAllowance(data)
    }
    useEffect(()=>{
      if(isSuccess) {
        form.reset()
        toast.success('Allowance entry was successful',{id:'success'})
      }
    },[isSuccess, form])

    if(!isPending && isError) {
      toast.error('Something went wrong. Please try again',{id:'error'})
    }
     
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border bg-card text-card-foreground p-6 shadow-sm w-3/4">
        <h1 className="text-primary text-2xl font-bold">Add employee&apos;s allowance</h1>
        <span className="text-sm text-muted-foreground">Add an employee&apos;s allowance details.</span>
        <div className="grid grid-cols-2 w-full items-center gap-4 mt-4">
       <div className="col-span-2">
       <FormField
          control={form.control}
          name="id"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID no</FormLabel>
              <FormControl>
              <Input id="id"  {...field} />
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
          name="arrears"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Arrears</FormLabel>
              <FormControl>
              <Input id="arrears"  {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="house"
          render={({ field }) => (
            <FormItem>
              <FormLabel>House</FormLabel>
              <FormControl>
              <Input id="house"  {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imprestAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Imprest Amount</FormLabel>
              <FormControl>
              <Input id="imprestAmount" {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transport</FormLabel>
              <FormControl>
              <Input id="transport" {...field} />
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

export default AllowanceForm