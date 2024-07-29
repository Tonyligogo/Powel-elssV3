import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { server } from "@/server"
import { useAuthContext } from "@/context/AuthProvider"
import UpdatePassword from "./UpdatePassword"

export default function EditProfile() {
    const [userName, setUserName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState('');
    const [filePreview, setFilePreview] = useState(null);
    const { currentUser, setUser, avatar } = useAuthContext();
    const convertBase64 = (file)=>{
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
      });
    }
    const updateUsername = async(e)=>{
      e.preventDefault();
      setLoading(true)
      const data ={username:userName}
      await axios.put(`${server}/api/auth/update-info`,data)
      .then((res)=>{
          setUser(res.data.user)
          setUserName('')
          setLoading(false)
          toast.success('Username successfully changed', {
              id: 'success',
          })
      })
      .catch(()=>{
          toast.error('Something went wrong. Try again', {
              id: 'error',
          })
          setLoading(false)
      })
    }
    function handleAvatarChange(e){
      setFile(e.target.files)
      setFilePreview(URL.createObjectURL(e.target.files[0]))
    }
    const updateAvatar = async(e)=>{
      e.preventDefault();
      setFilePreview(null);
      setUploading(true)
      const imageFile = file[0];
      const base64 = await convertBase64(imageFile);
      const data = new FormData();
      data.set('avatar', base64);
      await axios.put(`${server}/api/auth/update-profile-pic`,{avatar:base64})
      .then((res)=>{
          setUser(res.data.user)
          setUploading(false)
          toast.success('Avatar successfully changed', {
              id: 'success',
          })
      })
      .catch((err)=>{
        console.log(err)
          toast.error('Failed to update', {
              id: 'error',
          })
          setUploading(false)
      })
    }
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mb-4">
              <Avatar>
                <AvatarImage src={avatar} />
                <AvatarFallback>PE</AvatarFallback>
            </Avatar>
            <div className='flex items-center'>
                        <input style={{ display: "none" }} type="file" id="file" onChange={handleAvatarChange}/>
                        <label htmlFor="file" className="cursor-pointer">Choose photo</label>
                        {filePreview !== null && <img src={filePreview} alt="Preview" className='size-10 ml-2 rounded-full object-cover' /> }
                    </div>
                </div>
            <Button type='button' disabled={!filePreview} onClick={updateAvatar}>{!uploading ? 'Upload' : 'Uploading...'}</Button>
            </div>
            <div className="">
            <div className="mb-4">
              <Label htmlFor="username">Username</Label>
              <Input id="username" onChange={(e)=>setUserName(e.target.value)}  defaultValue={currentUser} className="mt-1"/>
            </div>
            <Button type='button' disabled={userName.trim() === ''} onClick={updateUsername}>{!loading ? 'Update' : 'Updating username...'}</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent>
          <UpdatePassword/>
          </CardContent>
          {/* <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input id="confirm" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  )
}
