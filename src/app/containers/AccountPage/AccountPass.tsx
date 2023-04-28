import Label from "components/Label/Label";
import React, { useState, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import Heading from "components/Heading/Heading";
import { changePasswordApi } from "services/authServices";
import { useSelector } from "react-redux";
import swal from 'sweetalert';

const AccountPass = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error,setError] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const { id } = useSelector((state:any) => state.auth.user)
  const { token } = useSelector((state:any) => state.auth.session)

  const handleSubmit = async(e:any) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    if(newPassword === confirmPassword){
      const data = {
        currentPassword:currentPassword,
        newPassword:newPassword
      }
      const response = await changePasswordApi(id,data,token)
      if(response.data.response === "success"){
        setLoading(false)
        swal("Success", "Password updated successfully", "success")
      }else{
        setLoading(false)
        swal("Sorry", response.data.message, "error")
      }
    }else{
      setLoading(false)
      setError("New password and confirm password is not matching!")
    }
    
  }

  return (
    <div>
      <CommonLayout>
      <div className="pt-1 pb-1  rounded-2xl">
          <div className="relative space-y-4 mb-24 mt-4 lg:space-y-4 lg:mb-28">
            <div className="space-y-6 sm:space-y-8">
              <div className="w-full sm:px-20">
                  <Heading children="Update Your Password" isCenter={false} />
                  {error && 
                    <div className="text-center text-sm text-primary-400 bg-primary-100 p-1 py-4 max-w-2xl rounded-sm mb-6">{error}</div>
                  }
                    <form className="flex-grow mt-10 md:mt-0 max-w-2xl space-y-6" onSubmit={(e) => handleSubmit(e)}>
                      <div>
                        <Label>Current password</Label>
                        <Input required type="password" className="mt-1.5" onChange={(e) => setCurrentPassword(e.target.value)}/>
                      </div>
                      <div>
                        <Label>New password</Label>
                        <Input required type="password" className="mt-1.5" onChange={(e) => setNewPassword(e.target.value)}/>
                      </div>
                      <div>
                        <Label>Confirm password</Label>
                        <Input required type="password" className="mt-1.5" onChange={(e) => setConfirmPassword(e.target.value)}/>
                      </div>
                      <div className="pt-4 flex justify-center">
                        <ButtonPrimary type="submit" loading={loading}>Update Password</ButtonPrimary>
                      </div>
                    </form>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPass;
