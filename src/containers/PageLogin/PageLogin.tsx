import React, { FC, useEffect, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import useAuth from 'utils/hooks/useAuth'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export interface PageLoginProps {
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

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const navigate = useNavigate()

  const { signedIn } = useSelector((state:any) => state.auth.session) 

  useEffect(() => {
    if(signedIn)
      navigate('/')
  },[])

  const handleLogin = async(e:any) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn({ email, password }).then((res) => {
      setLoading(false);
      if(res.status == "failed")
        setError(res.message)
    }).catch((err) => {
        setError(err.message)
    })

  }

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login - AnyTimeEat</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
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

          <form className="grid grid-cols-1 gap-6" action="#" method="post" onSubmit={handleLogin}>
            {error && 
              <span className="text-center text-sm text-primary-400 bg-primary-100 p-1 py-4 rounded-sm">{error}</span>
            }
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
              <Input 
                type="password" 
                className="mt-1" 
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            
            <ButtonPrimary type="submit" loading={loading}>{loading? "Signing In" : "Sign In"}</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link to="/signup" className="text-primary-500">Create an account</Link>
          </span>
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
              <Link to="/forgot-password" className="text-sm text-center">
                  Forgot password?
              </Link>
          </span>
              
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
