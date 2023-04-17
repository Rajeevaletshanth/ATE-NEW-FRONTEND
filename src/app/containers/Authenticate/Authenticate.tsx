import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { authApi } from 'services/authServices';
import { useSelector } from 'react-redux'
import useAuth from 'utils/hooks/useAuth'


const Authenticate = () => {
  const {signedIn, token} = useSelector((state:any) => state.auth.session)
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const checkAuth = async() => {
    try {
      const response = await authApi(token)
      if(response.data.response !== "success"){
        signOut()
        navigate('/login')
      }
    } catch (error) {
      signOut()
      navigate('/login')
    }
  }
  useEffect(() => {
    if(!signedIn){
      signOut()
      navigate('/login')
    }else{
      checkAuth()
    }
  },[])
  return (
    <></>
  )
}

export default Authenticate