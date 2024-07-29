import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { server } from "@/server";
import axios from "axios";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function CodeVerification({ token, setToken }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (value.length !== 4) {
      toast.error("Verification code should be exactly 4 digits.", {
        id: "error",
      });
      return false;
    }
    const data = {
      activation_token: token,
      activation_code: value,
    };
    axios
      .post(`${server}/api/auth/user-activation`, data)
      .then(() => {
        toast.success("Code verified successfully", { id: "success" });
        navigate("/add-user", { replace: true });
      })
      .catch(() => {
        toast.error(
          "An error occurred during verification. Please try again.",
          { id: "error" }
        );
      });
  };
  return (
    <div>
        <Button variant="outline" onClick={()=>setToken('')}>
        <MoveLeft />
        </Button>
    <Card className="w-[400px] mt-4">
      <CardHeader>
        <CardTitle className="flex gap-4 justify-between items-center mb-4">
          <span className="text-primary font-bold">Verification Code</span>
          <span>Powel-Elss</span>
        </CardTitle>
        <CardDescription>
          We&apos;ve sent a verification code to the email you provided.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center ">
        <InputOTP
          maxLength={4}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setValue("")}>
          Clear
        </Button>
        <Button onClick={handleSubmit}>Send</Button>
      </CardFooter>
    </Card>
    </div>
  );
}
export default CodeVerification;
