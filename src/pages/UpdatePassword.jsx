import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthProvider";
import { server } from "@/server";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function UpdatePassword() {

    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newpasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const { userId, removeToken } = useAuthContext();
    const navigate = useNavigate();

  const handleLogOut = () => {
    const data = { user: userId };
    axios.post(`${server}/api/auth/logout`, data).then(() => {
      removeToken();
      navigate("/login",{replace: true});
    });
  };

  // Password regex pattern (example: minimum 8 characters, at least one letter and one number)
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const validatePassword = () => {
    if (!passwordPattern.test(newPassword)) {
      setNewPasswordError('Password must be at least 8 characters long and contain both letters and numbers.');
      return false;
    } else {
      setNewPasswordError('');
      validateConfirmPassword();
      return true;
    }
  };

  const validateConfirmPassword = () => {
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return false;
    } else {
      setConfirmPasswordError('');
    }
  };

    const updatePassword = async(e)=>{
        e.preventDefault();
        if(!validatePassword()) return;
        console.log('reach here')
        setLoading(true)
        const data = {oldPassword, newPassword}
        await axios.put(`${server}/api/auth/update-password`,data)
        .then(()=>{
            setLoading(false)
            toast.success('Password successfully changed', {
                id: 'success',
            })
            handleLogOut()
        })
        .catch((err)=>{
            if(err.response.status === 400){
            toast.error(err.response.data.message, {
                id: 'error400',
            })}
            else if(err.response.status === 403){
            toast.error(err.response.data.message, {
                id: 'error403',
            })}
            else if(err.response.status === 409){
            toast.error(err.response.data.message, {
                id: 'error409',
            })}
            else{
            toast.error('An error occured. Try again later!', {
                id: 'error409',
            })}
            setLoading(false)
        })
      }
  return (
    <div className="space-y-2">
                <div>
                    <Label htmlFor="oldPassword">Current Password</Label>
                    <Input type="password" name="oldPassword" id="oldPassword" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                </div>
                <div className='space-y-2'>
                    <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input type="password" name="newPassword" id="newPassword" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                        {newpasswordError && <p style={{ color: 'red' }}>{newpasswordError}</p>}
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
                    </div>
                </div>
                <div>

                <Button onClick={updatePassword} disabled={loading} >{!loading ? 'Update Password' : 'Updating password...'}</Button>
                </div>
            </div>
  )
}

export default UpdatePassword