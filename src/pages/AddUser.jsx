import CodeVerification from "@/components/custom/CodeVerification";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthContext } from "@/context/AuthProvider";
import { server } from "@/server";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AddUser() {
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({email: '', name: '', number: '', password: ''});
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const {role, loading:contextLoading} = useAuthContext()
    useEffect(()=>{
      if(!contextLoading && role.toLowerCase() !== 'admin'){
        window.history.back()
      }
    },[contextLoading, role])

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setValues({...values, [name]: value})
    }
    function validatePhoneNumber(phoneNumber) {
        const regex = /^0\d{9}$/;
        return regex.test(phoneNumber);
      }

      const validatePassword = (password) => {
          const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
        return passwordPattern.test(password)
      };
      const handleValidation = ()=>{
        if(!validatePhoneNumber(values.number)){
            toast.error('Invalid phone number', {
                id: 'error',
            })
            return false
        }
        if(!validatePassword(values.password)){
            toast.error('Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character', {
                id: 'error',
            })
            return false
        }
        return true;
      }

      const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!handleValidation()) return
        setLoading(true)
        const data = {
          username: values.name,
          email: values.email,
          phone: values.number,
          password:  values.password,
        }
        await axios.post(`${server}/api/auth/register`,data)
        .then((res)=>{
            toast.success('User successfully created', {
                id: 'success',
            })
            setToken(res.data.activationToken)
            setLoading(false)
        })
        .catch((err)=>{
            toast.error(err?.response?.data?.message, {
                id: 'error',
            })
            setLoading(false)
        })
      }

  return (
    <>
    {!token ?
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg max-w-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-primary">Add system user</h1>
        <div className="space-y-2">
            <Label>Name</Label>
            <Input name="name" required onChange={handleChange} value={values.name}/>
        </div>
        <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" name="email" required autoFocus onChange={handleChange} value={values.email}/>
        </div>
        <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input name="number" placeholder="07***, 011***" required onChange={handleChange} value={values.number}/>
        </div>
        <div className="space-y-2">
            <Label className="flex justify-between items-center gap-4">
                <span>Password</span>
                <span>{showPassword ? <Eye onClick={()=>setShowPassword(false)} size={20}/> : <EyeOff onClick={()=>setShowPassword(true)} size={20}/>}</span>

            </Label>
            <Input name="password" required type={showPassword ? 'text':'password'} onChange={handleChange} value={values.password}/>
        </div>
        <div className="flex justify-end">
            <Button type='submit' disabled={loading}>
                {loading? 'Loading...' : 'Add User'}
            </Button>
        </div>
    </form>
    :
     <CodeVerification token={token} setToken={()=>setToken('')}/>
     }
    </>
  )
}

export default AddUser