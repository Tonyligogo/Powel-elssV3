import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { server } from "@/server";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthProvider";
axios.defaults.withCredentials = true;

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Must have at least 1 character" })
    .email({
      message: "Must be a valid email",
    }),
  password: z.string().min(1, { message: "Must have at least 1 character" }),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setToken, setUser, authenticated } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (authenticated) {
      navigate("/", { replace: true });
    }
  }, [authenticated, navigate]);

  const {
    mutateAsync: loginUser,
    isError,
    isSuccess,
    isPending,
    data,
  } = useMutation({
    mutationFn: async (formData) => {
      return await axios.post(`${server}/api/auth/login`, formData);
    },
  });
  const onSubmit = (values) => {
    loginUser(values);
  };
  if (isError) {
    toast.error("Invalid credentials", { id: "error" });
  } else if (!isPending && isSuccess) {
    toast.success("Logged in successfully", { id: "success" });
    setToken(data.data.accessToken);
    setUser(data.data.user);
    navigate("/", { replace: true });
    // window.location.href = "/"
  }

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen border border-red-300">
      <h1 className="text-3xl font-semibold text-primary">
        Sign in to Powel-elss
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-fit w-1/2 lg:w-1/3 space-y-6 rounded-xl border p-6 "
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoFocus
                    required
                    placeholder="powelelss@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex justify-between gap-4 items-center'>
                  <span>Password</span>
                  <span>{showPassword ? <Eye onClick={()=>setShowPassword(false)} size={20}/> : <EyeOff onClick={()=>setShowPassword(true)} size={20}/>}</span>
                </FormLabel>
                <FormControl>
                  <Input type={showPassword ? 'text':'password'} required {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? <Loader2 className="animate-spin" /> : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Login;
