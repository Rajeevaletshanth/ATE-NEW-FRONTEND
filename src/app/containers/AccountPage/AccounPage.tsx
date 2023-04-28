import Label from "components/Label/Label";
import React, { FC, useState, useEffect } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import Heading from "components/Heading/Heading";
import avatar1 from "images/avatars/blank_avatar.png";
import swal from 'sweetalert';
import { useSelector, useDispatch } from "react-redux";
import { editUserApi } from "services/authServices";
import { uploadFile } from "services/apiServices";
import { setUser } from 'store/auth/userSlice'

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
  
  const { id, username, email, phone, avatar, authority } = useSelector((state:any) => state.auth.user)
  const { token } = useSelector((state:any) => state.auth.session)

  const [avatarFile, setAvatarFile] = useState<any>([]);
	const [avatarImg, setAvatarImg] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [phone_no, setPhoneNo] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch();
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (fileType === "image/png" || fileType === "image/jpeg" || fileType === "image/webp") {
        setAvatarFile([file])
        setAvatarImg(URL.createObjectURL(file))
      } else {
        swal("Oops", "Please select a PNG, JPEG or WebP image file.", "error");
      }
    }
  }

  const getAvatar = async() => {
		try {
			const avatar = await uploadFile(avatarFile)
			return avatar;
		} catch (error) {
			return error
		}
	}

  const editProfile = async() => {
    setLoading(true)
    var profile = ""
    if(avatarFile.length > 0){
      profile = await getAvatar();
    }
    const data = {
      username:name?name:username,
      avatar:profile?profile:avatar,
      phone_no:phone_no?phone_no:phone
    }

    const response = await editUserApi(id, data, token)
    if(response.data.response === "success"){
      setLoading(false)
      swal("Success", "Profile updated successfully", "success")
      dispatch(setUser({
        id: id,
        avatar: profile?profile:avatar, 
        username: name?name:username, 
        authority: authority, 
        email: email,
        phone: phone_no?phone_no:phone
      }))
    }else{
      setLoading(false)
      swal("Sorry", "Please select a PNG, JPEG or WebP image file.", "error");
    }
  }

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account - AnyTimeEat</title>
      </Helmet>
      <CommonLayout>
        <div className="pt-1 pb-1  rounded-2xl">
          <div className="relative space-y-4 mb-24 mt-4 lg:space-y-4 lg:mb-28">
            <div className="space-y-6 sm:space-y-8">
              <div className="w-full sm:px-20">
                  <Heading children="Edit User Information" isCenter={false} />
                  <div className="flex flex-col md:flex-row ">
                    <div className="flex-shrink-0 flex items-start ">
                      <div className="relative rounded-lg overflow-hidden flex ">
                        <Avatar radius="rounded-sm" sizeClass="w-32 h-32 md:w-48 md:h-48" imgUrl={avatarImg !== ""? avatarImg : avatar? avatar: avatar1}/>  
                        <div className={`absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-neutral-50 cursor-pointer ${avatarImg !== ""? "hidden":""}`}>
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                              stroke="currentColor"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="mt-1 text-xs">Change Profile</span>
                        </div>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileSelect} />
                      </div>
                    </div>
                    <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
                      <div>
                        <Label>Username</Label>
                        <Input className="mt-1.5" defaultValue={username} onChange={(e) => setName(e.target.value)}/>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input className="mt-1.5 disabled:bg-gray-200 disabled:dark:bg-gray-700" defaultValue={email} disabled/>
                      </div>
                      <div>
                        <Label>Phone No</Label>
                        <Input type="number" className="mt-1.5" defaultValue={phone} placeholder="Phone No" onChange={(e) => setPhoneNo(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                  <div className="pt-10 flex justify-center">
                    <ButtonPrimary onClick={editProfile} loading={loading}>Update info</ButtonPrimary>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
