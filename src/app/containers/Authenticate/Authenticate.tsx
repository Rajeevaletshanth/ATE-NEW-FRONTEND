import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Authenticate = () => {
    const {signedIn} = useSelector((state:any) => state.auth.session)
  const navigate = useNavigate();
  useEffect(() => {
    if(!signedIn){
      navigate('/login')
    }
  },[])
  return (
    <></>
  )
}

export default Authenticate