import React, { FC, useState, useEffect } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { userRegister } from 'services/authServices'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'

export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const passwordValidation = () => {
    if(password === confirmPassword){
      setError("")
      return true
    }else{
      setError("Password not matching!")
      setLoading(false);
      return false
    }
  }

  const handleRegister = async(e: any) => {
    e.preventDefault();
    setLoading(true);
    let checkPassword = passwordValidation()
    if(checkPassword){
      var data = {
        username: username,
        email: email,
        password: password,
        authority: {"role" : ["user"]}
      }
      await userRegister(data).then((res) => {
        setLoading(false);
        if(res.data.response === "success"){
          swal("Registered", "Login to continue.", "success").then(() => {
            navigate('/login')
          });
        }else{
          setError(res.data.message)
        }
      }).catch((err) => {
        setLoading(false);
        setError(err.message)
      })
    }
  }
  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up - AnyTimeEat</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign Up
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-gray-100 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post" onSubmit={handleRegister}>
            {error && 
              <span className="text-center text-sm text-primary-400 bg-primary-100 p-1 py-4 rounded-sm">{error}</span>
            }
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Username
              </span>
              <Input
                type="text"
                placeholder="Username"
                className="mt-1"
                minLength={5}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email
              </span>
              <Input
                type="email"
                placeholder="Email"
                className="mt-1"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input type="password" className="mt-1" required minLength={5} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input type="password" className="mt-1" required minLength={5} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>
            <ButtonPrimary type="submit" loading={loading}>{loading? "Signing Up" : "Register"}</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link to="/login" className="text-primary-500">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
