import { Button } from "@/components/ui/button"
import { ChevronRight, House, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { server } from "@/server"
import axios from "axios"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    price: z.string(),
  })

function AddProduct() {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:'',
            description:'',
            category:'',
            price:''
        },
      })
    
        const { mutateAsync:createProduct, isError, isSuccess, isPending } = useMutation({
          mutationFn: async (data) => {
            await axios.post(`${server}/api/item/new-item`, data)
          },
        })
    
        const onSubmit = (values) => {
          const data = {
            name:values.name,
            desc:values.description,
            category:values.category,
            price:values.price
          };
          createProduct(data)
        }
        useEffect(()=>{
          if(isSuccess) {
            form.reset()
            toast.success('New item added successfully',{id:'success'})
          }
        },[isSuccess, form])
    
        if(!isPending && isError) {
          toast.error('Something went wrong. Please try again',{id:'error'})
        } 

  return (
    <div>
    <div className="p-4 rounded-lg bg-white mb-5 flex justify-between">
    <h1 className="text-primary text-2xl font-semibold">Add a new item</h1>
    <span className="text-gray-500 inline-flex items-center">
    <Link to='/'><House size={16} color="#d74221"/></Link>
      <ChevronRight size={16}/>
      Products 
      <ChevronRight size={16}/>
       Add-item
      </span>
  </div>
  <div>
  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg bg-card text-card-foreground p-6 shadow-sm w-full">        
        <div className="grid grid-cols-1 w-full items-center gap-4 mt-4">
       <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
              <Input id="name" {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
              <Textarea id="description" {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Category</FormLabel>
              <FormControl>
              <Input id="category"  {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
              <Input id="price" {...field} />
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
  </div>
</div>
  )
}

export default AddProduct