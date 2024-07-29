import { Button } from "@/components/ui/button";
import { ChevronRight, House, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { server } from "@/server";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  id: z.string(),
  salary: z.string(),
  number: z.string(),
  jobTitle: z.string(),
  pno: z.string(),
});

function AddStaff() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      id: "",
      salary: "",
      number: "",
      jobTitle: "",
      pno: "",
    },
  });

  const {
    mutateAsync: addStaff,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (data) => {
      await axios.post(`${server}/api/staff/new-employee`, data);
    },
  });

  const onSubmit = (values) => {
    const data = {
      first_name: values.firstname,
      surname: values.lastname,
      id_no: values.id,
      phone_no: values.number,
      basic_salary: values.salary,
      job_title: values.jobTitle,
      P_no: values.pno,
    };
    addStaff(data);
  };
  useEffect(() => {
    if (isSuccess) {
      form.reset();
      toast.success("New staff record added successfully", { id: "success" });
    }
  }, [isSuccess, form]);

  if (!isPending && isError) {
    toast.error("Something went wrong. Please try again", { id: "error" });
  }

  return (
    <div>
      <div className="p-4 rounded-lg bg-white mb-5 flex justify-between">
        <h1 className="text-primary text-2xl font-semibold">Add a new staff member</h1>
        <span className="text-gray-500 inline-flex items-center">
          <Link to="/">
            <House size={16} color="#d74221" />
          </Link>
          <ChevronRight size={16} />
          Staff
          <ChevronRight size={16} />
          New-staff
        </span>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg bg-card text-card-foreground p-6 shadow-sm w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-4 mt-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input id="firstname" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input id="lastname" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID number</FormLabel>
                    <FormControl>
                      <Input id="id" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input id="number" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Basic salary</FormLabel>
                    <FormControl>
                      <Input id="salary" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job title</FormLabel>
                    <FormControl>
                      <Input id="jobTitle" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>P/No</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select P/No" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PE-01">PE-01</SelectItem>
                          <SelectItem value="PE-02">PE-02</SelectItem>
                          <SelectItem value="PE-03">PE-03</SelectItem>
                          <SelectItem value="PE-04">PE-04</SelectItem>
                          <SelectItem value="PE-05">PE-05</SelectItem>
                          <SelectItem value="PE-06">PE-06</SelectItem>
                          <SelectItem value="PE-07">PE-07</SelectItem>
                          <SelectItem value="PE-08">PE-08</SelectItem>
                          <SelectItem value="PE-09">PE-09</SelectItem>
                          <SelectItem value="PE-10">PE-10</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-4 items-center mt-4">
              <Button type="button" onClick={()=>form.reset()} variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {!isPending ? "Save" : <Loader2 className="animate-spin" />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddStaff;
