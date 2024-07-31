import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { server } from "@/server";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ServiceEntryForm() {
    const [counter, setCounter] = useState("");
    const [values, setValues] = useState({
        name: '',
        employee: '',
        location: '',
        duration: '',
        cost: '',
        scope: '',
        scopeDesc:'',
        date: '',
    })
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value });
    }
    const fetchCount = async () => {
        const { data: count } = await axios.get(`${server}/api/services/get-count`);
        setCounter(count?.count);
        return count;
      };
      useEffect(() => {
        fetchCount();
      }, []);
      const { mutateAsync:recordService, isError, isPending, isSuccess } = useMutation({
        mutationFn: async (data) => {
          await axios.post(`${server}/api/services/new-service`, data)
        },
      })
      function generateInvoiceCode(num) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
    
        const invoiceCode = `Inv-${num}-${currentMonth}-${currentYear}`;
        return invoiceCode;
      }
      const handleSubmit = (e) => {
        e.preventDefault();
        recordService({
            client_name: values.name,
            staff_id: values.employee,
            work_location: values.location,
            work_duration: values.duration,
            cost: values.cost,
            scope: values.scope,
            scope_description: values.scopeDesc,
            date: values.date,
            invoice_code: generateInvoiceCode(counter),
            count:counter,
        })
      }
      useEffect(()=>{
        if(isSuccess) {
            setValues({
                name: '',
        employee: '',
        location: '',
        duration: '',
        cost: '',
        scope: '',
        scopeDesc:'',
        date: '',
            })
          toast.success('Service recorded successfully',{id:'success'})
          fetchCount();
        }
      },[isSuccess])
    
      if(!isPending && isError) {
        toast.error('Something went wrong. Please try again',{id:'error'})
      }
  return (
    <form onSubmit={handleSubmit} className="border p-4 pb-6 rounded-lg">
        <div className="grid grid-cols-1 gap-4 mb-3">
            <div>
                <Label>Client name</Label>
                <Input name='name' required value={values.name} onChange={handleChange}/>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
                <Label>Employee Id</Label>
                <Input name='employee' required value={values.employee} onChange={handleChange}/>
            </div>
            <div>
                <Label>Work location</Label>
                <Input name='location' required value={values.location} onChange={handleChange}/>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
                <Label>Work duration</Label>
                <Input name='duration' required value={values.duration} onChange={handleChange}/>
            </div>
            <div>
                <Label>Cost</Label>
                <Input name='cost' required value={values.cost} onChange={handleChange}/>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
                <Label>Scope</Label>
                <Input name='scope' required value={values.scope} onChange={handleChange}/>
            </div>
            <div>
                <Label>Scope description</Label>
                <Textarea name='scopeDesc' required value={values.scopeDesc} onChange={handleChange}/>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
                <Label>Date</Label>
                <Input name='date' type="date" required value={values.date} onChange={handleChange}/>
            </div>
            <div>
                <Label>Invoice code</Label>
                <Input name='code' readOnly defaultValue={counter !== '' ? generateInvoiceCode(counter):''}/>
            </div>
        </div>
        <div className="flex justify-end">
            <Button type='submit'>Save</Button>
        </div>
    </form>
  )
}

export default ServiceEntryForm
