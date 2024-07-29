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

const formSchema = z.object({
  name: z.string(),
  address: z.string(),
  email: z.string(),
  contact_person: z.string(),
  phone: z.string(),
});

function AddCustomer() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      contact_person: "",
      phone: "",
    },
  });

  const {
    mutateAsync: addStaff,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (data) => {
      await axios.post(`${server}/api/customer/new-customer`, data);
    },
  });

  const onSubmit = (values) => {
    addStaff(values);
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
        <h1 className="text-primary text-2xl font-semibold">Add a new customer</h1>
        <span className="text-gray-500 inline-flex items-center">
          <Link to="/">
            <House size={16} color="#d74221" />
          </Link>
          <ChevronRight size={16} />
            Our Customers
          <ChevronRight size={16} />
          New-customer
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input id="name" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input id="address" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' id="email" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact_person"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input id="contact_person" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input id="phone" {...field} />
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

export default AddCustomer;
